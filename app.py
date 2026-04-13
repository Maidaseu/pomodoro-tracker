from flask import Flask, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from database import init_db, get_db
from helpers import login_required

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

init_db()

@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
@login_required
def index():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")

        if not username:
            return "Username is required", 400
        elif not password:
            return "Password is required", 400
        elif not confirmation:
            return "Please confirm your password", 400
        elif password != confirmation:
            return "Passwords do not match", 400

        conn = get_db()
        existing = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()

        if existing:
            conn.close()
            return "Username already exists", 400

        conn.execute("INSERT INTO users (username, hash) VALUES (?, ?)",
                     (username, generate_password_hash(password)))
        conn.commit()

        user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
        session["user_id"] = user["id"]
        conn.close()

        return redirect("/")
    else:
        return render_template("register.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    session.clear()
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")

        if not username:
            return "Username is required", 400
        elif not password:
            return "Password is required", 400

        conn = get_db()
        user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
        conn.close()

        if not user or not check_password_hash(user["hash"], password):
            return "Invalid username and/or password", 400

        session["user_id"] = user["id"]
        return redirect("/")
    else:
        return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect("/")

if __name__ == "__main__":
    app.run()

    from flask import Flask, redirect, render_template, request, session, jsonify
import json
from datetime import date

@app.route("/save_session", methods=["POST"])
@login_required
def save_session():
    data = request.get_json()
    duration = data.get("duration")

    if not duration:
        return jsonify({"error": "No duration provided"}), 400

    conn = get_db()
    conn.execute(
        "INSERT INTO sessions (user_id, duration, date) VALUES (?, ?, ?)",
        (session["user_id"], duration, date.today().isoformat())
    )
    conn.commit()
    conn.close()

    return jsonify({"success": True})

@app.route("/stats")
@login_required
def stats():
    conn = get_db()
    user_id = session["user_id"]

    # Total minutes all time
    total = conn.execute(
        "SELECT SUM(duration) as total FROM sessions WHERE user_id = ?",
        (user_id,)
    ).fetchone()

    # Today's total
    today = conn.execute(
        "SELECT SUM(duration) as total FROM sessions WHERE user_id = ? AND date = ?",
        (user_id, date.today().isoformat())
    ).fetchone()

    # This month's total
    month = conn.execute(
        "SELECT SUM(duration) as total FROM sessions WHERE user_id = ? AND strftime('%Y-%m', date) = strftime('%Y-%m', 'now')",
        (user_id,)
    ).fetchone()

    # This year's total
    year = conn.execute(
        "SELECT SUM(duration) as total FROM sessions WHERE user_id = ? AND strftime('%Y', date) = strftime('%Y', 'now')",
        (user_id,)
    ).fetchone()

    # Daily breakdown - last 30 days
    daily = conn.execute(
        "SELECT date, SUM(duration) as total FROM sessions WHERE user_id = ? GROUP BY date ORDER BY date DESC LIMIT 30",
        (user_id,)
    ).fetchall()

    # Monthly breakdown - last 12 months
    monthly = conn.execute(
        "SELECT strftime('%Y-%m', date) as month, SUM(duration) as total FROM sessions WHERE user_id = ? GROUP BY month ORDER BY month DESC LIMIT 12",
        (user_id,)
    ).fetchall()

    conn.close()

    return render_template("stats.html",
        total=total["total"] or 0,
        today=today["total"] or 0,
        month=month["total"] or 0,
        year=year["total"] or 0,
        daily=daily,
        monthly=monthly
    )


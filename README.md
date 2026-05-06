# Pomodoro Tracker

#### Video Demo: <URL HERE>

#### Description:

The Pomodoro Tracker is a web-based application designed to help users manage their time using the Pomodoro Technique — a time management method that breaks work into focused intervals (typically 25 minutes) separated by short breaks. This project was built as my CS50 final project to demonstrate full-stack web development skills.

The application allows users to start customizable Pomodoro sessions, track their productivity over time, and visualize their progress through comprehensive statistics. It features user authentication, a clean dark-mode interface, and persistent data storage using SQLite.

#### Features:

- **User Authentication**: Secure registration and login system using password hashing
- **Customizable Timer**: Adjustable Pomodoro durations (5-120 minutes in 5-minute increments)
- **Session Recording**: Automatically saves completed sessions to database
- **Statistics Dashboard**: View productivity metrics including:
  - All-time total minutes tracked
  - Today's progress
  - Monthly and yearly totals
  - Daily breakdown (last 30 days)
  - Monthly breakdown (last 12 months)
- **Dark Mode UI**: Clean, minimal design using Inter font from Google Fonts
- **Responsive Design**: Works on desktop and mobile devices
- **Live Deployment**: Deployed on Render for public access

#### Technical Stack:

- **Backend**: Python Flask with flask-session for session management
- **Database**: SQLite for persistent data storage
- **Frontend**: HTML, CSS, and vanilla JavaScript (no frameworks)
- **Authentication**: werkzeug.security for password hashing
- **Deployment**: Gunicorn on Render
- **Styling**: Custom CSS with dark theme

#### File Structure:

- **app.py** — Main Flask application with all route handlers (login, register, timer, stats)
- **database.py** — Database initialization and connection management
- **helpers.py** — Utility functions including login_required decorator
- **requirements.txt** — Python dependencies (Flask, flask-session, werkzeug)
- **Procfile** — Deployment configuration for Render
- **templates/** — HTML templates:
  - layout.html — Base template with navigation
  - index.html — Timer page (main feature)
  - login.html — User login form with inline error handling
  - register.html — User registration form with inline error handling
  - stats.html — Statistics and productivity dashboard
- **static/** — Frontend assets:
  - css/styles.css — All styling (dark theme, responsive layout)
  - js/timer.js — Timer logic and session recording

#### Design Decisions:

1. **Dark Mode Theme**: Chose dark mode for a modern aesthetic and to reduce eye strain during focused work sessions. Used a carefully selected color palette (#0f0f13 background, #e05c5c accent red).

2. **Vanilla JavaScript**: Avoided heavy frameworks to keep the project lightweight and ensure full understanding of the code. Used fetch API for asynchronous session saving without page reloads.

3. **SQLite Database**: Selected SQLite for simplicity and portability. The database schema includes separate tables for users, sessions, and habits (for future expansion).

4. **Inline Error Handling**: Implemented JavaScript-based form submission to display errors inline without page reloads, improving user experience.

5. **Customizable Timer**: Added flexibility (5-120 minutes) to accommodate different work styles and tasks, not just the standard 25-minute Pomodoro.

6. **Statistics Granularity**: Provided multiple time period views (daily, monthly, yearly) to help users track progress at different scales.

#### How to Run:

1. Clone the repository
2. Create a virtual environment: `python3 -m venv venv`
3. Activate it: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Set environment variables: `export FLASK_APP=app.py` and `export FLASK_DEBUG=1`
6. Initialize the database: `python3 -c "from database import init_db; init_db()"`
7. Run Flask: `flask run`
8. Visit http://127.0.0.1:5000 in your browser

#### Future Enhancements:

- Email-based password reset (currently displays token)
- Habit tracking and categorization
- Goal setting and progress toward 1000-hour milestones
- Export statistics to CSV
- Mobile app version
- Sound notifications when Pomodoro completes

---

This is CS50!

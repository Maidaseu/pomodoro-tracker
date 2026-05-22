# Pomodoro Tracker

#### Video Demo: https://youtu.be/92ZsZwCzcpE?si=BgZX0ywwlVVyb62K

#### Description:

The Pomodoro Tracker is a full-stack web application designed to help users manage their time effectively using the Pomodoro Technique — a proven time management method that breaks work into focused intervals (typically 25 minutes) separated by short breaks. This project was built as my CS50 final project to demonstrate comprehensive web development skills across frontend, backend, database design, and deployment.

The application allows users to create accounts, start customizable Pomodoro sessions of varying lengths (5 to 120 minutes), and automatically track their productivity over time. Unlike traditional fixed 25-minute timers, this app recognizes that different tasks require different time blocks. Users can set any duration they need, and the app saves each completed session to a persistent database. The application provides a comprehensive statistics dashboard showing productivity metrics across multiple time periods: daily, monthly, and yearly breakdowns. This granular data helps users identify their productivity patterns and stay motivated to achieve their goals.

The core motivation behind this project was to create a tool that goes beyond simple timer functionality. Many productivity apps track time, but few provide meaningful insights into work patterns. The Pomodoro Tracker bridges this gap by combining session tracking with detailed analytics, encouraging users to use the app consistently and reflect on their productivity habits.

#### Features:

**User Authentication and Security**
The application implements secure user registration and login using Flask-Session and werkzeug password hashing. Every password is hashed using industry-standard algorithms, so even if the database were compromised, passwords would be protected. Users can create unique usernames, and the system prevents duplicate registrations. Sessions persist across browser sessions, allowing users to remain logged in until they explicitly log out.

**Customizable Pomodoro Timer**
Rather than forcing users into a fixed 25-minute mold, the timer allows adjustments from 5 to 120 minutes in 5-minute increments using intuitive plus and minus buttons. Users can set their timer to match their specific task requirements. Once started, the timer counts down in real-time with MM:SS formatting. The timer continues running even if users switch browser tabs (implemented using Date.now() to track actual elapsed time). When a session completes, a notification sound plays and the session is automatically saved to the database.

**Session Recording and Persistence**
Every completed session is automatically saved to SQLite with the following data: user ID, duration in minutes, date, and exact timestamp. This creates a complete history of user activity. Sessions are linked to user accounts, ensuring data isolation and privacy. The database schema supports future features like habit tracking and categorization.

**Comprehensive Statistics Dashboard**
The stats page displays four key metrics in prominent cards: all-time total minutes tracked, today's progress, this month's total, and this year's total. Below the summary cards, users see two detailed breakdowns: a daily table showing the last 30 days of activity with dates and minutes, and a monthly table showing the last 12 months. This variety of time periods helps users understand both short-term and long-term productivity patterns. The data automatically updates as new sessions are recorded.

**Dark Mode User Interface**
The application features a carefully designed dark theme with a dark background (#0f0f13) and red accent color (#e05c5c). This design choice serves both aesthetic and functional purposes: dark themes are easier on the eyes during extended focus sessions, and the vibrant red accents make interactive elements stand out. The interface uses the Inter font family for a clean, modern appearance. The layout is responsive and adapts to different screen sizes.

#### Technical Stack:

**Backend: Python Flask**
Flask was chosen for its simplicity and flexibility. It provides all necessary features (routing, session management, templating) without unnecessary complexity. The application uses Flask-Session for secure session management and werkzeug for password hashing. The backend handles all business logic: user authentication, session recording, and statistics calculations.

**Database: SQLite**
SQLite provides reliable, file-based data persistence without requiring a separate database server. The schema includes three main tables: users (storing authentication data), sessions (storing productivity records), and reset_tokens (for future password reset functionality). SQLite's SQL support enables complex queries for statistics generation, such as grouping sessions by date and month.

**Frontend: HTML, CSS, JavaScript**
Rather than using heavy frameworks like React, the frontend uses vanilla JavaScript for interactivity. This approach keeps the application lightweight and ensures every line of code is necessary. HTML provides semantic structure, CSS handles styling and responsive design, and JavaScript manages timer logic, form submission, and dynamic UI updates.

**Deployment: Render and Gunicorn**
The application is deployed on Render using Gunicorn as the production server. A Procfile instructs Render how to start the application. Requirements.txt specifies all Python dependencies, ensuring reproducibility across environments.

#### File Structure:

**app.py** — The main Flask application file containing all route handlers. Includes routes for authentication (/register, /login, /logout), the timer page (/), statistics (/stats), session recording (/save_session), and password reset functionality (/forgot, /reset/<token>).

**database.py** — Handles SQLite connection and initialization. The init_db() function creates tables on first run using CREATE TABLE IF NOT EXISTS statements, ensuring the database is ready regardless of prior state.

**helpers.py** — Contains the login_required decorator, a reusable function that protects routes requiring authentication by checking if a user ID exists in the session.

**requirements.txt** — Lists all Python dependencies (Flask, flask-session, werkzeug, gunicorn, python-dotenv) with pinned versions for reproducibility.

**Procfile** — Instructs Render to start the application with Gunicorn on production.

**templates/layout.html** — Base template inherited by all pages, includes navigation bar, styling links, and footer script imports.

**templates/index.html** — Timer page template with plus/minus buttons, timer display, and start/pause/reset controls.

**templates/login.html, register.html** — Authentication forms with inline error handling using JavaScript.

**templates/stats.html** — Statistics page displaying summary cards and detailed tables.

**static/css/styles.css** — All styling using a dark theme color palette with responsive design rules for mobile devices.

**static/js/timer.js** — Timer logic using setInterval, session saving via fetch API, and button event listeners.

#### Design Decisions:

**Why Vanilla JavaScript?** Rather than adopting React or Vue, I chose vanilla JavaScript to keep dependencies minimal and ensure every line of code serves a purpose. This approach teaches fundamental web concepts and results in faster page loads.

**Dark Mode by Default** — Dark interfaces reduce eye strain during extended focus sessions, which aligns with the purpose of a productivity app where users spend hours concentrating on work.

**Flexible Timer Duration** — While the classic Pomodoro is 25 minutes, real-world tasks vary. Supporting 5-120 minutes makes the app applicable to diverse work scenarios.

**SQLite Over Other Databases** — SQLite requires no server, simplifies deployment, and is sufficient for this application's scale. It demonstrates understanding of relational databases without unnecessary complexity.

#### How to Run:

1. Clone the repository: `git clone https://github.com/Maidaseu/pomodoro-tracker.git`
2. Create virtual environment: `python3 -m venv venv`
3. Activate it: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run: `flask run`
6. Visit: http://127.0.0.1:5000

#### Future Enhancements:

- Habit tracking with custom categories for different activity types
- Progress visualization toward 1000-hour goals per habit
- Email-based password reset (currently displays token)
- Export statistics to CSV for external analysis
- Mobile app versions using React Native or Flutter
- Collaborative features for team productivity tracking
- Integrations with calendar applications for scheduling breaks
- Customizable notification sounds and visual alerts

---

This is CS50!

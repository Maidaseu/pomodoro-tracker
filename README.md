# Pomodoro Tracker

A productivity app that helps you track your Pomodoro sessions with customizable timer lengths and detailed statistics.

## Features

- **Adjustable Timer** — Set your session length from 5 to 120 minutes in 5-minute increments
- **Session Tracking** — Automatically saves completed sessions to the database
- **Detailed Stats** — View your productivity broken down by:
  - All-time total minutes
  - Today's total
  - This month's total
  - This year's total
  - Last 30 days daily breakdown
  - Last 12 months monthly breakdown
- **User Accounts** — Register and login to track your personal stats
- **Dark Mode UI** — Clean, minimal design optimized for focus

## Tech Stack

- **Backend:** Python Flask
- **Database:** SQLite
- **Frontend:** HTML, CSS, JavaScript
- **Authentication:** Werkzeug (password hashing)

## Installation

1. Clone the repo:
```bash
git clone https://github.com/yourusername/pomodoro-tracker.git
cd pomodoro-tracker
```

2. Create virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install flask flask-session werkzeug
```

4. Run the app:
```bash
flask run
```

5. Visit `http://127.0.0.1:5000` in your browser

## Usage

1. Register for an account
2. Set your desired session length using the +/- buttons
3. Click Start to begin the countdown
4. When complete, the session is automatically saved
5. Check your Stats page to see your productivity over time

## Project Structure

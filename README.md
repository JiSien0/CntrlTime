# CntrlTime

CntrlTime is an application that combines Flask and Electron for time tracking, organising work with categories and timers. The project allows users to create categories, assign times to them, and track the number of hours spent on various tasks.

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: Electron (JavaScript, HTML, CSS)
- **Database**: SQLite3

## Installation

### 1. Clone the repository:

   ```bash
   git clone https://github.com/JiSien0/CntrlTime.git 
```
### 2. Install dependencies

For Backend (Flask):
1. Go to the project folder
2. Create a virtual environment and activate it
```
python -m venv .venv
source .venv/bin/activate # Linux/Mac
.\.venv\Scripts\activate # Windows
```
3. Install the required dependencies:
```
pip install -r requirements.txt
``` 
For Frontend (Electron):
1. Go to the frontend folder
2. Install dependencies:
```
npm install
```

### 3. Run the project
Run the project from the frontend folder:
``` 
npm start
```
### Functionality Description
<li>
Categories: Users can create and manage categories, assign unique names and colors to them.
<li>Timers: Each category has its own stopwatch, which tracks the time spent on tasks.
<li>Data Storage: All category and time data is stored in a SQLite database, allowing you to restore it after restarting the application.

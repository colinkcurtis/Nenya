# Nenya Financial Manager

> "For this is the Ring of Water, and with it you may keep your realm fair and protected from the hurts of time" - Galadriel on Nenya

## About
Nenya is a personal financial management tool designed with simplicity and security in mind. Just as the Elven ring Nenya preserved and protected the realm of Lothlórien, this application helps preserve and protect your financial well-being.

Rather than tracking day-to-day transactions, Nenya focuses on providing a clear overview of your financial landscape. Think of it as your personal financial command center, where you can visualize and adjust your monthly financial cadence with spreadsheet-like flexibility but modern web application convenience.

## Features
- Interactive financial data grid with spreadsheet-like functionality
- Real-time calculations and summaries
- Mobile-responsive design
- Secure data storage

## Technical Stack
- Frontend: Next.js with TypeScript
- Backend: FastAPI
- Database: PostgreSQL
- Deployment: Currently local, cloud deployment coming soon

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL

### Setting Up the Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
gunicorn --config gunicorn.conf.py main:app
```

### Setting Up the Frontend
```bash
cd frontend
yarn install
yarn dev
```

Visit `http://localhost:3000` to see the application.

## Project Status
This project is actively under development. Current focus is on building core financial management features with a spreadsheet-like interface while maintaining data security and user privacy.

## Vision
Future enhancements will include:
- Cloud deployment
- Mobile app integration
- Enhanced visualization options
- Financial goal tracking
- Multi-user support

## Contributing
This project is currently in its early stages. If you're interested in contributing, please check back soon for contribution guidelines.

## License
Apache License - See LICENSE file for details



## Next Steps and TODO tracker

Given your goal, here's a high-level breakdown of steps:

Frontend Table Component:

Interactive grid/table using a library like TanStack Table (formerly React Table) or AG Grid
Ability to add/edit rows and columns
Real-time calculations for sums/totals
Basic styling and usability


Data Management:

State management for the table data
API integration with our FastAPI backend
Data validation before sending to backend
Loading/error states


Database:

Set up PostgreSQL locally
Create proper schemas
Test data persistence



I suggest we start with step 1: creating a basic interactive table component in the Next.js frontend. Would you like me to show you how to set up TanStack Table with some basic editing capabilities? This will give us something tangible to work with before we tackle the data persistence.
Or would you prefer to start with a different aspect of this plan?
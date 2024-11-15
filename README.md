# Nenya Financial Manager

> "For this is the Ring of Water, and with it you may keep your realm fair and protected from the hurts of time"

## About
Nenya is a personal financial management tool designed with simplicity and security in mind.

## Features
- Interactive financial data grid with spreadsheet-like functionality
- Real-time calculations and summaries
- Mobile-responsive design
- Secure data storage

## Technical Stack
- Frontend: Next.js with TypeScript
- Backend: FastAPI
- Database: PostgreSQL
- Infrastructure: OpenTofu (formerly Terraform Open Source)
- CI/CD: GitHub Actions with ArgoCD
- Observability: Argo Stack (Argo Workflows, Argo Events, Argo Rollouts)
- Cloud Provider: AWS
- LLM Integration: Open Source LLM (planning phase)

## Infrastructure & DevOps
The project uses modern DevOps practices and tools:
- Infrastructure as Code (IaC) with OpenTofu
- GitOps deployment flow with ArgoCD
- Comprehensive observability with the Argo stack
- Container orchestration with Kubernetes
- Infrastructure monitoring and alerting

## Future Features
### AI Assistant Integration
- Integration with open source LLMs for personalized financial insights
- Real-time data analysis and recommendations
- Privacy-focused approach: train on individual user data locally
- Natural language interface for data exploration and analysis

### Cloud Architecture
- Multi-region AWS deployment for high availability
- Kubernetes-based microservices architecture
- Zero-trust security model
- Data sovereignty and privacy compliance

## Development Roadmap
1. Core Financial Management Features
2. Infrastructure Setup with OpenTofu
3. CI/CD Pipeline Implementation
4. Observability and Monitoring
5. LLM Integration and Training
6. Mobile Application Development

## Architecture Decision Records
Key architectural decisions and their rationales:
- OpenTofu over Terraform Cloud: Open source flexibility and community alignment
- ArgoCD for GitOps: Kubernetes-native, declarative deployments
- AWS as primary cloud: Comprehensive services and market presence
- Open Source LLM: Data privacy and customization capabilities

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

Visit `http://localhost:3000` to see the frontend application. Visit `http:localhost:8000/docs` to see the Swagger docs.

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

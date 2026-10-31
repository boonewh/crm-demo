# All Seasons Foam CRM - Demo Version

This is a **demo-only** version of a React-based CRM system for All Seasons Foam. It's designed purely for demonstration purposes with no backend connectivity.

## 🚀 Quick Start

To run the CRM demo:

```bash
# Use Node 24.22.1 and npm 11.17.0; install the locked dependencies
npm ci

# Run the demo
npm run dev
```

The demo will be available at `http://localhost:5173`

Live demo: https://pathsix-crm-demo.vercel.app

### Maintenance checks

Run `npm run lint`, `npm test`, `npm run build`, then `npm run test:browser`
(install Chromium once with `npx playwright install chromium`). The build includes
strict TypeScript checking. Browser checks use the built preview and block backend
requests; password/email operations are simulations. Calendar downloads are generated
locally. No credentials or database are needed.

`npm run build:safety` followed by `CHECK_SAFETY=1 npm run test:browser` (set the
environment variable using your shell) checks production mode too. The demo remains
isolated even if `VITE_DEMO_MODE=false` or `VITE_API_BASE_URL` is set. Keep Tailwind
on the compatible 3.4 line and the FullCalendar plugins together on 6.1 until an
intentional migration; do not mix plugin major versions. GitHub Actions repeats
the audit, lint, tests and both production builds on Ubuntu 24.04 / Node 24.

## 🎯 Demo Features

This demo allows you to explore:

- **Client Management**: View and interact with sample client data
- **Lead Tracking**: See how leads are managed and tracked
- **Project Management**: Browse active and completed projects
- **Interaction History**: Review communication logs and follow-ups
- **File Vault**: Explore document management features
- **Dashboard Analytics**: View business metrics and KPIs
- **Reporting**: Generate various business reports

### Demo Limitations

- **Demo-Only**: This version has NO backend connectivity whatsoever
- **Simulated Operations**: All write operations (create, update, delete) are simulated
- **Mock Data**: All data is pre-generated and realistic but not real
- **No Persistence**: Refreshing the page resets all data
- **No Authentication**: Login is bypassed with demo credentials

## ⚠️ Important Notice

**This is a demo-only build with zero backend connectivity.** It cannot and will not connect to any server or database. All functionality is simulated using mock data for demonstration purposes only.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
├── data/               # Mock data for demo mode
├── lib/                # Utilities and API layers
├── hooks/              # Custom React hooks
├── types.ts            # TypeScript type definitions
└── authContext.tsx     # Authentication context
```

## 🎨 Key Demo Components

- **DemoComponents.tsx**: Banner and notices for demo mode
- **mockData.ts**: Realistic sample data for all entities
- **mockApi.ts**: Simulated API responses
- **demoApi.ts**: Demo mode API routing layer

## 🔧 Configuration

Demo mode is controlled by the `VITE_DEMO_MODE` environment variable:

- Set to `'true'` to enable demo mode
- Set to `'false'` or omit for production mode

## 📱 Supported Features

The CRM includes:

- **Customer Management**: Complete client profiles with contact information
- **Lead Tracking**: Sales pipeline with status management
- **Project Management**: Track project progress and financials
- **Interaction Logging**: Record all customer communications
- **File Management**: Document storage and sharing
- **Dashboard**: Real-time business metrics
- **Reporting**: Generate various business reports
- **User Management**: Role-based access control

## 🏗️ Built With

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **Lucide React** for icons
- **React Router** for navigation
- **React Hot Toast** for notifications

## 📄 License

This project is proprietary software for All Seasons Foam.

---

**Demo Mode Notice**: This demo provides a realistic preview of the CRM's capabilities. For actual business use, please contact All Seasons Foam for access to the full system.

# MERN Stack Setup

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### Backend Setup
```bash
npm install
```

### Frontend Setup
```bash
npx create-react-app client
cd client
npm install axios
```

## Running the Application

### Development Mode (Both servers)
```bash
npm run dev-all
```

### Backend Only
```bash
npm run dev
```

### Frontend Only
```bash
npm run client
```

## Environment Variables
Update `.env` file with your MongoDB connection string.

## Ports
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

# Food Ordering System - Quick Start

## 🚀 Start Both Services

### Terminal 1: Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on: http://localhost:3000

### Terminal 2: Backend
```bash
cd backend
npm run dev
```
Backend will run on: http://localhost:8080

## 📋 What's Running

- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Spring Boot + Java + Maven
- **Database**: H2 (in-memory)
- **API**: RESTful endpoints on port 8080

## 🎯 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Restaurants**: http://localhost:8080/api/restaurants

## 🛑 Stop Services

Press `Ctrl+C` in each terminal to stop the services.

## 📝 Notes

- Both services now use the same command: `npm run dev`
- Backend package.json was created to enable npm commands
- Maven is used internally for the Java Spring Boot backend

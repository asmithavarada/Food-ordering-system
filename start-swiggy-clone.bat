@echo off
echo Starting Food Ordering System - Swiggy Clone
echo ========================================
echo.

echo 1. Setting up MySQL Database...
echo Please ensure MySQL is running and execute:
echo CREATE DATABASE food_ordering;
echo.
pause

echo.
echo 2. Starting Backend Server...
cd backend
start "Backend Server" cmd /k "mvn spring-boot:run"
timeout /t 10 /nobreak > nul

echo.
echo 3. Starting Frontend Server...
cd ../frontend
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Food Ordering System is starting...
echo.
echo Backend API: http://localhost:8080
echo Frontend App: http://localhost:3000
echo.
echo API Documentation:
echo - Health Check: http://localhost:8080/api/health
echo - Restaurants: http://localhost:8080/api/restaurants
echo - Food Items: http://localhost:8080/api/food-items
echo.
echo Opening frontend in your browser...
timeout /t 5 /nobreak > nul
start http://localhost:3000
echo.
echo ========================================
echo System is ready! Enjoy your food ordering experience!
echo.
pause

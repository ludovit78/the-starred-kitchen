@echo off
cd /d "%~dp0dist" 2>nul || cd /d "%~dp0"
start http://localhost:5173
py -m http.server 5173

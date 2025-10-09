@echo off
echo ---------------------------------------------
echo STUDENTBUDGET - Instalacija sustava
echo ---------------------------------------------

:: trenutni direktorij kao korijenski
cd /d %~dp0
set ROOTDIR=%cd%\
set FRONTEND_DIR=%ROOTDIR%frontend
set BACKEND_DIR=%ROOTDIR%backend

:: 1/4 backend - instalacija
echo [1/4] Instalacija backend modula...
cd /d "%BACKEND_DIR%"
call npm install

:: 2/4 pokretanje backenda
echo [2/4] Pokretanje backend servera...
start "" cmd /k "cd /d %BACKEND_DIR% && node indeks.js"

:: 3/4 frontend - instalacija
echo [3/4] Instalacija frontend modula...
cd /d "%FRONTEND_DIR%"
call npm install

:: 4/4 pokretanje frontend aplikacije (quasar dev)
echo [4/4] Pokretanje frontend aplikacije...
start "" cmd /k "cd /d %FRONTEND_DIR% && quasar dev"

echo ---------------------------------------------
echo Instalacija završena.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:9000
echo ---------------------------------------------
pause

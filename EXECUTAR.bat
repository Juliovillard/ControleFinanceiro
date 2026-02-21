@echo off
title Finance App - Iniciador
color 0A
cls

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║     FINANCE APP - Iniciador                        ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo Escolha como deseja iniciar:
echo.
echo   1) TUDO JUNTO (Recomendado - Backend + Frontend)
echo   2) Apenas o Servidor Backend
echo   3) Apenas o Frontend (React)
echo.

set /p choice="Digite 1, 2 ou 3: "

if "%choice%"=="1" goto all
if "%choice%"=="2" goto backend
if "%choice%"=="3" goto frontend
goto invalid

:all
echo.
echo [INFO] Iniciando Backend + Frontend...
echo.
npm run dev-all
goto end

:backend
echo.
echo [INFO] Iniciando Backend (porta 5000)...
echo.
cd backend
node server.js
goto end

:frontend
echo.
echo [INFO] Iniciando Frontend (porta 3000)...
echo.
npm run dev
goto end

:invalid
echo.
echo [ERRO] Opção inválida!
echo.
pause
exit /b 1

:end
pause

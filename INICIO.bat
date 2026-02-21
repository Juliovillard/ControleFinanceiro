@echo off
title Finance App - Iniciador

setlocal enabledelayedexpansion

cd /d "c:\Users\Julio\OneDrive\Área de Trabalho\programa"

cls
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║     FINANCE APP - Iniciador                        ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo Escolha como deseja iniciar:
echo.
echo   1) TUDO JUNTO (Backend + Frontend)
echo   2) Apenas o Servidor Backend
echo   3) Apenas o Frontend (React + Electron)
echo   4) Sair
echo.

set /p choice="Digite a opcao (1-4): "

if "!choice!"=="1" goto all
if "!choice!"=="2" goto backend
if "!choice!"=="3" goto frontend
if "!choice!"=="4" goto exit
echo [ERRO] Opcao invalida!
timeout /t 2
goto inicio

:all
echo.
echo [INFO] Abrindo Backend em nova janela...
start "Finance App - Backend" cmd /k "call BACKEND.bat"

timeout /t 3

echo [INFO] Abrindo Frontend em nova janela...
start "Finance App - Frontend" cmd /k "call FRONTEND.bat"

echo.
echo [OK] Aplicacao iniciada!
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
timeout /t 3
exit /b 0

:backend
echo.
echo [INFO] Iniciando Backend...
echo.
call BACKEND.bat
exit /b 0

:frontend
echo.
echo [INFO] Iniciando Frontend...
echo.
call FRONTEND.bat
exit /b 0

:exit
exit /b 0

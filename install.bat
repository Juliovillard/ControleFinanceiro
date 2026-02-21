@echo off
title Finance App - Instalacao

echo.
echo ====================================
echo Finance App - Script de Instalacao
echo ====================================
echo.

:: Verifica Node.js
echo Verificando Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo X Node.js nao encontrado! Baixe em https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i

echo + Node.js %NODE_VERSION% encontrado
echo + npm %NPM_VERSION% encontrado
echo.

:: Instala dependências principais
echo Instalando dependencias do projeto principal...
call npm install
if errorlevel 1 (
    echo X Erro ao instalar dependencias do projeto
    pause
    exit /b 1
)
echo + Dependencias do projeto instaladas!
echo.

:: Instala dependências do backend
echo Instalando dependencias do backend...
cd backend
call npm install
cd ..
if errorlevel 1 (
    echo X Erro ao instalar dependencias do backend
    pause
    exit /b 1
)
echo + Dependencias do backend instaladas!
echo.

echo ====================================
echo Instalacao Concluida com Sucesso!
echo ====================================
echo.
echo Proximos passos:
echo.
echo 1. Abra dois Command Prompts (cmd)
echo.
echo Terminal 1 - Execute o backend:
echo   cd backend
echo   npm run dev
echo.
echo Terminal 2 - Execute o app:
echo   npm run dev
echo.
echo Ou execute tudo junto:
echo   npm run dev-all
echo.
pause

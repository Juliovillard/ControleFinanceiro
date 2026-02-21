@echo off
title Finance App - Servidor e Cliente

echo.
echo ========================================
echo Finance App - Iniciador (Dev)
echo ========================================
echo.

:: Verifica Node.js
node -v >nul 2>&1
if errorlevel 1 (
    echo Erro: Node.js nao encontrado!
    echo Baixe em https://nodejs.org/
    pause
    exit /b 1
)

echo + Node.js encontrado
echo.

:: Criar dois terminais
echo Abrindo servidores...
echo.

:: Abre backend em nova janela
start "Finance App - Backend" cmd /k "cd backend && npm run dev"

:: Pequena pausa para o backend iniciar
timeout /t 3 /nobreak

:: Abre frontend em nova janela
start "Finance App - Frontend" cmd /k "npm run dev"

echo.
echo + Backend rodando em: http://localhost:5000
echo + Frontend rodando em: http://localhost:3000
echo.
echo Fecha qualquer janela para parar o servidor correspondente
pause

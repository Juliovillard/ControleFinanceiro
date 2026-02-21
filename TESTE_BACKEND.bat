@echo off
title Finance App - Teste Backend

cd /d "c:\Users\Julio\OneDrive\Área de Trabalho\programa"

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  FINANCE APP - Teste do Backend                    ║
echo ╚════════════════════════════════════════════════════╝
echo.

echo [1/5] Checando Node.js...
"C:\Program Files\nodejs\node.exe" --version
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    pause
    exit /b 1
)
echo OK

echo [2/5] Checando pasta backend...
if exist backend (
    echo OK - pasta backend encontrada
) else (
    echo ERRO: pasta backend nao encontrada!
    pause
    exit /b 1
)

echo [3/5] Checando server.js...
if exist backend\server.js (
    echo OK - server.js encontrado
) else (
    echo ERRO: backend/server.js nao encontrado!
    pause
    exit /b 1
)

echo [4/5] Criando pasta data se nao existir...
if not exist data mkdir data
echo OK

echo [5/5] Iniciando servidor...
echo.
cd backend
"C:\Program Files\nodejs\node.exe" server.js

pause

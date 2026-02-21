@echo off
REM Script para iniciar o Finance App Backend
REM Windows precisa do caminho full para encontrar node

title Finance App - Backend
color 0A

cd /d "c:\Users\Julio\OneDrive\Área de Trabalho\programa"

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  FINANCE APP - Backend Server                      ║
echo ║  Porta: 5000                                       ║
echo ╚════════════════════════════════════════════════════╝
echo.

REM Criar pasta data se não existir
if not exist "data" mkdir data

REM Ir para backend
cd backend

echo [INFO] Iniciando servidor...
echo [INFO] Aguarde alguns segundos...
echo.

REM Executar com tratamento de erros
"C:\Program Files\nodejs\node.exe" server.js

REM Se chegou aqui, houve erro
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  ERRO AO INICIAR!                                  ║
echo ╚════════════════════════════════════════════════════╝
echo.
echo Pressione qualquer tecla para ver o erro completo...
pause

REM Tenta novamente e mostra o erro
"C:\Program Files\nodejs\node.exe" server.js

pause

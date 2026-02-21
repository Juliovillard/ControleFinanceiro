@echo off
REM Script para iniciar o Frontend React

title Finance App - Frontend
color 0B

cd /d "c:\Users\Julio\OneDrive\Área de Trabalho\programa"

echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  FINANCE APP - Frontend                            ║
echo ║  Porta: 3000                                       ║
echo ║  App vai abrir no navegador...                     ║
echo ╚════════════════════════════════════════════════════╝
echo.

echo [INFO] Iniciando React...
echo [INFO] Aguarde 20-30 segundos na primeira vez...
echo.

"C:\Program Files\nodejs\npm.cmd" run dev

REM Se chegou aqui, houve erro
echo.
echo ╔════════════════════════════════════════════════════╗
echo ║  ERRO AO INICIAR!                                  ║
echo ╚════════════════════════════════════════════════════╝
pause

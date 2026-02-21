# Script de Instalação - Finance App
# Para executar: powershell -ExecutionPolicy Bypass -File install.ps1

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Finance App - Script de Instalação" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Verifica se Node.js está instalado
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node -v
$npmVersion = npm -v

if ($nodeVersion) {
    Write-Host "✓ Node.js $nodeVersion encontrado" -ForegroundColor Green
    Write-Host "✓ npm $npmVersion encontrado" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js não encontrado! Baixe em https://nodejs.org/" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Instalando dependências do projeto principal..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependências do projeto instaladas!" -ForegroundColor Green
} else {
    Write-Host "✗ Erro ao instalar dependências do projeto" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Instalando dependências do backend..." -ForegroundColor Yellow
Push-Location backend
npm install
Pop-Location

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Dependências do backend instaladas!" -ForegroundColor Green
} else {
    Write-Host "✗ Erro ao instalar dependências do backend" -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Instalação Concluída com Sucesso!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Abra dois terminais PowerShell" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 1 - Execute o backend:" -ForegroundColor Cyan
Write-Host "  cd backend" -ForegroundColor Gray
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Terminal 2 - Execute o app:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "Ou execute tudo junto:" -ForegroundColor Cyan
Write-Host "  npm run dev-all" -ForegroundColor Gray

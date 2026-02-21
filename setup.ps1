#!/usr/bin/env pwsh
# Finance App - Script de Instalação
# Uso: powershell -ExecutionPolicy Bypass -File setup.ps1

param(
    [switch]$SkipBackend = $false
)

$ErrorActionPreference = "Stop"

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Finance App - Script de Instalação" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Verificar Node.js
Write-Host "📦 Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = & node --version
    $npmVersion = & npm --version
    Write-Host "✓ Node.js $nodeVersion encontrado" -ForegroundColor Green
    Write-Host "✓ npm $npmVersion encontrado" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "  Baixe em: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Instalar dependências principais
Write-Host "📦 Instalando dependências do projeto..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Erro ao instalar dependências" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Projeto instalado!" -ForegroundColor Green

Write-Host ""

# Instalar backend
if (-not $SkipBackend) {
    Write-Host "📦 Instalando dependências do backend..." -ForegroundColor Yellow
    Push-Location backend
    npm install
    Pop-Location
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Erro ao instalar backend" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Backend instalado!" -ForegroundColor Green
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  ✓ Instalação Completa!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "🚀 Próximas Instruções:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Opção 1 - Executar TUDO junto:" -ForegroundColor Cyan
Write-Host "    npm run dev-all" -ForegroundColor Gray
Write-Host ""
Write-Host "  Opção 2 - Em dois terminais:" -ForegroundColor Cyan
Write-Host "    Terminal 1:" -ForegroundColor Gray
Write-Host "      npm run server" -ForegroundColor Gray
Write-Host ""
Write-Host "    Terminal 2:" -ForegroundColor Gray
Write-Host "      npm run dev" -ForegroundColor Gray
Write-Host ""

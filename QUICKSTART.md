# 🚀 Guia de Início Rápido - Finance App

## Pré-requisitos

Antes de começar, você precisa ter **Node.js** instalado em seu computador.

👉 [Baixar Node.js](https://nodejs.org/) (Versão LTS recomendada)

Após instalar, abra o terminal/PowerShell e verifique:
```bash
node --version
npm --version
```

## 📥 Instalação

### Windows (Recomendado)

1. **Duplo clique em `install.bat`** na pasta do projeto
2. Aguarde a instalação finalizar
3. Siga as instruções na tela

### macOS/Linux

1. Abra o Terminal na pasta do projeto
2. Execute:
```bash
chmod +x install.ps1
./install.ps1
```

### Manual (Todos os SOs)

Abra o terminal na pasta do projeto:

```bash
# Instalar dependências principais
npm install

# Instalar dependências do backend
cd backend
npm install
cd ..
```

## 🎮 Executando o App

### Opção 1: Tudo junto (Recomendado)

```bash
npm run dev-all
```

Isso inicia automaticamente:
- ✅ Servidor backend (porta 5000)
- ✅ App React (porta 3000)  
- ✅ Electron desktop app

### Opção 2: Em terminais separados

**Terminal 1 - Backend:**
```bash
npm run server
# ou mais moderno com hot-reload:
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## 🎨 Usando o App

1. **Nova Transação**: Preencha o formulário à esquerda
   - Escolha tipo (Receita/Despesa)
   - Selecione categoria
   - Insira valor e data
   - Clique em "Adicionar Transação"

2. **Visualizar Dados**:
   - **Resumo**: Cards no topo mostram receita, despesa e saldo
   - **Gráfico**: Pizza chart mostra despesas por categoria
   - **Histórico**: Lista todas as transações

3. **Gerenciar Transações**:
   - Clique 🗑️ para deletar uma transação
   - Confirme a exclusão

## 📊 Categorias Disponíveis

**Receitas:**
- Salário
- Freelance
- Investimentos
- Outros

**Despesas:**
- Alimentação
- Transporte
- Saúde
- Educação
- Lazer
- Moradia
- Outros

## 🔧 Solução de Problemas

### "Porta 5000/3000 já está em uso"
```bash
# Windows - Libera a porta
netstat -ano | findstr :5000
taskkill /PID <número> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### "npm command not found"
- Node.js não está instalado corretamente
- Reinicie o terminal após instalar Node.js

### "Cannot find module"
```bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Electron não abre
```bash
# Tente iniciar manualmente
npm run electron-dev
```

## 📁 Estrutura de Pastas

```
programa/
├── src/                 ← Código React (componentes)
├── public/              ← Arquivos Electron e HTML
├── backend/             ← Servidor Node.js/Express
├── data/                ← Banco de dados SQLite (criado automaticamente)
├── README.md            ← Documentação completa
├── package.json         ← Configurações do projeto
└── install.bat          ← Script de instalação
```

## 🌐 Endpoints da API (Se usar REST)

- `GET /api/transactions` - Lista transações
- `POST /api/transactions` - Adiciona transação
- `DELETE /api/transactions/:id` - Remove transação
- `GET /api/summary` - Retorna resumo (receita, despesa, saldo)

## 💾 Seus Dados

- Os dados são salvos localmente em `data/finance.db`
- Não são enviados para a nuvem
- Você tem controle total dos seus dados

## ⌨️ Atalhos Úteis

| Atalho | Ação |
|--------|------|
| `Ctrl+C` | Parar o servidor |
| `F12` | Abrir DevTools (desenvolvimento) |
| `Ctrl+R` | Recarregar a página |

## 🐛 Reportar Problemas

Se encontrar um bug:
1. Anote os passos para reproduzir
2. Verifique se há mensagens de erro no console (F12)
3. Tente as soluções de problemas acima

## 📚 Próximos Passos

Após ter tudo funcionando:

1. ✅ Adicione algumas transações
2. ✅ Explore o gráfico de despesas
3. ✅ Verifique o saldo na seção de resumo
4. ✅ Delete uma transação (teste)
5. ✅ Feche e reabra o app (verifique persistência)

## 📖 Documentação Completa

Veja `README.md` para documentação técnica completa.

---

**Precisa de ajuda?** Entre em contato ou verifique os logs do console (F12)!

Boa sorte! 💰✨

# 💰 Finance App - App de Controle Financeiro Pessoal

Um aplicativo desktop moderno para gerenciar suas finanças pessoais, controlar receitas, despesas e visualizar seu fluxo de caixa.

## ✨ Funcionalidades

- ✅ **Registro de Receitas e Despesas**: Adicione todas suas transações financeiras
- 📊 **Visualizações Gráficas**: Veja seus gastos por categoria em gráficos intuitivos
- 💼 **Categorização**: Organize suas transações por diferentes categorias
- 📋 **Histórico Completo**: Visualize todas as suas transações
- 🎯 **Resumo Financeiro**: Acompanhe sua renda, despesas e saldo

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + CSS3
- **Desktop**: Electron 27
- **Backend**: Node.js + Express
- **Banco de Dados**: SQLite3
- **Gráficos**: Chart.js + React ChartJS 2

## 📋 Pré-requisitos

- Node.js >= 14.x
- npm ou yarn
- Windows, macOS ou Linux

## 🚀 Instalação

1. **Clone ou extraia o projeto**
```bash
cd programa
```

2. **Instale as dependências do projeto principal**
```bash
npm install
```

3. **Instale as dependências do backend**
```bash
cd backend
npm install
cd ..
```

## 🏃 Como Executar

### Modo de Desenvolvimento (React + Electron + Backend)

```bash
npm run dev-all
```

Este comando inicia simultaneamente:
- Servidor backend na porta 5000
- App React na porta 3000
- App Electron

Ou você pode executar separadamente:

**Terminal 1 - Backend:**
```bash
npm run server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Modo Produção

```bash
npm run build
```

Isto vai:
1. Compilar o React para produção
2. Empacotar como aplicativo Electron

## 📁 Estrutura do Projeto

```
programa/
├── public/
│   ├── electron.js          # Processo principal do Electron
│   ├── preload.js           # Preload script (segurança)
│   └── index.html           # HTML base
├── src/
│   ├── components/          # Componentes React
│   │   ├── Chart.js         # Gráfico de despesas
│   │   ├── Summary.js       # Resumo financeiro
│   │   ├── TransactionForm.js # Formulário para adicionar transações
│   │   └── TransactionList.js # Lista de transações
│   ├── App.js               # Componente principal
│   └── index.js             # Ponto de entrada React
├── backend/
│   ├── server.js            # Servidor Express + rotas API
│   └── package.json         # Dependências do backend
└── package.json             # Dependências do projeto
```

## 🔄 Fluxo de Dados

```
Electron App (Desktop)
    ↓
React Components
    ↓
IPC Communication
    ↓
Node.js / Express API
    ↓
SQLite Database
```

## 📊 Endpoints da API

### Transações
- `GET /api/transactions` - Lista todas as transações
- `POST /api/transactions` - Adiciona nova transação
- `DELETE /api/transactions/:id` - Deleta uma transação

### Resumos
- `GET /api/summary` - Retorna resumo: receitas, despesas e saldo
- `GET /api/categories` - Retorna totais por categoria

## 💾 Banco de Dados

O banco de dados SQLite é armazenado em `data/finance.db` com a seguinte estrutura:

```sql
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,           -- 'receita' ou 'despesa'
  category TEXT NOT NULL,       -- categoria da transação
  description TEXT,             -- descrição opcional
  amount REAL NOT NULL,         -- valor da transação
  date TEXT NOT NULL,           -- data da transação
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## 🎨 Temas e Estilos

O app utiliza um design moderno com:
- Gradiente purpura/rosa como cor primária
- Cards brancos com sombras suaves
- Animações fluidas e transições
- Emojis para melhor UX
- Design responsivo

## 🐛 Solução de Problemas

### Porta 5000 ou 3000 já está em uso
```bash
# Mude as portas no código ou libere a porta
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Banco de dados não encontrado
- A pasta `data/` será criada automaticamente na primeira execução
- Certifique-se de ter permissões de escrita no diretório

### Electron não inicia
```bash
# Limpe node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Próximas Melhorias

- [ ] Backup e restore de dados
- [ ] Gráficos de tendência ao longo do tempo
- [ ] Orçamentos e metas de gastos
- [ ] Múltiplas contas bancárias
- [ ] Integração com APIs bancárias
- [ ] Sincronização em nuvem
- [ ] App mobile (React Native)

## 📝 Licença

MIT - Sinta-se livre para usar este projeto

## 👤 Autor

Criado com ❤️ para ajudar você a controlar suas finanças

---

**Dúvidas ou sugestões?** Abra uma issue ou entre em contato!

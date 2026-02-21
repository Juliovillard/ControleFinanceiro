# 📋 Estrutura do Projeto - Finance App

```
programa/
│
├── 📂 src/                              # React Components
│   ├── components/
│   │   ├── Chart.js                    # Gráfico de despesas (Chart.js)
│   │   ├── Chart.css
│   │   ├── Summary.js                  # Cards de resumo (Receita/Despesa/Saldo)
│   │   ├── Summary.css
│   │   ├── TransactionForm.js          # Formulário para adicionar transações
│   │   ├── TransactionForm.css
│   │   ├── TransactionList.js          # Lista de transações
│   │   └── TransactionList.css
│   ├── App.js                          # Componente principal
│   ├── App.css
│   ├── index.js                        # Ponto de entrada React
│   └── index.css                       # Estilos globais
│
├── 📂 public/                           # Assets e Electron main
│   ├── electron.js                     # ⚙️ Processo principal do Electron
│   ├── preload.js                      # Bridge segura (IPC)
│   └── index.html                      # HTML base
│
├── 📂 backend/                          # Node.js/Express API
│   ├── server.js                       # ⚙️ Servidor Express com rotas
│   └── package.json                    # Dependências do backend
│
├── 📂 data/                             # Banco de Dados
│   └── finance.db                      # SQLite (criado automaticamente)
│
├── 📂 .vscode/                          # (Opcional) Configurações VS Code
│
├── 📄 package.json                      # Dependências principales
├── 📄 .gitignore                        # Arquivos ignorados pelo Git
├── 📄 .env.example                      # Exemplo de variáveis de ambiente
│
├── 🚀 install.bat                       # Script instalação (Windows)
├── 🚀 install.ps1                       # Script instalação (PowerShell)
├── 🚀 start.bat                         # Inicia servidor+cliente
│
├── 📖 README.md                         # Documentação completa
├── 📖 QUICKSTART.md                     # Guia rápido
└── 📖 PROJECT_STRUCTURE.md              # Este arquivo
```

## 🔄 Fluxo de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                      ELECTRON DESKTOP APP                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────┐            │
│  │         REACT COMPONENTS (src/)              │            │
│  ├──────────────────────────────────────────────┤            │
│  │ ┌─────────┐  ┌──────────┐  ┌─────────────┐ │            │
│  │ │ Summary │  │ Chart    │  │ Transaction  │ │            │
│  │ │  Cards  │  │  (Pie)   │  │   Manager    │ │            │
│  │ └─────────┘  └──────────┘  └─────────────┘ │            │
│  │                                              │            │
│  └──────────────────────────────────────────────┘            │
│           │                                                   │
│           ▼                                                   │
│  ┌──────────────────────────────────────────────┐            │
│  │    IPC (Inter-Process Communication)         │            │
│  │    (Electron → Node.js)                      │            │
│  └──────────────────────────────────────────────┘            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
    ┌─────────────────────────────────────────┐
    │    NODE.JS / EXPRESS SERVER (Port 5000) │
    ├─────────────────────────────────────────┤
    │                                          │
    │  GET   /api/transactions                │
    │  POST  /api/transactions                │
    │  DELETE /api/transactions/:id           │
    │  GET   /api/summary                     │
    │  GET   /api/categories                  │
    │                                          │
    └─────────────────────────────────────────┘
                        │
                        ▼
    ┌─────────────────────────────────────────┐
    │       SQLITE DATABASE (data/finance.db) │
    ├─────────────────────────────────────────┤
    │                                          │
    │  ┌──────────────────────────────────┐   │
    │  │ TABLE: transactions              │   │
    │  ├──────────────────────────────────┤   │
    │  │ - id (INTEGER, PRIMARY KEY)      │   │
    │  │ - type (TEXT: receita/despesa)   │   │
    │  │ - category (TEXT)                │   │
    │  │ - description (TEXT)             │   │
    │  │ - amount (REAL)                  │   │
    │  │ - date (TEXT)                    │   │
    │  │ - created_at (DATETIME)          │   │
    │  └──────────────────────────────────┘   │
    │                                          │
    └─────────────────────────────────────────┘
```

## 📦 Dependências Principais

### Frontend (React)
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1",
  "chart.js": "^4.4.0",
  "react-chartjs-2": "^5.2.0",
  "axios": "^1.6.0"
}
```

### Desktop (Electron)
```json
{
  "electron": "^27.0.0",
  "electron-builder": "^24.6.4",
  "concurrently": "^8.2.1",
  "wait-on": "^7.0.1"
}
```

### Backend (Node.js)
```json
{
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "sqlite3": "^5.1.6"
}
```

## 🎯 Funcionalidades por Componente

### Summary.js
- Exibe cards com:
  - Total de Receitas
  - Total de Despesas
  - Saldo (Receita - Despesa)
- Cores: Verde (receita), Vermelho (despesa), Azul (saldo positivo)

### TransactionForm.js
- Entrada de dados:
  - Tipo (Receita/Despesa)
  - Categoria (dinâmica conforme tipo)
  - Descrição (opcional)
  - Valor (validado)
  - Data

### TransactionList.js
- Exibe histórico em ordem cronológica
- Ícones de categoria (emojis)
- Opção de deletar
- Scroll customizado

### Chart.js
- Gráfico de pizza
- Mostra distribuição de despesas por categoria
- Atualiza em tempo real

## 🔀 Ciclo de Vida da Aplicação

1. **Inicialização:**
   - Electron inicia (main process)
   - React renderiza na janela
   - Backend Express inicia na porta 5000

2. **Load de Dados:**
   - React carrega transações via API
   - Calcula resumo (receita/despesa/saldo)
   - Renderiza componentes

3. **Adicionar Transação:**
   - Usuário preenche form
   - React envia via IPC/API
   - Backend salva no SQLite
   - React atualiza lista e resumo

4. **Deletar Transação:**
   - Usuário clica botão deletar
   - Confirmação
   - React envia ID via API
   - Backend remove do banco
   - React atualiza interface

5. **Visualizar Dados:**
   - Summary mostra totais
   - Chart mostra distribuição
   - List mostra todas as transações

## 🔐 Segurança

- **Electron Preload**: Script de bridge seguro (IPC)
- **Node Integration**: Desabilitado por segurança
- **Context Isolation**: Habilitado
- **SQLite Local**: Dados não são enviados online
- **CORS**: Restrito a localhost

## 📊 Banco de Dados

### Schema
```sql
CREATE TABLE transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL,           -- 'receita' ou 'despesa'
  category TEXT NOT NULL,       -- categoria selecionada
  description TEXT,             -- nota opcional
  amount REAL NOT NULL,         -- valor em reais
  date TEXT NOT NULL,           -- YYYY-MM-DD
  created_at DATETIME           -- timestamp da criação
);
```

### Índices (Recomendado)
```sql
CREATE INDEX idx_date ON transactions(date);
CREATE INDEX idx_type ON transactions(type);
CREATE INDEX idx_category ON transactions(category);
```

## 🚀 Como Adicionar Novas Funcionalidades

### Exemplo: Adicionar Categoria
1. Editar `TransactionForm.js` → categories object
2. Editar labels em português
3. Backend já suporta qualquer string em category

### Exemplo: Novo Componente
1. Criar arquivo em `src/components/NovoComp.js`
2. Importar no `App.js`
3. Adicionar visualização e estilos CSS
4. Comunicar com backend via axios

### Exemplo: Nova Rota API
1. Adicionar em `backend/server.js`
2. Usar db.run() ou db.all()
3. Retornar JSON
4. Chamar via axios no React

## 📝 Notas Importantes

- ✅ Banco de dados persiste entre execuções
- ✅ App salva dados localmente (sem cloud)
- ✅ Responsive design em desenvolvimento
- ✅ Suporta Windows, macOS e Linux
- ⚠️ SQLite3 pode ter dificuldades de compilação no Windows (pré-instalado neste projeto)

## 🔄 Próximas Melhorias Sugeridas

- [ ] Backup automático
- [ ] Pesquisa/filtro de transações
- [ ] Exportar CSV/PDF
- [ ] Gráficos por mês
- [ ] Metas de orçamento
- [ ] Múltiplas contas
- [ ] Sincronização cloud
- [ ] App mobile (React Native)
- [ ] Temas (claro/escuro)
- [ ] Integração bancária

---

**Última atualização**: Fevereiro de 2026

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Garantir que a pasta data existe
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('[INFO] Pasta data/ criada');
}

// Banco de dados SQLite
const dbPath = path.join(dataDir, 'finance.db');
console.log('[INFO] Banco de dados:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('[ERRO] Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  } else {
    console.log('[OK] ✓ Conectado ao banco de dados SQLite');
    initializeDatabase();
  }
});

// Inicializar tabelas
function initializeDatabase() {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('[ERRO] Erro ao criar tabela:', err);
    } else {
      console.log('[OK] ✓ Tabela de transações pronta');
    }
  });
}

// Rotas
// GET - Obter todas as transações
app.get('/api/transactions', (req, res) => {
  db.all('SELECT * FROM transactions ORDER BY date DESC', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows || []);
  });
});

// POST - Adicionar nova transação
app.post('/api/transactions', (req, res) => {
  const { type, category, description, amount, date } = req.body;

  if (!type || !category || !amount || !date) {
    res.status(400).json({ error: 'Campos obrigatórios faltando' });
    return;
  }

  db.run(
    'INSERT INTO transactions (type, category, description, amount, date) VALUES (?, ?, ?, ?, ?)',
    [type, category, description || '', amount, date],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, type, category, description, amount, date });
    }
  );
});

// DELETE - Deletar transação
app.delete('/api/transactions/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM transactions WHERE id = ?', [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

// GET - Resumo financeiro
app.get('/api/summary', (req, res) => {
  db.all('SELECT type, amount FROM transactions', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    let income = 0;
    let expense = 0;

    rows.forEach((row) => {
      if (row.type === 'receita') {
        income += row.amount;
      } else if (row.type === 'despesa') {
        expense += row.amount;
      }
    });

    res.json({
      income,
      expense,
      balance: income - expense,
    });
  });
});

// GET - Resumo por categoria
app.get('/api/categories', (req, res) => {
  db.all(
    'SELECT category, type, SUM(amount) as total FROM transactions GROUP BY category, type',
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows || []);
    }
  );
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║  FINANCE APP - Backend Server                      ║');
  console.log('║  Servidor rodando em:                              ║');
  console.log(`║  ✓ http://localhost:${PORT}`);
  console.log(`║  ✓ http://192.168.1.4:${PORT} (rede local)`);
  console.log('║                                                    ║');
  console.log('║  NÃO FECHE ESTA JANELA!                           ║');
  console.log('║  Pressione Ctrl+C para parar                       ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log('');
  console.log('[INFO] Aguardando requisições...');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('');
  console.log('[INFO] Encerrando servidor...');
  db.close(() => {
    console.log('[OK] Banco de dados fechado');
    process.exit(0);
  });
});

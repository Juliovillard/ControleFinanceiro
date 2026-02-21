const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const axios = require('axios');

// Detectar modo desenvolvimento
const isDev = process.env.NODE_ENV === 'development' || 
              (process.argv && process.argv.some(arg => arg === '--dev'));

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'icon.png'),
  });

  const startUrl = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC Handlers para comunicação com o frontend
ipcMain.handle('get-transactions', async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/transactions');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    return [];
  }
});

ipcMain.handle('add-transaction', async (event, transaction) => {
  try {
    const response = await axios.post('http://localhost:5000/api/transactions', transaction);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar transação:', error);
    throw error;
  }
});

ipcMain.handle('delete-transaction', async (event, id) => {
  try {
    await axios.delete(`http://localhost:5000/api/transactions/${id}`);
    return true;
  } catch (error) {
    console.error('Erro ao deletar transação:', error);
    throw error;
  }
});

ipcMain.handle('get-summary', async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/summary');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar resumo:', error);
    return { income: 0, expense: 0, balance: 0 };
  }
});

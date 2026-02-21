const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('financeAPI', {
  getTransactions: () => ipcRenderer.invoke('get-transactions'),
  addTransaction: (transaction) => ipcRenderer.invoke('add-transaction', transaction),
  deleteTransaction: (id) => ipcRenderer.invoke('delete-transaction', id),
  getSummary: () => ipcRenderer.invoke('get-summary'),
});

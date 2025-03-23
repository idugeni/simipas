import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { SimpegAutomation } from './lib/automation';
import logger from './lib/logger';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, '../assets/icon.png'),
  });

  // Dalam development mode, load dari server Vite
  if (process.env.NODE_ENV === 'development') {
    // Tunggu server Vite siap sebelum memuat URL
    const loadViteDevServer = async () => {
      try {
        if (mainWindow) {
          await mainWindow.loadURL('http://localhost:3000');
          mainWindow.webContents.openDevTools();
        }
      } catch (error) {
        console.error('Error loading Vite dev server:', error);
        // Coba lagi setelah 1 detik jika gagal
        setTimeout(loadViteDevServer, 1000);
      }
    };
    loadViteDevServer();
  } else {
    // Dalam production mode, load file HTML yang sudah di-build
    if (mainWindow) {
      mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
    }
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Menangani pesan dari renderer process
ipcMain.handle('run-automation', async (_, userInput) => {
  try {
    logger.info('Memulai otomasi dengan input:', userInput);
    const automation = new SimpegAutomation();
    const result = await automation.run(userInput);
    return { success: true, result };
  } catch (error) {
    logger.error('Error dalam menjalankan otomasi:', error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
});
import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { SimpegAutomation } from "./lib/automation";
import logger from "./lib/logger";
import { DatabaseManager } from "./lib/database";
import { User } from "./lib/types";

let mainWindow: BrowserWindow | null = null;
const dbManager = new DatabaseManager();

// IPC handlers for user management
ipcMain.handle("get-all-users", async () => {
  try {
    return dbManager.getAllUsers();
  } catch (error) {
    logger.error("Error getting all users:", error);
    throw error;
  }
});

ipcMain.handle("get-user", async (_, nip: string) => {
  try {
    const user = await dbManager.getUserByNip(nip);
    if (!user) {
      throw new Error(`User with NIP ${nip} not found`);
    }
    return user;
  } catch (error) {
    logger.error("Error getting user:", error);
    throw error;
  }
});

ipcMain.handle("add-user", async (_, userData: User) => {
  try {
    return dbManager.addUser(userData);
  } catch (error) {
    logger.error("Error adding user:", error);
    throw error;
  }
});

ipcMain.handle("update-user", async (_, userData: User) => {
  try {
    return dbManager.updateUser(userData);
  } catch (error) {
    logger.error("Error updating user:", error);
    throw error;
  }
});

ipcMain.handle("delete-user", async (_, nip: string) => {
  try {
    return dbManager.deleteUser(nip);
  } catch (error) {
    logger.error("Error deleting user:", error);
    throw error;
  }
});

ipcMain.handle("create-user", async (_, userData: User) => {
  try {
    await dbManager.addUser(userData);
  } catch (error) {
    logger.error("Error creating user:", error);
    throw error;
  }
});

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true,
    icon: path.join(__dirname, "../assets/icon.png"),
  });

  // Dalam development mode, load dari server Vite
  if (process.env.NODE_ENV === "development") {
    // Tunggu server Vite siap sebelum memuat URL
    const loadViteDevServer = async () => {
      try {
        if (mainWindow) {
          await mainWindow.loadURL("http://localhost:3000");
          mainWindow.webContents.openDevTools();
        }
      } catch (error) {
        logger.error(`Error loading Vite dev server: ${error}`);
        // Coba lagi setelah 1 detik jika gagal
        setTimeout(loadViteDevServer, 1000);
      }
    };
    loadViteDevServer();
  } else {
    // Dalam production mode, load file HTML yang sudah di-build
    if (mainWindow) {
      mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
    }
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Menangani pesan dari renderer process
ipcMain.handle("run-automation", async (_, userInput) => {
  try {
    logger.info("Memulai otomasi dengan input:", userInput);
    const automation = new SimpegAutomation();
    const result = await automation.run(userInput);
    return { success: true, result };
  } catch (error) {
    logger.error("Error dalam menjalankan otomasi:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
});

import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('api', {
  runAutomation: (userInput: any) => ipcRenderer.invoke('run-automation', userInput),
  onLogMessage: (callback: (log: { timestamp: string; level: string; message: string }) => void) => {
    ipcRenderer.on('log-message', (_, log) => callback(log));
  }
});
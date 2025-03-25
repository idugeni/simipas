import { contextBridge, ipcRenderer } from "electron";
import { User, UserActivity } from "./lib/types";

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("api", {
  runAutomation: (userInput: {
    shiftType: "ALL" | "SINGLE";
    date?: Date;
    startDate?: Date;
    endDate?: Date;
  }) => ipcRenderer.invoke("run-automation", userInput),
  onLogMessage: (
    callback: (log: {
      timestamp: string;
      level: string;
      message: string;
    }) => void,
  ) => {
    ipcRenderer.on("log-message", (_, log) => callback(log));
  },
  getAllUsers: () => ipcRenderer.invoke("get-all-users") as Promise<User[]>,
  getUsers: () => ipcRenderer.invoke("get-all-users") as Promise<User[]>,
  getUser: (nip: string) =>
    ipcRenderer.invoke("get-user", nip) as Promise<User>,
  addUser: (userData: User) => ipcRenderer.invoke("add-user", userData),
  updateUser: (userData: User) => ipcRenderer.invoke("update-user", userData),
  deleteUser: (nip: string) => ipcRenderer.invoke("delete-user", nip),
  createUser: (userData: User) => ipcRenderer.invoke("create-user", userData),
  getUserActivities: (nip: string) =>
    ipcRenderer.invoke("get-user-activities", nip),
  addUserActivity: (nip: string, activityData: UserActivity) =>
    ipcRenderer.invoke("add-user-activity", nip, activityData),
  updateUserActivity: (nip: string, activityData: UserActivity) =>
    ipcRenderer.invoke("update-user-activity", nip, activityData),
  deleteUserActivity: (activityId: number) =>
    ipcRenderer.invoke("delete-user-activity", activityId),
  exit: () => ipcRenderer.invoke("exit-app"),
});

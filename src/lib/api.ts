import { AutomationResult, User, UserInput } from "./types";

export interface API {
  runAutomation: (userInput: UserInput) => Promise<AutomationResult>;
  onLogMessage: (
    callback: (log: {
      timestamp: string;
      level: string;
      message: string;
    }) => void,
  ) => void;
  getAllUsers: () => Promise<User[]>;
  getUsers: () => Promise<User[]>;
  getUser: (nip: string) => Promise<User>;
  addUser: (userData: User) => Promise<void>;
  createUser: (userData: User) => Promise<void>;
  updateUser: (userData: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUserActivity: (
    nip: string,
    activityData: {
      skpkgOption: number;
      startTime: string;
      endTime: string;
      description: string;
      quantity: number;
    },
  ) => Promise<void>;
  exit: () => void;
}

declare global {
  interface Window {
    api: API;
  }
}

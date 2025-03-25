import { AutomationResult, User, UserActivity, UserInput } from "./types";

export interface API {
  runAutomation: (userInput: UserInput) => Promise<AutomationResult>;
  onLogMessage: (
    callback: (log: {
      timestamp: string;
      level: string;
      message: string;
    }) => void,
  ) => void;

  // User management
  getAllUsers: () => Promise<User[]>;
  getUsers: () => Promise<User[]>;
  getUser: (nip: string) => Promise<User>;
  addUser: (userData: User) => Promise<void>;
  createUser: (userData: User) => Promise<void>;
  updateUser: (userData: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;

  // Activity management
  getUserActivities: (nip: string) => Promise<UserActivity[]>;
  addUserActivity: (nip: string, activityData: UserActivity) => Promise<void>;
  updateUserActivity: (
    nip: string,
    activityData: UserActivity,
  ) => Promise<void>;
  deleteUserActivity: (activityId: number) => Promise<void>;

  exit: () => void;
}

declare global {
  interface Window {
    api: API;
  }
}

import { User, UserActivity } from "../../lib/types";

declare global {
  interface Window {
    api: {
      // User management
      getAllUsers: () => Promise<User[]>;
      addUser: (user: Omit<User, "id">) => Promise<number>;
      updateUser: (user: User) => Promise<void>;
      deleteUser: (nip: string) => Promise<void>;

      // User activities
      getUserActivities: (nip: string) => Promise<UserActivity[]>;
      addUserActivity: (
        nip: string,
        activityData: Omit<UserActivity, "id" | "userId" | "createdAt">,
      ) => Promise<number>;
      updateUserActivity: (
        nip: string,
        activity: UserActivity,
      ) => Promise<void>;
      deleteUserActivity: (activityId: number) => Promise<void>;
    };
  }
}

export {};

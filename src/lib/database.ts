import Database from "better-sqlite3";
import * as path from "path";
import logger from "./logger";
import { User, UserActivity } from "./types";

export type ShiftType =
  | "SIANG"
  | "PAGI_MALAM"
  | "LEPAS_PIKET"
  | "LIBUR"
  | "NON_SHIFT"
  | "SHIFT_SIANG_KHUSUS";

export interface UserConfig {
  id?: number;
  userId: number;
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  status?: string;
}

export interface ShiftConfig {
  id?: number;
  userId: number;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  activities: {
    title: string;
    description: string;
    status?: string;
  }[];
  isTemplate?: boolean;
  createdAt?: string;
}

export class DatabaseManager {
  private db: Database.Database;

  constructor() {
    const dbPath = path.join(__dirname, "..", "..", "data", "users.db");
    this.db = new Database(dbPath);
    this.initializeDatabase();
  }

  private initializeDatabase() {
    try {
      this.db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullName TEXT NOT NULL,
          nip TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          userType TEXT NOT NULL CHECK(userType IN ('PENGAMANAN', 'STAFF ADMINISTRASI')),
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS user_configs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          title TEXT NOT NULL,
          startTime TEXT NOT NULL,
          endTime TEXT NOT NULL,
          description TEXT NOT NULL,
          status TEXT,
          FOREIGN KEY (userId) REFERENCES users(id)
        );

        CREATE TABLE IF NOT EXISTS shift_configs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          shiftType TEXT NOT NULL CHECK(shiftType IN ('SIANG', 'PAGI_MALAM', 'LEPAS_PIKET', 'LIBUR', 'NON_SHIFT', 'SHIFT_SIANG_KHUSUS')),
          startTime TEXT NOT NULL,
          endTime TEXT NOT NULL,
          activities TEXT NOT NULL,
          isTemplate BOOLEAN DEFAULT 0,
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
        );
        
        CREATE TABLE IF NOT EXISTS user_activities (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          userId INTEGER NOT NULL,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          startTime TEXT NOT NULL,
          endTime TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'pending',
          createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (userId) REFERENCES users(id)
        );
      `);
      logger.info("Database initialized successfully");
    } catch (error) {
      logger.error("Error initializing database:", error);
      throw error;
    }
  }

  public addUser(user: User): number {
    try {
      const stmt = this.db.prepare(
        "INSERT INTO users (fullName, nip, password, userType) VALUES (?, ?, ?, ?)",
      );
      const result = stmt.run(
        user.fullName,
        user.nip,
        user.password,
        user.userType,
      );
      return result.lastInsertRowid as number;
    } catch (error) {
      logger.error("Error adding user:", error);
      throw error;
    }
  }

  public getUserByNip(nip: string): User | null {
    try {
      const stmt = this.db.prepare("SELECT * FROM users WHERE nip = ?");
      return stmt.get(nip) as User | null;
    } catch (error) {
      logger.error("Error getting user:", error);
      throw error;
    }
  }

  public updateUser(user: User): void {
    try {
      const stmt = this.db.prepare(
        "UPDATE users SET fullName = ?, password = ?, userType = ? WHERE nip = ?",
      );
      stmt.run(user.fullName, user.password, user.userType, user.nip);
    } catch (error) {
      logger.error("Error updating user:", error);
      throw error;
    }
  }

  public deleteUser(nip: string): void {
    try {
      const stmt = this.db.prepare("DELETE FROM users WHERE nip = ?");
      stmt.run(nip);
    } catch (error) {
      logger.error("Error deleting user:", error);
      throw error;
    }
  }

  public getAllUsers(): User[] {
    try {
      const stmt = this.db.prepare("SELECT * FROM users");
      return stmt.all() as User[];
    } catch (error) {
      logger.error("Error getting all users:", error);
      throw error;
    }
  }

  public addUserConfig(config: UserConfig): number {
    try {
      const stmt = this.db.prepare(
        "INSERT INTO user_configs (userId, title, startTime, endTime, description, status) VALUES (?, ?, ?, ?, ?, ?)",
      );
      const result = stmt.run(
        config.userId,
        config.title,
        config.startTime,
        config.endTime,
        config.description,
        config.status,
      );
      return result.lastInsertRowid as number;
    } catch (error) {
      logger.error("Error adding user config:", error);
      throw error;
    }
  }

  public getUserConfigs(userId: number): UserConfig[] {
    try {
      const stmt = this.db.prepare(
        "SELECT * FROM user_configs WHERE userId = ?",
      );
      return stmt.all(userId) as UserConfig[];
    } catch (error) {
      logger.error("Error getting user configs:", error);
      throw error;
    }
  }

  public updateUserConfig(config: UserConfig): void {
    try {
      const stmt = this.db.prepare(
        "UPDATE user_configs SET title = ?, startTime = ?, endTime = ?, description = ?, status = ? WHERE id = ?",
      );
      stmt.run(
        config.title,
        config.startTime,
        config.endTime,
        config.description,
        config.status,
        config.id,
      );
    } catch (error) {
      logger.error("Error updating user config:", error);
      throw error;
    }
  }

  public deleteUserConfig(configId: number): void {
    try {
      const stmt = this.db.prepare("DELETE FROM user_configs WHERE id = ?");
      stmt.run(configId);
    } catch (error) {
      logger.error("Error deleting user config:", error);
      throw error;
    }
  }

  public addShiftConfig(config: ShiftConfig): number {
    try {
      const stmt = this.db.prepare(
        "INSERT INTO shift_configs (userId, shiftType, startTime, endTime, activities, isTemplate) VALUES (?, ?, ?, ?, ?, ?)",
      );
      const result = stmt.run(
        config.userId,
        config.shiftType,
        config.startTime,
        config.endTime,
        JSON.stringify(config.activities),
        config.isTemplate || false,
      );
      return result.lastInsertRowid as number;
    } catch (error) {
      logger.error("Error adding shift config:", error);
      throw error;
    }
  }

  public getShiftConfigs(userId: number, isTemplate?: boolean): ShiftConfig[] {
    try {
      let query = "SELECT * FROM shift_configs WHERE userId = ?";
      const params: (number | boolean)[] = [userId];

      if (typeof isTemplate === "boolean") {
        query += " AND isTemplate = ?";
        params.push(isTemplate);
      }

      const stmt = this.db.prepare(query);
      const results = stmt.all(...params) as (ShiftConfig & {
        activities: string;
      })[];

      return results.map((row) => ({
        id: row.id,
        userId: row.userId,
        shiftType: row.shiftType,
        startTime: row.startTime,
        endTime: row.endTime,
        activities: JSON.parse(row.activities as string),
        isTemplate: row.isTemplate,
        createdAt: row.createdAt,
      }));
    } catch (error) {
      logger.error("Error getting shift configs:", error);
      throw error;
    }
  }

  public updateShiftConfig(config: ShiftConfig): void {
    try {
      const stmt = this.db.prepare(
        "UPDATE shift_configs SET shiftType = ?, startTime = ?, endTime = ?, activities = ?, isTemplate = ? WHERE id = ?",
      );
      stmt.run(
        config.shiftType,
        config.startTime,
        config.endTime,
        JSON.stringify(config.activities),
        config.isTemplate || false,
        config.id,
      );
    } catch (error) {
      logger.error("Error updating shift config:", error);
      throw error;
    }
  }

  public deleteShiftConfig(configId: number): void {
    try {
      const stmt = this.db.prepare("DELETE FROM shift_configs WHERE id = ?");
      stmt.run(configId);
    } catch (error) {
      logger.error("Error deleting shift config:", error);
      throw error;
    }
  }

  // User Activities Methods
  public getUserActivities(nip: string): UserActivity[] {
    try {
      // First get the user ID from nip
      const user = this.getUserByNip(nip);
      if (!user || !user.id) {
        throw new Error(`User with NIP ${nip} not found`);
      }

      const stmt = this.db.prepare(
        "SELECT * FROM user_activities WHERE userId = ? ORDER BY createdAt DESC",
      );
      return stmt.all(user.id) as UserActivity[];
    } catch (error) {
      logger.error("Error getting user activities:", error);
      throw error;
    }
  }

  public addUserActivity(nip: string, activity: UserActivity): number {
    try {
      // First get the user ID from nip
      const user = this.getUserByNip(nip);
      if (!user || !user.id) {
        throw new Error(`User with NIP ${nip} not found`);
      }

      const stmt = this.db.prepare(
        "INSERT INTO user_activities (userId, title, description, startTime, endTime, status) VALUES (?, ?, ?, ?, ?, ?)",
      );
      const result = stmt.run(
        user.id,
        activity.title,
        activity.description,
        activity.startTime,
        activity.endTime,
        activity.status || "pending",
      );
      return result.lastInsertRowid as number;
    } catch (error) {
      logger.error("Error adding user activity:", error);
      throw error;
    }
  }

  public updateUserActivity(nip: string, activity: UserActivity): void {
    try {
      // First check if the user exists
      const user = this.getUserByNip(nip);
      if (!user) {
        throw new Error(`User with NIP ${nip} not found`);
      }

      // Then update the activity
      const stmt = this.db.prepare(
        "UPDATE user_activities SET title = ?, description = ?, startTime = ?, endTime = ?, status = ? WHERE id = ?",
      );
      stmt.run(
        activity.title,
        activity.description,
        activity.startTime,
        activity.endTime,
        activity.status || "pending",
        activity.id,
      );
    } catch (error) {
      logger.error("Error updating user activity:", error);
      throw error;
    }
  }

  public deleteUserActivity(activityId: number): void {
    try {
      const stmt = this.db.prepare("DELETE FROM user_activities WHERE id = ?");
      stmt.run(activityId);
    } catch (error) {
      logger.error("Error deleting user activity:", error);
      throw error;
    }
  }

  public close(): void {
    this.db.close();
  }
}

export const dbManager = new DatabaseManager();

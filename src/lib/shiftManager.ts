import { dbManager } from "./database";
import type { ShiftConfig, ShiftType, User, UserType } from "./database";
import logger from "./logger";

export class ShiftManager {
  private static readonly SHIFT_TIMES = {
    SIANG: { start: "13:01", end: "19:01" },
    PAGI: { start: "07:01", end: "13:01" },
    MALAM_1: { start: "19:01", end: "23:59" },
    MALAM_2: { start: "00:01", end: "07:01" },
    NON_SHIFT: {
      WEEKDAY: { start: "07:30", end: "15:30" },
      FRIDAY: { start: "07:30", end: "12:30" },
      SATURDAY: { start: "07:30", end: "11:30" },
    },
    SHIFT_SIANG_KHUSUS: { start: "13:01", end: "19:01" },
  };

  private static readonly SHIFT_ROTATION = [
    "SIANG",
    "PAGI_MALAM",
    "LEPAS_PIKET",
    "LIBUR",
  ] as const;

  public static getDefaultShiftConfig(
    userType: UserType,
    shiftType: ShiftType,
  ): Partial<ShiftConfig> {
    const config: Partial<ShiftConfig> = {
      shiftType,
      activities: [],
    };

    if (userType === "PENGAMANAN") {
      switch (shiftType) {
        case "SIANG":
          config.startTime = this.SHIFT_TIMES.SIANG.start;
          config.endTime = this.SHIFT_TIMES.SIANG.end;
          break;
        case "PAGI_MALAM":
          config.startTime = this.SHIFT_TIMES.PAGI.start;
          config.endTime = this.SHIFT_TIMES.MALAM_2.end;
          break;
        case "LEPAS_PIKET":
        case "LIBUR":
          config.startTime = "00:00";
          config.endTime = "23:59";
          break;
      }
    } else {
      // STAFF ADMINISTRASI
      switch (shiftType) {
        case "NON_SHIFT":
          config.startTime = this.SHIFT_TIMES.NON_SHIFT.WEEKDAY.start;
          config.endTime = this.SHIFT_TIMES.NON_SHIFT.WEEKDAY.end;
          break;
        case "SHIFT_SIANG_KHUSUS":
          config.startTime = this.SHIFT_TIMES.SHIFT_SIANG_KHUSUS.start;
          config.endTime = this.SHIFT_TIMES.SHIFT_SIANG_KHUSUS.end;
          break;
      }
    }

    return config;
  }

  public static getNextShiftType(currentShift: ShiftType): ShiftType | null {
    if (!this.SHIFT_ROTATION.includes(currentShift)) {
      return null;
    }
    const currentIndex = this.SHIFT_ROTATION.indexOf(currentShift);
    const nextIndex = (currentIndex + 1) % this.SHIFT_ROTATION.length;
    return this.SHIFT_ROTATION[nextIndex];
  }

  public static async applyShiftConfig(
    userId: number,
    startDate: Date,
    endDate: Date,
    shiftConfig: ShiftConfig,
  ): Promise<void> {
    try {
      const user = await this.getUserById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }

      let currentDate = new Date(startDate);
      let currentShift = shiftConfig.shiftType;

      while (currentDate <= endDate) {
        const config = { ...shiftConfig };
        config.createdAt = currentDate.toISOString();

        // Adjust times for staff on specific days
        if (
          user.userType === "STAFF ADMINISTRASI" &&
          config.shiftType === "NON_SHIFT"
        ) {
          const day = currentDate.getDay();
          if (day === 5) {
            // Friday
            config.endTime = this.SHIFT_TIMES.NON_SHIFT.FRIDAY.end;
          } else if (day === 6) {
            // Saturday
            config.endTime = this.SHIFT_TIMES.NON_SHIFT.SATURDAY.end;
          }
        }

        await dbManager.addShiftConfig(config);

        // Get next shift type for PENGAMANAN
        if (user.userType === "PENGAMANAN") {
          currentShift = this.getNextShiftType(currentShift) || currentShift;
        }

        // Move to next day
        currentDate.setDate(currentDate.getDate() + 1);
      }

      logger.info(
        `Successfully applied shift config for user ${userId} from ${startDate} to ${endDate}`,
      );
    } catch (error) {
      logger.error("Error applying shift config:", error);
      throw error;
    }
  }

  private static async getUserById(userId: number): Promise<User | null> {
    try {
      const users = dbManager.getAllUsers();
      return users.find((user) => user.id === userId) || null;
    } catch (error) {
      logger.error("Error getting user by ID:", error);
      throw error;
    }
  }
}

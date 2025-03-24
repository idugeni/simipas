// src/index.ts
import { SimpegAutomation } from "../lib/automation";
import logger from "../lib/logger";
import { UserInput } from "../lib/types";

async function main() {
  const automation = new SimpegAutomation();
  const userInput: UserInput = {
    shiftType: "ALL",
  };
  await automation.run(userInput);
}

main().catch((error) => {
  logger.error("Error in main program:", error);
  process.exit(1);
});

// src/index.ts
import { SimpegAutomation } from '@/lib/automation';
import logger from '@/lib/logger';

async function main() {
  const automation = new SimpegAutomation();
  await automation.run();
}

main().catch(error => {
  logger.error('Error in main program:', error);
  process.exit(1);
});

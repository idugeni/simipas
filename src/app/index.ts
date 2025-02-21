// src/usage.ts
import { SimpegAutomation } from '@/lib/automation';

async function main() {
    const automation = new SimpegAutomation();
    await automation.run();
}

main().catch(console.error);
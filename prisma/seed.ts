export * from '../apps/api/src/common/seed-data';

export async function main() {
  console.log('Seed data definitions ready for PRESTIGE MBM.');
}

if (require.main === module) {
  main().catch(console.error);
}

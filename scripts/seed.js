const { db } = require("@vercel/postgres");

async function seedNotes(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createdTable = await client.sql`
      CREATE TABLE IF NOT EXISTS notes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID,
        title VARCHAR(255) not null,
        body VARCHAR(255) not null,
        created_at DATE not null default now(),
        updated_at DATE not null default now()
      );
    `;

    console.log(`Created "notes" table`);

    return {
      createdTable,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedNotes(client);
  await client.end();
}

main().then(function () {
  console.log("done");
});

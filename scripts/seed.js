const { db } = require("@vercel/postgres");

async function dropNotesTable(client) {
  try {
    const result = await client.sql`
      DROP TABLE IF EXISTS notes;
    `;

    console.log(`Dropped "notes" table`);

    return {
      result,
    };
  } catch (error) {
    console.error("Error dropping notes table:", error);
    throw error;
  }
}

async function createNotesTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createdTable = await client.sql`
      CREATE TABLE IF NOT EXISTS notes (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID,
        title VARCHAR(50) not null,
        body VARCHAR(300) not null,
        created_at timestamp not null default now(),
        updated_at timestamp not null default now()
      );
      
      alter table notes
        add constraint check_min_length check (length(body) >= 20);
    `;

    console.log(`Created "notes" table`);

    return {
      createdTable,
    };
  } catch (error) {
    console.error("Error creating notes table:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await dropNotesTable(client);
  await createNotesTable(client);

  await client.end();
}

main().then(function () {
  console.log("done");
});

const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_WbJH9twd3Ezl@ep-bitter-sunset-azeb8i5q-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
});

async function dropAll() {
  await client.connect();
  console.log('Connected to database');
  
  const res = await client.query(`
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public'
  `);
  
  console.log('Tables found:', res.rows.length);
  
  for (const row of res.rows) {
    await client.query(`DROP TABLE IF EXISTS "${row.tablename}" CASCADE`);
    console.log('Dropped:', row.tablename);
  }
  
  const types = await client.query(`
    SELECT typname FROM pg_type 
    WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
    AND typtype = 'e'
  `);
  
  for (const row of types.rows) {
    await client.query(`DROP TYPE IF EXISTS "${row.typname}" CASCADE`);
    console.log('Dropped type:', row.typname);
  }
  
  await client.end();
  console.log('Database reset complete!');
}

dropAll().catch(console.error);

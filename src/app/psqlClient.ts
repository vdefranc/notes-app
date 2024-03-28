import { Pool } from "pg";

console.log("trying to create pool");
const pool =
  process.env.VERCEL_ENV === "production"
    ? new Pool({
        connectionString: process.env.POSTGRES_URL,
      })
    : // by default, pools will use environment variables
      // for connection information
      new Pool();

console.log("finished instantiating pool");

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;

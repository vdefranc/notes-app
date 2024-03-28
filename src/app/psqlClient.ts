import { Pool } from "pg";

// pools will use environment variables
// for connection information
console.log("trying to create pool");
const pool = new Pool();
console.log("finished instantiating pool");

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;

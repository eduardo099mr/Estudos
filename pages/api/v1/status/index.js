import database from "infra/database";
export default async function status(request, response) {
  const updatedAt = new Date().toISOString();
  console.log(updatedAt);

  const serverVersionResult = await database.query("SHOW server_version;");
  const serverVersionValue = serverVersionResult.rows[0].server_version;

  const maxConnResult = await database.query("SHOW max_connections;");
  const maxConnValue = parseInt(maxConnResult.rows[0].max_connections);
  console.log(maxConnValue);

  const databaseName = process.env.POSTGRES_DB;
  const openedConnResult = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openedConnValue = parseInt(openedConnResult.rows[0].count);
  console.log(openedConnValue);
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      version: serverVersionValue,
      max_connections: maxConnValue,
      opened_connections: openedConnValue,
    },
  });
}

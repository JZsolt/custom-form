const path = require("path");

module.exports = ({ env }) => {
  const client = env("DATABASE_CLIENT", "mysql");

  const connections = {
    mysql: {
      connection: {
        host: env("DATABASE_HOST", "127.0.0.1"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "custom-form"),
        user: env("DATABASE_USERNAME", "root"),
        password: env("DATABASE_PASSWORD", "root"),
        ssl: env.bool("DATABASE_SSL", false),
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};

module.exports = ({env}) => ({
  defaultConnection: 'default',
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'blog'),
      user: env('DATABASE_USERNAME', 'root'),
      password: env('DATABASE_PASSWORD', '123456')
    }
  },
  // connection: {
  //   client: 'sqlite',
  //   connection: {
  //     filename: env('DATABASE_FILENAME', '.tmp/data.db'),
  //   },
  //   useNullAsDefault: true,
  //   debug: false,
  // },
});

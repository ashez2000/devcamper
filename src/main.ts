import app from './app';
import config from './config';

async function main() {
  const server = app.listen(config.PORT, () => {
    console.log(`server running on port ${config.PORT}`);
  });

  process.on('SIGTERM', () => server.close());
  process.on('unhandledRejection', (err) =>
    console.log('Rejection Error :', err)
  );
}

main();

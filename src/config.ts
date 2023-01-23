import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT as any as number,
  NODE_ENV: process.env.NODE_ENV as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRE: process.env.JWT_EXPIRE as string,
};

function validate(config: any) {
  for (let k of Object.keys(config)) {
    if (config[k] === undefined) throw new Error(`ENV: ${k}, not found!`);
  }
}

validate(config);

export default config;

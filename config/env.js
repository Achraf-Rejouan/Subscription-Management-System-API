import { config } from 'dotenv';

// Load environment variables from the appropriate .env file
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// Export specific environment variables
export const { PORT, NODE_ENV, DB_URI, JWT_SECRET, JWT_EXPIRES_IN, ARCJET_ENV, ARCJET_KEY} = process.env;
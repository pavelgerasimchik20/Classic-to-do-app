import * as dotenv from 'dotenv';

dotenv.config();

export class StaticEnvironment {
    public static dbConnectionString: string = process.env.DB_CONNECTION_STRING as string;
    public static port: number = parseInt(process.env.SERVER_PORT as string);
    public static host: string = process.env.LOCAL_HOST as string;
}

import { createConnection } from "mysql2/promise";
import { readFileSync } from "fs";

interface ICredentials {
    host: string,
    username: string,
    password: string,
    database: string
}

const fetchCredentials = (): ICredentials => {
    return JSON.parse(readFileSync('./credentails.json', 'utf-8')) as ICredentials;
}

const credentials = fetchCredentials();

export const executeQuery = async (sql: string, params: any[]) => {
    const connection = await createConnection(credentials);
    const [results] = await connection.execute(sql, params);
    return results;
}

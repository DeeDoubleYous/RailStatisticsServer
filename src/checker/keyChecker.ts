import { readFileSync } from 'fs';

interface readKey {
    key: string
}

export const checkKey = (key: string): boolean => {
    console.log(key);

    const file = readFileSync('./key.json', 'utf-8');
    const actualKey = JSON.parse(file) as readKey;
    return key === actualKey.key;
}
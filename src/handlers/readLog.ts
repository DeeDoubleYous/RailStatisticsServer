import { Request, Response } from 'express';
import { checkKey } from '../checker/keyChecker';
import { executeQuery } from '../db/interactor';

export const readLog = async (req: Request, res: Response) => {
    if(!checkKey(req.query.key as string)){
        res.status(403);
        res.end();
        return;
    }
    try{
        const sql = 'CALL Logging_GetTotals()';

        const results = await executeQuery(sql, []);

        if(results){
            res.status(200);
            res.json(results);
        }
    }catch(e){
        console.error(e);
        res.status(500);
        res.end();
    }
};

export const readTotal = async (req: Request, res: Response) => {
    if(!checkKey(req.query.key as string)){
        res.status(403);
        res.end();
        return;
    }
    try{
        const sql = `CALL Logging_GetTotal()`;

        const result = await executeQuery(sql, []);

        if(result){
            res.status(200);
            res.json(result);
        }
    }catch(e){
        console.error(e);
        res.status(500);
        res.end();
    }
}
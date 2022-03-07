import { Request, Response } from 'express';
import { checkKey } from '../checker/keyChecker';
import { executeQuery } from '../db/interactor';

export const readLog = async (req: Request, res: Response) => {
    if(!checkKey(req.query.key as string)){
        res.status(403);
        res.end();
    }else{
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
    }
}
import { executeQuery } from "../db/interactor";
import { Request, Response} from 'express';
import { checkKey } from "../checker/keyChecker";

export const storeToken = async (req: Request, res: Response) => {
    if(!(checkKey(req.body.key as string))){
        res.status(403);
        res.end();
        return;
    }

    try{
        if(req.body.token && req.body.timestamp){
            const sql = 'CALL Tokens_StoreToken(?,?)';

            const token = req.body.token, timestamp = req.body.timestamp;

            const result = await executeQuery(sql, [token, timestamp]);

            if('affectedRows' in result){
                res.status(201);
                res.json(result.insertId);
                return;
            }
        }else{
            res.status(204);
            res.end()
            return;
        }
    }catch(e){
        console.error(e);
        res.status(500);
        res.send(e);
        return;
    }
}
import { executeQuery } from "../db/interactor";
import { Request, Response } from "express";
import { checkKey } from "../checker/keyChecker";

export const readToken = async (req: Request, res: Response) => {
    if(!checkKey(req.query.key as string)){
        res.status(204);
        res.end();
        return;
    }
    try{
        const sql = `CALL Token_GetLatestToken()`;

        const result = await executeQuery(sql);

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
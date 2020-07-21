
import { Router, Request, Response } from "express";
import { resObj } from "../common/resObj";
import { createReadStream } from 'fs'
import {join} from 'path';
export class AuthRouter {
    private router: Router = Router();
    public getRouter(): Router {
        this.router.get("/image", this.getimage);

        return this.router;
    }

    getimage = async function (request: Request, response: Response) {
        try {
            let image = createReadStream( join(__dirname,'../../public/images/test.jpeg'))
            if(image){
                image.pipe(response);
            }else{
                response.status(404).send(resObj(404, 'error while saving', { }))
            }
         
        } catch (error) {
            console.error(error, 'error while saving')
            response.status(200).send(resObj(400, 'error while saving', error))
        }
    }
    
}


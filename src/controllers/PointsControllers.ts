import {Request, Response} from 'express';
import knex from "../database/connection";

class PointsController {
    async show (request: Request, response: Response) {
        const id = request.params.id
        //const { id } = request.parms;
        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({ message: 'Point not found.' })
        }

        return  response.json(point);
    }

    async create (request: Request, response: Response) {
                
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
            /*const name = request.body.name
            const email = request.body.email
            */
        } = request.body;
    
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
            /*name: name não é necessário com short sintax, quando o nome da váriavel é igual ao nome da propriedade do objeto*/
        };

        //const trx = await knex.transaction();
        
        const insertedIds = await knex('points').insert(point);
        
        const  point_id = insertedIds[0] ;

        const pointItems = await items.map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        });
    
        await knex('point_items').insert(pointItems);
    
        return response.json({
            id: point_id,
            ...point
            //success: true
        });
    }
}

export default PointsController;

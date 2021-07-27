import {Request, Response} from 'express';
import knex from "../database/connection";

class PointsController {
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
        } = request.body;
    
        const trx = await knex.transaction();
        /*const name = request.body.name
        const email = request.body.email
        */
        const point = {
            image: 'image-fake',
            name,/*name: name não é necessário com short sintax, quando o nome da váriavel é igual ao nome da propriedade do objeto*/
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        })
    
        await trx('point_items').insert(pointItems);
    
        return response.json({
            id: point_id,
            ...point
        });
    }
}

export default PointsController;

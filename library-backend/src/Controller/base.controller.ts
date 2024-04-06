import { Repository } from "typeorm";
import { Request, Response } from 'express';

export abstract class Controller {
    repository: Repository<any>;

    getAll = async (req:Request, res:Response) => {
        try {
            const entities = await this.repository.find();
            res.json(entities);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getOne = async (req:Request, res:Response) => {
        try {
            const id = req.params.id;
            const entity = await this.repository.findOneBy({ id: id });
            if (!entity) {
                return this.handleError(res, null, 404, 'Not found.');
            }

            res.json(entity);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    create = async (req:Request, res:Response) => {
        try {
            const entity = this.repository.create(req.body as object);
            entity.id = null;

            const result = await this.repository.save(entity);

            res.json(result);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
          const updatedEntity = req.body; 
          const entityId = req.params.id; 
      
          const existingEntity = await this.repository.findOneBy({ id: entityId });
      
          if (!existingEntity) {
            return this.handleError(res, null, 404, 'No entity found with this id.');
          }
      
          Object.assign(existingEntity, updatedEntity);
      
          const result = await this.repository.save(existingEntity);
      
          res.json(result);
        } catch (err) {
          this.handleError(res, err);
        }
    };

    updateStatus = async (req: Request, res: Response) => {
        try {
          const updatedStatus = req.body.status;
          const memberId = req.params.id;
      
          const existingMember = await this.repository.findOneBy({ id: memberId });
      
          if (!existingMember) {
            return this.handleError(res, null, 404, 'No entity found with this id.');
          }
      
          existingMember.status = updatedStatus;
      
          const result = await this.repository.save(existingMember);
      
          res.json(result);
        } catch (err) {
          this.handleError(res, err);
        }
    };
      
    delete = async (req:Request, res:Response) => {
        try {
            const entityToDelete = await this.repository.findOneBy({
                id: req.params.id
            });

            if (!entityToDelete) {
                return this.handleError(res, null, 404, 'Entity not found.');
            }

            await this.repository.remove(entityToDelete);
            res.status(200).send();
        } catch (err) {
            this.handleError(res, err);
        }
    };

    handleError(res:Response, err = null, status = 500, message = 'Unexpected server error') {
        if (err) {
            console.error(err);
        }

        if(err.code && err.code == 'ER_DUP_ENTRY'){
          res.status(422).json({ error: err.code })
        } else {
          res.status(status).json({ error: message });
        }
    }
}
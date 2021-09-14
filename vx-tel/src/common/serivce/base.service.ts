import {Repository} from "typeorm";

export abstract class BaseService {
    protected constructor(private repository: Repository<any>) {
    }

    async findAll() {
        return await this.repository.find();
    }

    async findOne(id: number) {
        return await this.repository.findOne(id);
    }

    async remove(id: number) {
        const plan = await this.repository.findOne(id);
        const deleted = await this.repository.softRemove(plan);
        return !!deleted;
    }
}
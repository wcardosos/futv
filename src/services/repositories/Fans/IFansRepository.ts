import { Fan } from '../../entities/Fan';

export interface IFansRepository {
    findAll(): Promise<Fan[]>,
    save(fan: Fan): Promise<void>,
    delete(email: string): Promise<void>
}
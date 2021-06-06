import { Match } from '../../entities/Match';

export interface IMatchesRepository {
    findAll(): Promise<Match[]>
}
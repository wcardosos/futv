import { Match } from '../../entities/Match';

export interface IMatchesRepository {
    findAll(): Promise<Match[]>,
    save(matches: Match[]): Promise<void>,
    deleteAll(): Promise<void>
}
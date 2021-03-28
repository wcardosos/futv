export interface IBaseDatabase {
    getConnection(): any,
    destroyConnection(): Promise<void>
}
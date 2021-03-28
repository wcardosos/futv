export abstract class BaseRequestError extends Error {
    constructor(message: string, public code: number) {
        super(message);
    }
}
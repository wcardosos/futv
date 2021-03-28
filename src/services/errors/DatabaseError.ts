import { BaseRequestError } from './BaseRequestError';

export class DatabaseError extends BaseRequestError {
    constructor(message: string) {
        super(message, 500);
    }
}
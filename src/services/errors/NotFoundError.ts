import { BaseRequestError } from './BaseRequestError';

export class NotFoundError extends BaseRequestError {
    constructor(message: string) {
        super(message, 404);
    }
}
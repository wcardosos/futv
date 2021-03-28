
import { BaseRequestError } from './BaseRequestError';

export class GenericError extends BaseRequestError {
    constructor(message: string) {
        super(message, 400);
    }
}
import { BaseRequestError } from './BaseRequestError';

export class InvalidParameterError extends BaseRequestError {
    constructor(message: string) {
        super(message, 422);
    }
}
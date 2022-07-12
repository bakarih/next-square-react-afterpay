import { ApplicationError, SqError } from './types';
declare class TokenizationError extends SqError {
    readonly errors: ApplicationError[];
    constructor(errors?: ApplicationError[]);
}
export { TokenizationError };

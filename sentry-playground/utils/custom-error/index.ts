interface CustomErrorOptions<T> {
    details?: T;
}

export default class CustomError<T> extends Error {
    details?: T;

    constructor(message: string, options?: CustomErrorOptions<T>) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);

        if (options && options.details) {
            this.details = options.details as T;
        }
    }
}

import type { IDataValue } from "./value";
export type ISchemaValidator = {
    value: IDataValue;
    expert: IDataValue;
    valid: boolean;
};
export type ISchemaValidators = {
    score: number;
    hit: number;
    total: number;
    responses: ISchemaValidator[];
};

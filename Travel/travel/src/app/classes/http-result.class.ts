export class BaseResult {
    
    status: string;    
    statuscode: string;
    
    apistatusmessage: string;
    message: string;

    errors: ResultError[];
}

export class ResultError {
    errorcode: string;
    errordescription: string;
}

export class HttpQueryResult<T> extends BaseResult {
    totalCount: number;
    result: T[];
}

 export class HttpOperationResult<T> extends BaseResult {

    result: T;
}
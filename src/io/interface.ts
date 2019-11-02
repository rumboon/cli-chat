import AWS from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

// Database
interface Data {
    [key: string]: string;
}

export interface Put {
    (tableName: string, data: Data): Promise<
        PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>
    >;
}

export interface Get {
    (tableName: string, keys: Data): Promise<
        AWS.DynamoDB.DocumentClient.AttributeMap | undefined
    >;
}

export interface Upsert {
    (tableName: string, PK: string, data: Data): Promise<
        PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>
    >;
}

// Websockets
export interface MessageClient {
    (url: string, id: string, payload: string): Promise<{
        $response: AWS.Response<{}, AWS.AWSError>;
    }>;
}

export default interface IO {
    db: {
        put: Put;
        get: Get;
        upsert: Upsert;
    };
    ws: {
        messageClient: MessageClient;
    };
}

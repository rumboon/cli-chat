import AWS from "aws-sdk";
import { Put, Get, Upsert } from "./interface";

const db = new AWS.DynamoDB.DocumentClient({
    region: AWS.config.region,
});

export const put: Put = async (tableName, data) => {
    const params = {
        TableName: tableName,
        Item: data,
    };
    const res = await db.put(params).promise();
    return res;
};

export const get: Get = async (tableName, keys) => {
    const params = {
        TableName: tableName,
        Key: keys,
    };

    const res = await db.get(params).promise();
    return res.Item;
};

export const upsert: Upsert = async (tableName, PK, data) => {
    const entries = Object.entries(data);
    let updateExpression = "set";
    let expressionAttributeValues: { [key: string]: string } = {};
    let index = 0;

    // Convert the data object the attributes and values used
    // to update the entry with the provided PK
    for (const [key, value] of entries) {
        const id = `:v${index}`;
        const close = index < entries.length - 1 ? "," : "";
        updateExpression = `${updateExpression} ${key} = ${id}${close}`;
        expressionAttributeValues[id] = value;
        index++;
    }

    const params = {
        TableName: tableName,
        Key: { PK },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
    };

    const res = await db.update(params).promise();
    return res;
};

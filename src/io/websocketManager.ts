import AWS from "aws-sdk";
import { MessageClient } from "./interface";

export const messageClient: MessageClient = async (url, id, payload) => {
    const api = new AWS.ApiGatewayManagementApi({
        apiVersion: "2019-11-02",
        endpoint: url,
    });

    const res = await api
        .postToConnection({
            ConnectionId: id,
            Data: JSON.stringify(payload),
        })
        .promise();

    return res;
};

// TODO broadcast messages to room

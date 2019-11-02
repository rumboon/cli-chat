import { APIGatewayProxyEvent } from "aws-lambda";

export const clientProps = (event: APIGatewayProxyEvent) => ({
    userId: event.headers.Authorization,
    connectiondId: event.requestContext.connectionId || "",
});

export const wsProps = (event: APIGatewayProxyEvent) => {
    const { domainName, stage, connectionId } = event.requestContext;
    const url = `https://${domainName}/${stage}`;
    const payload = event.body || "";

    return {
        id: connectionId || "",
        url,
        payload,
    };
};

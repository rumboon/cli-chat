import { APIGatewayProxyHandler } from "aws-lambda";
import service from "./service";
import io from "./io";

export const connectHandler: APIGatewayProxyHandler = async event => {
    // TODO UserId only used for dev purpose to have a client identifier
    const { userId, connectiondId } = io.handle.clientProps(event);

    try {
        const result = await service(io).connectUser(userId, connectiondId);
        return io.respond.success(result);
    } catch (err) {
        return io.respond.failed(err);
    }
};

export const defaultHandler: APIGatewayProxyHandler = async event => {
    const { id, url, payload } = io.handle.wsProps(event);

    try {
        const result = await service(io).messageClient(url, id, payload);
        return io.respond.success(result);
    } catch (err) {
        return io.respond.failed(err);
    }
};

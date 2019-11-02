import IO from "./io/interface";

export default (io: IO) => ({
    connectUser: async (userId: string, connectionId: string) => {
        const tableName = process.env.DYNAMODB_TABLE_USERS || "";

        await io.db.upsert(tableName, userId, {
            connectionId,
        });

        return `Successfully connection user ${userId} with connectionId ${connectionId}`;
    },

    messageClient: async (url: string, id: string, payload: string) => {
        await io.ws.messageClient(url, id, payload);

        return `Send ${JSON.stringify(payload)} to client ${id}`;
    },
});

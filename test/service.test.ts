import service from "../src/service";

describe("ConnectUser", () => {
    const io = {
        db: {
            upsert: jest.fn(),
        },
    };

    it("should succeed: connectUser", async () => {
        const userId = "123x=userid=123as";
        const connectionId = "1xxconnectionidxx1";
        const res = await service(io as any).connectUser(userId, connectionId);

        expect(io.db.upsert).toBeCalled();
        expect(res).toEqual(
            `Successfully connection user ${userId} with connectionId ${connectionId}`,
        );
    });

    it("should succeed: messageClient", async () => {
        const io = {
            ws: {
                messageClient: jest.fn(),
            },
        };

        const url = "https://domain/stage";
        const id = "123xidx321";
        const payload = "My message";
        const res = await service(io as any).messageClient(url, id, payload);

        expect(io.ws.messageClient).toBeCalled();
        expect(res).toEqual(`Send ${JSON.stringify(payload)} to client ${id}`);
    });
});

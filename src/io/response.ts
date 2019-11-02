export const success = (message: string) => ({
    statusCode: 200,
    body: JSON.stringify(message),
});

export const failed = (err: AWS.AWSError) => ({
    statusCode: err.statusCode || 501,
    body: JSON.stringify(err),
});

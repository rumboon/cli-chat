# CLI Chat

## Description
Connect to the server to start a session. Choose a room where you want to send the messages to and read messages from.

The current version stores the client identity with the active connection. Messages as of now are being ping ponged.

## Deployment
Use [serverless](https://github.com/serverless/serverless) to deploy the service.

## Prerequirement
The following configuration file is required to get connect to your instance in AWS. It can be configured for individual states.

Add the following file to the project root:

`config.<stage>.json`

The configuration file should hold the following values:

```json
{
    "USERS_TABLE_ID": <id>,
    "MESSAGES_TABLE_ID": <id>,
    "REGION": <region>
} 
```
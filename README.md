# POST Broadcast

Allows multiple clients to propagate the POST requests that are received on a server. It uses socket.io to link server and clients.

Principle:

- Start the server and assumes it has address http://my.server.com
- Start a client which will post to http://other.server.com
- Send a POST request to http://my.server.com/my/path/
- The client will automatically send the same POST request to http://other.server.com/my/path/

You can connect as many clients as you want and therefore propagate a POST request to as many places as you want.

**Note** The current implementation assumes the POST body is in JSON format.

## Server

Start the boradcast server using

```
npm start
```

You can define the port the server is listening to using the `PORT` environment variable.

You can define the answer sent by default for any incoming GET request using the `GETTEXT` environment variable.

## Client

Configure the client using the environment variables:

- `SERVER` the address of the broadcast server
- `POSTTO` the address where to propagate the POST request

Start the client using

```
npm run start-client
```

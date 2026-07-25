# [Hono] Simple Messaging App Using Bun and WebSocket

https://dev.to/yutakusuno/hono-simple-messaging-app-using-bun-and-websocket-mnk by Yuta Kusuno

## How to run the demonstration

```
$ pwd
/Users/kazuakiurayama/github/hono-simple-messaging-app-using-on-bun-and-websocket
$ ROOT=`pwd`
$ echo $ROOT
/Users/kazuakiurayama/github/hono-simple-messaging-app-using-on-bun-and-websocket
```

### start the server at 'localhost:3000'

```
$ cd $ROOT
$ bun run dev
$ bun run --hot server/index.ts
Started development server: http://localhost:3000
```

### start the frontend at 'localhost:5172'

```
$ cd $ROOT
$ cd frontend
$ pwd
/Users/kazuakiurayama/github/hono-simple-messaging-app-using-on-bun-and-websocket/frontend
$ bun run dev
$ bun run dev
$ bunx --bun vite

  VITE v8.1.5  ready in 246 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

### play on chat

Open a browser, navigate to `http://locahost:5173`.

Open another browser, navigte to `http://localhost:5173` as well.

![frontends_chatting](https://kazurayam.github.io/hono-simple-messaging-app-using-bun-and-websocket/images/001_frontends_chatting.png)

### you can see the messages recorded on the server

Open a browser, navigate to `http://locahost:3000/messages`. Then you will see the list of messages exchanged by the frontends.

![frontends_chatting](https://kazurayam.github.io/hono-simple-messaging-app-using-bun-and-websocket/images/002_messages_retrieved.png)


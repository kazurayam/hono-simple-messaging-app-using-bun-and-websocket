# [Hono] Simple Messaging App Using Bun and WebSocket

[[Hono] Simple Messaging App Using Bun and WebSocket](https://dev.to/yutakusuno/hono-simple-messaging-app-using-bun-and-websocket-mnk) by Yuta Kusuno を写経する。

>We often see implementations of WebSocket using the Express framework and Socket.io. However, there seem to be fewer examples of WebSocket implementations using Hono, a framework that is similar to Express but faster and lighter. In this article, I will introduce the implementation of a simple messaging app using Hono and Bun, a JavaScript runtime.
> ExpressとSocket.ioを使ったWebSocketの実装ならよく見かける。しかしHonoを使ったWebSocketの実装例は少ない。この記事ではHonoとBunを使ってシンプルなメッセージングAppを作ったのを紹介したい。

特にこの記事のサーバー・サイドの実装を参考にしようと思う。この記事はクライアントをReactで実装しているが、わたしは同じ箇所をhtmxのWebSocket拡張で置換できるだろうと考えている。その企みは後日別のプロジェクトでやるつもり。

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



## 構成要素

- テスターX
- Chromeブラウザ
- React App: テスターXがChromeブラウザでfrontendサーバ(http://localhost:5173)にアクセスしてロードされたWebページがReactアプリを実行する。このReactアプリがクライアントとなってserver(http://localhost:3000)とWebSocketで常時接続する。
- テスターY
- Firefoxブラウザ
- React App: テスターXがChromeブラウザで起動したReact Appと全く同一。
- 管理者: テスターXがfrontment(http://localhost:5173)にアクセスする前にあらかじめ誰かがfrontendを起動しておく。server(http://localhost:3000)も。コマンドラインで適切なディレクトリにcdした上で `bun run dev` コマンドを投入する。
- server: メッセージング・サーバー
- WebSocket Handler: serverを構成する部品。Bunが提供するものを利用。
- frontend: Chat画面を提供するWebサーバ

## Sequence diagram

![sequence](https://kazurayam.github.io/hono-simple-messaging-app-using-bun-and-websocket/diagrams/out/sequence/sequence.png)

### 1 サーバーを起動する

#### 1.1 start frontend

```
$ cd $ROOT/frontend
$ bun run dev
```

See the code:

- [frontend/package.json](https://github.com/kazurayam/hono-simple-messaging-app-using-bun-and-websocket/blob/master/frontend/package.json)

#### 1.2 start server

```
$ cd $ROOT
$ bun run dev
```

See the code
- [$ROOT/package.json](https://github.com/kazurayam/hono-simple-messaging-app-using-bun-and-websocket/blob/master/package.json)

#### 1.3 the server starts the WebSocket Handler

serverは起動時に一度だけ `const server = Bun.serve(fetch:app.fetch,port:3000,websocket)` を実行する。これによってHTTPサーバが立ち上がる。このサーバはWebSocketsもサポートする。[ドキュメント](https://bun.com/docs/runtime/http/websockets)を参照。

See the code

- [server/index.ts line#23](https://github.com/kazurayam/hono-simple-messaging-app-using-bun-and-websocket/blob/master/server/index.ts)

#### 1.4 subscribe to the topic

`Bun.serve(fetch:app.fetch,3000,websocket)`起動されたサーバはpublish-subscribe APIもサポートしている。Publish-Subscribeパターンについての解説として[](https://ja.wikipedia.org/wiki/%E5%87%BA%E7%89%88-%E8%B3%BC%E8%AA%AD%E5%9E%8B%E3%83%A2%E3%83%87%E3%83%AB)を参照。

クライアント(ブラウザ上のForm画面)が `http://localhost:3000/ws` にHTTP GET要求を投げると、serverはそのHTTP要求を捉えてWebSocketにupgradeし、クライアントとサーバの間に永続的なコネクションを確立する。同時にseverはトピック（名前付きの論理的なチャネル）にたいし `server.subscribe(トピック)` する。この例でトピックは "anonyous-chat-room" という名前を持つ。トピックにsubscribeする


## Conclusion

オリジナルの記事を写して手元で動作させることはできた。しかしWebSocketクライアントとPub/Subサーバがどのように連携動作するのか基本的なことが見えてこなかった。このサンプルコードでは基本を学ぶことができない。

別の記事を見つけた。

- https://oneuptime.com/blog/post/2026-01-31-bun-websocket-servers/view

Honoを抜きにしてBun.serve()のWebSocket APIを直に使ってサーバを構築する基本を学ぶことができそう。これに目を移そう。

import { configure, getConsoleSink, getLogger } from '@logtape/logtape';
import { getFileSink } from '@logtape/file';
await configure({
    sinks: {
        console: getConsoleSink(),
        file: getFileSink("./out/chat-app.log", {
            flushInterval: 1000,
            nonBlocking: true,
        })
    },
    loggers: [
        { category: ["messaging-app"], lowestLevel: "debug", sinks: ["file"] },
        { category: ["logtape", "meta"], lowestLevel: "warning", sinks: ["console"] }
    ]
});

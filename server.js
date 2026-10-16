const { createServer } = require("https");

// const express = require("express");
// const cors = require("cors");
// const server = express();
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("cert/ssl_25.key"),
  cert: fs.readFileSync("cert/ssl_25.cert"),
  ca: fs.readFileSync("cert/ca_25.cert"),
  // Increase max header size to 32KB (32 * 1024)
  maxHeaderSize: 32 * 1024
};

app.prepare().then(() => {
  const server = createServer(httpsOptions, (req, res) => {
    // Increase header size limits
    if (!req.maxHeadersCount) {
      req.maxHeadersCount = 100;
    }

    // server.use(cors());

    // server.options("*", cors());
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true);
    //const { pathname, query } = parsedUrl;

    // if (pathname === '/sw.js' || pathname.startsWith('/workbox-')) {
    //   const filePath = join(__dirname, '.next', pathname)
    //   app.serveStatic(req, res, filePath)
    // } else {
    //   handle(req, res, parsedUrl)
    // }
    handle(req, res, parsedUrl);
  });

  // Set server timeout to 5 minutes
  server.timeout = 300000;
  server.keepAliveTimeout = 60000;
  server.headersTimeout = 65000;

  server.listen("3000", "0.0.0.0", err => {
    if (err) throw err;
    // console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    // console.log(
    //   `> Ready on https://${process.env.NEXT_PUBLIC_ENV_HOST}:${process.env.NEXT_PUBLIC_ENV_PORT}`
    // );
  });
});

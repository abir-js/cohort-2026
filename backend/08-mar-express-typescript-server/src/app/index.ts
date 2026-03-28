import express from "express";
import type { Application } from "express";

export function createServerApplication(): Application {
  const app = express();

  app.get("/", function (req, res) {
    return res.json({
      message: "Hello World!",
    });
  });

  app.get("/hello", function (req, res) {
    return res.json({
      message: "Hello from /hello endpoint!",
    });
  });

  return app;
}

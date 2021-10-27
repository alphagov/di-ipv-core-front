import express, { Request, Response } from "express";

const createApp = () => {
  const app = express();

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  return app;
};

export { createApp };

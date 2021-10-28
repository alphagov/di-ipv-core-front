import express, { Request, Response } from "express";

const createApp = () => {
  const app = express();

  app.get("/", (req: Request, res: Response) => {
    // res.render("index");
  });

  return app;
};

export { createApp };

import { setup } from "hmpo-app";
import { Request, Response } from "express";

import passport from "./app/passport";

const { router } = setup({
  config: { APP_ROOT: __dirname },
  urls: {
    public: "/public",
  },
});

router.use("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.use("/passport", passport);

// name
// address
// kbv

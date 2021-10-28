import * as express from "express";

import HmpoFormWizard from "hmpo-form-wizard";

import { Steps } from "hmpo-form-wizard";
import { Application } from "express-serve-static-core";
import { IRouter } from "express";

const router = express.Router();

const steps: Steps = {
  "/": {
    entryPoint: true,
    fields: ["fieldName"],
    next: "done",
  },
  "/done": {},
};

const fields = {
  fieldName: {
    type: "text",
    validate: ["required"],
  },
};

const wizard: any = new HmpoFormWizard(steps, fields, {
  name: "example-form-name",
});

router.use("/", wizard);

export default router;

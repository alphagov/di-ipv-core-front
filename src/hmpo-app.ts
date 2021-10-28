import HmpoFormWizard from "hmpo-form-wizard";
import { setup } from "hmpo-app";
import { Steps } from "hmpo-form-wizard";
const { router } = setup({
  config: { APP_ROOT: __dirname },
  urls: {
    public: "/public",
  },
});

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

const wizard = new HmpoFormWizard(steps, fields, {
  name: "example-form-name",
});

router.use("/", wizard);

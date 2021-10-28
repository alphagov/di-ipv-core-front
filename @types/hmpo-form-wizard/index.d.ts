declare module "hmpo-form-wizard";

// export HmpoFormWizard as namespace "hmpo-form-wizard"
// export = HmpoFormWizard;
//
//
// declare class HmpoFormWizard {
//   constructor(steps: HmpoFormWizard.Steps, field: any, config: any);
// }

declare namespace HmpoFormWizard {
  type Steps = {
    [key: string]: Step;
  };

  type Step = {
    entryPoint?: Boolean;
    fields?: [string];
    next?: Array | Function | String | Object;
  };
}

export default { HmpoFormWizard };

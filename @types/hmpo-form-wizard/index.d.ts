declare module "hmpo-form-wizard" {
  declare class HmpoFormWizard {
    constructor(steps: HmpoFormWizard.Steps, field: any, config: any);
  }

  export type Steps = {
    [key: string]: Step;
  };

  export type Step = {
    entryPoint?: Boolean;
    fields?: [string];
    next?: Array | Function | String | Object;
  };

  export default HmpoFormWizard;
}

require("dotenv").config();

const cfenv = require("cfenv");
const appEnv = cfenv.getAppEnv();
const serviceConfig = {};

if (!appEnv.isLocal) {
  serviceConfig.coreBackAPIUrl = appEnv.getServiceURL("core-back-api");
}

module.exports = {
  API_BASE_URL: serviceConfig.coreBackAPIUrl || process.env.API_BASE_URL,
  API_ISSUED_CREDENTIALS_PATH: "/issued-credentials",
  API_REQUEST_CONFIG_PATH: "/request-config",
  API_CRI_RETURN_PATH: "/journey/cri/return",
  EXTERNAL_WEBSITE_HOST: process.env.EXTERNAL_WEBSITE_HOST,
  PORT: process.env.PORT || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  GTM_ID: process.env.GTM_ID,
  GTM_ANALYTICS_COOKIE_DOMAIN: process.env.ANALYTICS_DOMAIN,
};

const express = require("express");

const router = express.Router();

const {
  addCallbackParamsToRequest,
  sendParamsToAPI,
  tryHandleRedirectError,
  validateVerifiableCredentialReceived
} = require("./middleware");

const { buildCredentialIssuerRedirectURL, redirectToAuthorize } = require('../shared/criHelper');

router.get("/authorize", buildCredentialIssuerRedirectURL, redirectToAuthorize);

router.get(
  "/callback",
  tryHandleRedirectError,
  addCallbackParamsToRequest,
  sendParamsToAPI,
  validateVerifiableCredentialReceived
);

module.exports = router;

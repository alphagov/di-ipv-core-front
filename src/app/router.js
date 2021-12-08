const { API_BASE_URL, AUTH_PATH } = require("../lib/config");
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", (req, res) => {
  const authParams = {
    response_type: req.query.response_type,
    client_id: req.query.client_id,
    state: req.query.state,
    redirect_uri: req.query.redirect_uri,
  };

  req.session.authParams = authParams;

  res.redirect("/render/");
});

router.get("/authorize", async (req, res) => {
  try {
    const apiResponse = await axios.get(`${API_BASE_URL}${AUTH_PATH}`, {
      params: {
        redirect_uri: req.session.authParams.redirect_uri,
        client_id: req.session.authParams.client_id,
        response_type: req.session.authParams.response_type,
        scope: "openid",
      },
      headers: { "ipv-session-id": req.session.ipvSessionId },
    });

    const code = apiResponse.data.code.value;
    const state = apiResponse.data.state.value || "";
    const redirectURL = `${req.session.authParams.redirect_uri}?state=${state}&code=${code}`;
    res.redirect(redirectURL);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    res.status(500).send(e.message);
  }
});
module.exports = router;

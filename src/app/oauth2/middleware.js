const axios = require("axios");
const { API_BASE_URL } = require("../../lib/config");

module.exports = {
  renderOauthPage: async (req, res) => {
    res.render("index-hmpo");
  },

  redirectToDebugPage: async (req, res) => {
    res.redirect("/debug");
  },

  redirectToJourney: async (req, res) => {
    res.redirect("/ipv/journey/next");
  },

  setDebugJourneyType: (req, res, next) => {
    req.session.isDebugJourney = true;
    next();
  },

  setRealJourneyType: (req, res, next) => {
    req.session.isDebugJourney = false;
    next();
  },

  setIpvSessionId: async (req, res, next) => {
    try {
      const authParams = {
        responseType: req.query.response_type,
        clientId: req.query.client_id,
        redirectUri: req.query.redirect_uri,
        state: req.query.state,
        scope: req.query.scope,
        isDebugJourney: req.session.isDebugJourney,
        request: req.query.request
      };
      
      if(!authParams.request){ return next(new Error('Request JWT Missing'));}
      if(!authParams.clientId){ return next(new Error('Client ID Missing'));}

      const response = await axios.post(`${API_BASE_URL}/session/start`, authParams);
      req.session.ipvSessionId = response?.data?.ipvSessionId;
    } catch (error) {
      res.error = error.name;
      return next(error);
    }

    next();
  },
};

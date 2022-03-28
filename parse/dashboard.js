const ParseDashboard = require('parse-dashboard');

const dashboard = new ParseDashboard({
    "apps": [{
        "serverURL": process.env.SERVER_URL,
        "appId": process.env.APP_ID,
        "masterKey": process.env.MASTER_KEY,
        "appName": process.env.NAME
    }],
    "users": [{
        "user": "meeplab",
        "pass": "meeplab5all!"
    }]
}, { allowInsecureHTTP: true })

module.exports = {
  dashboard: dashboard,
  url: '/dashboard'
};

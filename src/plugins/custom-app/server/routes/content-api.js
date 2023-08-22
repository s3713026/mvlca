"use strict";

const config = require("@strapi/strapi/lib/core/registries/config");

module.exports = {
    type: 'content-api',
    routes: [
        {
            method: "GET",
            path:"/custom-api",
            handler:"custom-app.customAPI",
            config:{
                policies:[]
            }
        }
    ]
}

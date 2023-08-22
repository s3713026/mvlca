"use strict";

const config = require("@strapi/strapi/lib/core/registries/config");

module.exports = {
    type: 'content-api',
    routes: [
        {
            method: "GET",
            path:"/customApi",
            handler:"custom-app.customAPI",
            config:{
                policies:[]
            }
        }
    ]
}

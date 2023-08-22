"use strict";

const config = require("@strapi/strapi/lib/core/registries/config");

module.exports = {
    type: 'content-api',
    routes: [
        {
            method: "GET",
            path:"/customapi",
            handler:"netcore.customAPI",
            config:{
                policies:[]
            }
        }
    ]
}
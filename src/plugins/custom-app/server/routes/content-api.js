"use strict";

const config = require("@strapi/strapi/lib/core/registries/config");

module.exports = {
    type: 'content-api',
    routes: [
        // {
        //     method: "GET",
        //     path:"/customapi",
        //     handler:"Netcore.customapi",
        //     config:{
        //         policies:[]
        //     }
        // },
        {
            method: "POST",
            path:"/webhook/send",
            handler:"Netcore.send",
            config:{
                policies:[]
            }
        },
        {
            method:"GET",
            path:"/getcustomer",
            handler: "Netcore.get_cus_for_agent",
            config:{
                policies:[]
            }
        }
    ]
}

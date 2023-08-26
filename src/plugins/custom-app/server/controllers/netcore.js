const bcrypt = require("bcryptjs");
const pluginName = 'netcore';

var Queue = require('bull');

let port = strapi.config.get('server.redis.port', '6379');
let host = strapi.config.get('server.redis.host', '127.0.0.1');
let password = strapi.config.get('server.redis.password', '');

var netcoreQueue = Queue('netcore_queue', { redis: { port: port, host: host, password: password } });

module.exports ={
    async customapi(ctx) {
        ctx.body = "AKADIGITAL";
        let loggin = await strapi.db.query('plugin::custom-app.netcorelead').create({
          data:{
            status: "- POST SUCCESS",
            method: "OK",
            url: "google.com.vn"

          }
        })
        loggin();
      }   
}
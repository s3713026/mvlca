const bcrypt = require("bcryptjs");
const pluginName = 'netcore';

var Queue = require('bull');

let port = strapi.config.get('server.redis.port', '6379');
let host = strapi.config.get('server.redis.host', '127.0.0.1');
let password = strapi.config.get('server.redis.password', '');

var netcoreQueue = Queue('netcore_queue', { redis: { port: port, host: host, password: password } });

module.exports ={
    async customapi(ctx) {
        console.log(ctx.request.body);
        console.log(ctx.request.header);
        ctx.body = "AKADIGITAL";
      
    
        //Logging
        let request_urls = "Truong phu cuong";
        let request_method = "0349305195";
        let request_record = "phucuong200297@gmail.com";
        console.log("URL", request_urls);
        console.log("METHOD", request_method);
        console.log("Header", ctx.request.header);
    
    
        ctx.body = ctx.request.header;
    
    
        try {
          if (request_record != "" && ctx.response.status == 200) {
            let logging = await strapi.db.query('plugin::custom-app.netcorelead').create({
              data: {
                email: request_record,
                mobile: request_method,
                full_name: request_urls
              }
            });
          } else {
            let logging = await strapi.db.query('plugin::custom-app.netcorelead').create({
              data: {
                email: request_record,
                mobile: request_method,
                full_name: request_urls
              }
            });
          }
        } catch (error) {
          let logging = await strapi.db.query('plugin::custom-app.netcorelead').create({
            data: {
              status: ctx.response.status + " - POST FAIL",
              method: request_method,
              url: request_urls
            }
          });
        }
    
    
        let statusCode = ctx.response.status;
        console.log(statusCode);
        console.log("typeof statusCode:", typeof statusCode);
        
      }
    
          
}
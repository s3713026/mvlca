const bcrypt = require("bcryptjs");
const pluginName = 'netcore';

var Queue = require('bull');

let port = strapi.config.get('server.redis.port', '6379');
let host = strapi.config.get('server.redis.host', '127.0.0.1');
let password = strapi.config.get('server.redis.password', '');

var netcoreQueue = Queue('netcore_queue', { redis: { port: port, host: host, password: password } });

module.exports ={
    async customApi(ctx) {
        // ctx.body = strapi
        //   .plugin('netcore')
        //   .service('NetcoreServices')
        //   .getResultLogging();
        ctx.body = "AKADIGITAL";
        //Logging
        let request_urls = ctx.request.url;
        let request_method = ctx.request.method;
        let request_record = "Lmaoez@gmail.com";
        console.log("URL", request_urls);
        console.log("METHOD", request_method);
        console.log("Header", ctx.request.header)
    
        ctx.body = ctx.request.header;
    
        try {
          if (request_record != "") {
            console.log("RECORD", request_record)
            //Đẩy dât lên strapi
            let logging = await strapi.db.query('plugin::netcore.netcorelead').create({
              data: {
                record: request_record,
                method: request_method,
                url: request_urls
              }
            });
    
            console.log("DATA:", logging)
          } else {
            console.log("METHOD does not execute")
          }
        } catch (error) {
          console.error(error);
        }
    
        let statusCode = ctx.response.status;
        console.log(statusCode);
        console.log("typeof statusCode:", typeof statusCode);
      }    
}
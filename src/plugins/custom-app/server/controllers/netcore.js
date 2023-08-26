const bcrypt = require("bcryptjs");
const pluginName = 'netcore';

var Queue = require('bull');

let port = strapi.config.get('server.redis.port', '6379');
let host = strapi.config.get('server.redis.host', '127.0.0.1');
let password = strapi.config.get('server.redis.password', '');

var netcoreQueue = Queue('netcore_queue', { redis: { port: port, host: host, password: password } });

module.exports ={
    // async customapi(ctx) {
    //     console.log(ctx.request.body);
    //     console.log(ctx.request.header);
    //     ctx.body = "AKADIGITAL";
      
    
    //     //Logging
    //     let request_urls = "Truong phu cuong";
    //     let request_method = "0349305195";
    //     let request_record = "phucuong200297@gmail.com";
    //     console.log("URL", request_urls);
    //     console.log("METHOD", request_method);
    //     console.log("Header", ctx.request.header);
    
    
    //     ctx.body = ctx.request.header;
    
    
    //     try {
    //       if (request_record != "" && ctx.response.status == 200) {
    //         let logging = await strapi.db.query('plugin::custom-app.netcorelead').create({
    //           data: {
    //             Email: request_record,
    //             Mobile: request_method,
    //             Full_Name: request_urls
    //           }
    //         });
    //       } else {
    //         let logging = await strapi.db.query('plugin::custom-app.netcorelead').create({
    //           data: {
    //             Email: request_record,
    //             Mobile: request_method,
    //             Full_Name: request_urls
    //           }
    //         });
    //       }
    //     } catch (error) {
    //       let logging = await strapi.db.query('plugin::custom-app.netcorelead').create({
    //         data: {
    //           Email: request_record,
    //           Mobile: request_method,
    //           Full_Name: request_urls
    //         }
    //       });
    //     }
    
    
    //     let statusCode = ctx.response.status;
    //     console.log(statusCode);
    //     console.log("typeof statusCode:", typeof statusCode);
        
    //   }

    async send(ctx){
      ctx.body = "AKADIGITAL"
      var basic_auth_panel = Buffer.from(ctx.request.header.authorization.split(" ")[1],'base64').toString();
      var arr = basic_auth_panel.split(":");
      const basic_auth = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: {
          username: 'akadigital'
        }
      });
  
  
      var check = await bcrypt.compare(arr[1], basic_auth.password)
      if (check == true){
        ctx.body = "Welcome webhook"

        let request_urls = ctx.request.url;
        let request_method = ctx.request.method;
        let request_record = ctx.request["x-forwarded-for"];

        let data_body = ctx.request.body.data;
        console.log(data_body)
      }
    }
    
          
}
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

        let data = ctx.request.body.data;
        let data_body = JSON.parse(data);
        console.log(data_body);
        let Email ='';
        let Mobile ='';
        let Agent_Email='';
        let Full_Name ='';

        Email = data_body.voolatechsmt[0].att_params.EMAIL;
        Mobile = data_body.voolatechsmt[0].att_params.MOBILE;
        Agent_Email = data_body.voolatechsmt[0].att_params.FIRST_NAME;
        
        let data_list =[];

        data_list.push({
          'customer': Email,
          'customer_mobile':Mobile,
          'agent': Agent_Email
        })
        console.log(data_list);
        let entry = await strapi.db.query('plugin::custom-app.netcorelead').create({
          data: {
            'Email': Email,
            'Mobile':Mobile,
            'Agent_Mail': Agent_Email,
            'agent': Agent_Email
          }
        });    
      }
    },

    async get_cus_for_agent(ctx){
      console.log(ctx.request.body);
      console.log(ctx.request.header);

      const getcustomer = await strapi.db.query('plugin::custom-app.netcorelead').findMany({
        select: ['email', 'mobile','agent_mail','agent'],
      })
      console.log(getcustomer)
      ctx.body = getcustomer;
    },
    
    async send_cus(ctx){
    
      const customer= await strapi.db.query('plugin::custom-app.netcorelead').findMany({
        select: ['email','mobile','agent_mail'],
      });
      let i =0;
      let j = i +1;
      let count = 0;
      for(i =0; i < customer.length;i++){
        for(j = i+1;j<customer.length;j++){
          if(customer[i].Agent_Mail ==customer[j].Agent_Mail){
            if (count >= 2){
              console.log(customer[i])
            }else{
              count = count +1;  
            }
          }
        }
      }

      // console.log(count);
      // ctx.body = count;
    }
          
}
// smartech('identify','');
// smartech('contact', 'LIST IDENTIFIER', {
//   'pk^email': '',
//   'mobile': '0123456789',
//   'FIRST_NAME': 'mucoki@gmail.com'
// });
// smartech('dispatch','home screen',{});
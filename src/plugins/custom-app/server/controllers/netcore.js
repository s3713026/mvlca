const bcrypt = require("bcryptjs");
const pluginName = 'netcore';

var Queue = require('bull');
const { netcorelead } = require("../content-types");
const { Email } = require("@strapi/icons");

let port = strapi.config.get('server.redis.port', '6379');
let host = strapi.config.get('server.redis.host', '127.0.0.1');
let password = strapi.config.get('server.redis.password', '');

var netcoreQueue = Queue('netcore_queue', { redis: { port: port, host: host, password: password } });
function check_num_customer(){
  const getcustomer = strapi.db.query('plugin::custom-app.agent').findMany({
    select: ['email'],
    populate: { netcorelead: true }
  })
};
module.exports = {
  check_num_customer
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

  async send(ctx) {
    ctx.body = "AKADIGITAL"
    var basic_auth_panel = Buffer.from(ctx.request.header.authorization.split(" ")[1], 'base64').toString();
    var arr = basic_auth_panel.split(":");
    const basic_auth = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: {
        username: 'akadigital'
      }
    });


    var check = await bcrypt.compare(arr[1], basic_auth.password)
    if (check == true) {
      ctx.body = "Welcome webhook"

      let request_urls = ctx.request.url;
      let request_method = ctx.request.method;
      let request_record = ctx.request["x-forwarded-for"];

      let data = ctx.request.body.data;
      console.log('Raw data here', data)
      let data_body = JSON.parse(data);
      console.log("Data in here:", data_body);
      let Email = '';
      let Mobile = '';
      let Agent_Email = '';
      let Agent_Id = '';

      Email = data_body.voolatechsmt[0].att_params.EMAIL;
      Mobile = data_body.voolatechsmt[0].att_params.MOBILE;
      Agent_Email = data_body.voolatechsmt[0].att_params.AGENT_MAIL;
      Agent_Id = data_body.voolatechsmt[0].att_params.AGENT_ID;

      const getAgent = await strapi.db.query('plugin::custom-app.agent').findMany({
        select: ['email', 'id'],
      })

      // Create user data 
      let entry = await strapi.db.query('plugin::custom-app.netcorelead').create({
        data: {
          'Email': Email,
          'Mobile': Mobile,
        }
      });
      let listEmail =[]
      // Create + update agent
      // async function checkEmailInList(email, emailList) {
      //   // Check if the email address is contained in the agent table.
      //   for (let i = 0; i < emailList.length; i++) {
      //     if (email === emailList[i].Email) {
      //       console.log('Update')
      //       const updateAgent = await strapi.db.query('plugin::custom-app.agent').update({
      //       where: { id: getAgent[i].id },
      //       data: {
      //         'netcorelead': {
      //           connect:[
      //             {id:entry.id}
      //           ]
      //         }
      //       },
      //     });
      //     }
      //   }
      //    console.log('Create');
      //    let entry2 = await strapi.db.query('plugin::custom-app.agent').create({
      //       data: {
      //         'Email': Agent_Email,
      //         'netcorelead': {
      //           connect:[
      //             {id:entry.id}
      //           ]
      //         }
      //       }
      //     });
      // }

      // checkEmailInList(Agent_Email,getAgent)

      for (let i = 0; i < getAgent.length; i++) {
        listEmail.push(getAgent[i].Email)
      }

      if(listEmail.includes(Agent_Email)){
        console.log('Update')
              const updateAgent = await strapi.db.query('plugin::custom-app.agent').update({
              where: { Email: Agent_Email },
              data: {
                'netcorelead': {
                  connect:[
                    {id:entry.id}
                  ]
                }
              },
            });
      }else{
        console.log('Create');
         let entry2 = await strapi.db.query('plugin::custom-app.agent').create({
            data: {
              'Email': Agent_Email,
              'netcorelead': {
                connect:[
                  {id:entry.id}
                ]
              }
            }
          });
      }
    }
  },

  
//----------------------------------------------
  async get_cus_for_agent(ctx) {
    console.log(ctx.request.body);
    console.log(ctx.request.header);

    const getcustomer = await strapi.db.query('plugin::custom-app.agent').findMany({
      select: ['email'],
      populate: { netcorelead: true }
    })
    console.log(getcustomer)
    ctx.body = getcustomer;
  },
//---------------------------------------------------------
  async send_cus(ctx) {

    const customer = await strapi.db.query('plugin::custom-app.netcorelead').findMany({
      select: ['email', 'mobile'],
      populate: { agent: true }
    });
    console.log(customer);

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
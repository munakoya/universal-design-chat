// const sendgrid = require("@sendgrid/mail");
// exports.sendMail = functions.https.onRequest(async (request, response) => {
//   functions.logger.info("sendMail start");

//   const apiKey = functions.config().sendgrid_service.key;
//   const fromEmail = functions.config().sendgrid_service.email;
//   const fromName = functions.config().sendgrid_service.name;

//   sendgrid.setApiKey(apiKey);
//   const msg = {
//     to: "m-hirano@mediaseek.co.jp",
//     from: `${fromName} <${fromEmail}>`,
//     subject: `【${fromName}】問い合わせ受理メール`,
//     text: `XXXX様
// 問い合わせありがとうございます。担当者が確認して返信したいと思いますので
// 少々お待ち下さい。

// このメールには返信できません。`,
//   };

//   sendgrid
//     .send(msg)
//     .then((result) => {
//       functions.logger.info("sendMail success");
//       response.send("sendMail success");
//       return console.log("Successfully sent message:", result);
//     })
//     .catch((error) => {
//       functions.logger.error("sendMail error");
//       functions.logger.error(error);
//       response.send("sendMail error");
//       return console.log("Error sending message:", error);
//     });
//   //   return;
// });

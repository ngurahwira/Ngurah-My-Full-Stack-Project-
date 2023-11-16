// const fetch = require("node-fetch");
// const CryptoJS = require("crypto-js");

// class MakePayment {
//   static async payment(req, res) {
//     try {
//       // adjust with your iPaymu api key & va
//       const apikey = "QbGcoO0Qds9sQFDmY0MWg1Tq.xtuh1";
//       const va = "1179000899";
//       const url = "https://sandbox.ipaymu.com/api/v2/payment/direct"; // development mode
//       // const url = 'https://my.ipaymu.com/api/v2/payment/direct'; // for production mode

//       const body = {
//         name: "Putu",
//         phone: "08123456789",
//         email: "putu@gmail.com",
//         amount: 10000,
//         comments: "Payment to XYZ Store",
//         notifyUrl: "https://your-website.com/callback-url", // your callback url
//         referenceId: "1234", // your reference id or transaction id
//         paymentMethod: "va",
//         paymentChannel: "bca",
//       };

//       // generate signature
//       const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
//       const stringtosign = `POST:${va}:${bodyEncrypt}:${apikey}`;
//       const signature = CryptoJS.enc.Hex.stringify(
//         CryptoJS.HmacSHA256(stringtosign, apikey)
//       );

//       // make the request
//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           va: va,
//           signature: signature,
//           timestamp: "20150201121045",
//         },
//         body: JSON.stringify(body),
//       });

//       const responseJson = await response.json();

//       // response
//       console.log(responseJson);

//       res.json(responseJson); // send the iPaymu response back to the client
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// }

// module.exports = MakePayment;

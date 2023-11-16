const express = require("express");
const axios = require("axios");
const CryptoJS = require("crypto-js");

class MakePayment {
  static async home(req, res, next) {
    res.render("index", {
      title: "Express",
    });
  }

  static async payment(req, res, next) {
    try {
      // adjust with your iPaymu api key & va
      const apikey = "QbGcoO0Qds9sQFDmY0MWg1Tq.xtuh1";
      const va = "1179000899";
      const url = "https://sandbox.ipaymu.com/api/v2/payment"; // development mode
      // const url = 'https://my.ipaymu.com/api/v2/payment'; // for production mode

      const body = {
        product: ["Jacket"],
        qty: ["1"],
        price: ["150000"],
        amount: "10000",
        returnUrl: "https://your-website.com/thank-you-page", //your thank you page url
        cancelUrl: "https://your-website.com/cancel-page", // your cancel page url
        notifyUrl: "https://your-website.com/callback-url", // your callback url
        referenceId: "1234", // your reference id or transaction id
        buyerName: "Putu", // optional
        buyerPhone: "08123456789", // optional
        buyerEmail: "buyer@mail.com", // optional
      };

      // generate signature
      const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
      const stringtosign = `POST:${va}:${bodyEncrypt}:${apikey}`;
      const signature = CryptoJS.enc.Hex.stringify(
        CryptoJS.HmacSHA256(stringtosign, apikey)
      );

      axios
        .post(url, body, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            va: va,
            signature: signature,
            timestamp: "20150201121045",
          },
        })
        .then((response) => {
          // response

          console.log(response.data);
          // const responseJson = response.data;
          // res.status(200).json({ data: response });
          res.status(200).json({ ipaymu_response: response.data });
        })
        .catch((error) => {
          console.error(error);
          res.status(400).json({ error: "invalid request" });
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}

module.exports = MakePayment;

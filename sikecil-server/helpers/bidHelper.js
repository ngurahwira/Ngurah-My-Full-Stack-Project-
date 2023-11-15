// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Bid extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       Bid.belongsTo(models.Profile, { foreignKey: "ProfileId" });
//       Bid.belongsTo(models.Product, { foreignKey: "ProductId" });
//     }
//   }
//   Bid.init(
//     {
//       date_event: DataTypes.DATE,
//       name_event: DataTypes.STRING,
//       status: DataTypes.STRING,
//       ProfileId: DataTypes.INTEGER,
//       ProductId: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "Bid",
//     }
//   );
//   return Bid;
// };

const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

// Config variables
const SPREADSHEET_ID = process.env.PUBLIC_SPREADSHEET_ID || "";
const SHEET_ID = process.env.PUBLIC_SHEET_ID || "";
const GOOGLE_CLIENT_EMAIL = process.env.PUBLIC_GOOGLE_CLIENT_EMAIL || "";
const GOOGLE_SERVICE_PRIVATE_KEY = process.env.GOOGLE_SERVICE_PRIVATE_KEY || "";

const serviceAccountAuth = new JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// GoogleSpreadsheet Initialize
const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

let googleSpreadsheetInstance = undefined;

// Singleton instance of GoogleSpreadsheet
const docCall = async () => {
  if (!googleSpreadsheetInstance) {
    await doc.loadInfo().then(() => {
      googleSpreadsheetInstance = doc;
    });
  }
};

const getDataById = async (id) => {
  await docCall();
  try {
    const sheet = googleSpreadsheetInstance.sheetsById[SHEET_ID];
    const rows = await sheet.getRows();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.get("id") === id) {
        return row;
      }
    }

    return null; // ID value not found
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error);
  }
};

module.exports = getDataById;

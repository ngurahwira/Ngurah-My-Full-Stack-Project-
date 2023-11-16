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

const getAllData = async () => {
  await docCall();
  try {
    const sheet = googleSpreadsheetInstance.sheetsById[SHEET_ID];
    const rows = await sheet.getRows();

    // Map rows to plain objects
    const data = rows.map((row) => {
      const rowData = row._rawData;
      const objectData = {};
      sheet.headerValues.forEach((header, index) => {
        objectData[header] = rowData[index];
      });
      return objectData;
    });

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error);
  }
};

const updateSpreadsheet = async (id, properties) => {
  await docCall();

  try {
    const sheet = googleSpreadsheetInstance.sheetsById[SHEET_ID];

    const rows = await sheet.getRows();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];

      const updatedId = row.get("id");

      if (updatedId === id) {
        row.assign(properties);
        await row.save();
        return;
      }
    }

    throw new Error("ID value not found");
  } catch (error) {
    console.error("Error:", error);
    throw new Error(error);
  }
};

module.exports = { getDataById, getAllData, updateSpreadsheet };

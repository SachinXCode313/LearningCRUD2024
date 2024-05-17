import { auth, spreadsheetId, googleSheets } from "../databases/sheet.js";

// const writeToSheet = async (data) => {
//   // const { id,name,age,phone,address} = data.body;
//   console.log(data)

//   const response = await googleSheets.spreadsheets.values.get({
//     spreadsheetId: spreadsheetId,
//     range: `Sheet1!A1:E1`,
//   });
//   const numRows = response.data.values ? response.data.values.length : 0;
//   const nextRow = numRows + 1;

//   await googleSheets.spreadsheets.values.append({
//     auth,
//     spreadsheetId,
//     range: `Sheet1!A:K`,
//     valueInputOption: "USER_ENTERED",
//     requestBody: {
//       values: [Object.values(data)],
//     },
//   });
// };

const writeToSheet = async (req, res) => {
  const { id,name,age,phone,address} = req.body;

  const addRows = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A1:E1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[id,name,age,phone,address]],
    },
  });
};







export { writeToSheet };

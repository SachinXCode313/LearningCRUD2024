import { auth, spreadsheetId, googleSheets } from "../databases/sheet.js";

//Get Users Data
const getUser = async (req, res) => {
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
    // range: "Sheet1!A2:B",
  });
  const values = getRows.data.values.slice(1);

  res.send(values);
};

//Create Users Data
const createUser = async (req, res) => {
  const { user, pass } = req.body;

  const addRows = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[user, pass]],
    },
  });
};

//Update Users Data
const updateUser = async (req, res) => {
    const userId = parseInt(req.params.id)
    const {user,pass} = req.body

    try{
        const updatedRow = await googleSheets.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range: `Sheet1!A${userId+1}`,
            valueInputOption: "USER_ENTERED",
            resource: {
              values: [[user, pass]],
            },
          });
          console.log(updatedRow.config.data.values)
          res.send(updatedRow.config.data.values)
    }catch(err){
        console.log(err)
    }
};

export { getUser, createUser, updateUser };

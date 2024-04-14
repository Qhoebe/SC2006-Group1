const Expenses = "Expenses";

/** To create a new expenses
 *
 * @param {*} newDocument js object following the expenses.txt format
 * @returns 1 if successfully created else throw an error
 */
export async function addExpenses(newDocument) {
  try {
    
    const { createOneDocument } = await import("../database/database.mjs");
    const expense = await createOneDocument(Expenses, newDocument);

    return expense;
  } catch (e) {
    console.error("Error at addExpenses:\n", e.message);
    throw new Error("Error at addExpenses:\n", e.message);
  }
}

/** To get the list of expenses able to filter the list by including the following parameters
 *
 * @param {*} _username the username of the user that wishes to get it expenses
 * @param {*} _category to select the expense type takes in a Enum from Enum/expenses.js
 * @param {*} startDate to filter expenses from this date onwards
 * @param {*} endDate to filter expenses before this date (inclusive)
 * @param {*} descending -1 to view from latest to oldest, 1 to view from oldest to latest
 * @param {*} max max number of documents to view
 * @returns a array of JSON object
 */
export async function getExpensesList(
  _username,
  _category,
  startDate, //operation date
  endDate, // current date
  descending,
  max
) {
  try {
    const { findDocuments } = await import("../database/database.mjs");

    _category = _category !== undefined ? _category : 3;
    startDate = startDate !== undefined ? startDate : new Date(2020, 0, 0);
    endDate = endDate !== undefined ? endDate : new Date();
    descending = descending !== undefined ? descending : -1;
    max = max !== undefined ? max : Number.MAX_SAFE_INTEGER;

    /* SET TO SINGAPORE TIME */
    endDate.setHours(endDate.getHours() + 8);

    let pipeline;
    if (_category === 3)
      pipeline = {
        username: _username,
        date: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      };
    else
      pipeline = {
        username: _username,
        category: _category,
        date: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        },
      };

    const sortedPipeline = { date: descending };

    const documentArray = await findDocuments(
      Expenses,
      pipeline,
      sortedPipeline,
      max
    );

    return documentArray;

  } catch (e) {
    console.error("Error at getExpensesList:\n", e.message);
    throw new Error("Error at getExpensesList:\n", e);
  }
}

/** To edit a specify expense
 *
 * @param {*} _expensesID the ID of the expense
 * @param {*} _updatedDocument A js object containing the key:value of the fields to be updated
 * @returns a js object of the updated expense
 */
export async function editExpenses(_expensesID, _updatedDocument) {
  try {
    const { upsertDocument } = await import("../database/database.mjs");
    const { ObjectId } = await import("mongodb");

    delete _updatedDocument._id;
    const id = ObjectId.createFromHexString(_expensesID);

    const obj = await upsertDocument(
      Expenses,
      {
        _id: id,
      },
      {
        $set: _updatedDocument,
      },
      false
    );

    return obj;
  } catch (e) {
    console.error("Error at editExpenses:\n", e.message);
    throw new Error("Error at editExpenses:\n", e);
  }
}

/** To delete an expense
 *
 * @param {*} _expensesID the ID of the expense
 * @returns 1 means successful else throw an error
 */
export async function deleteExpense(_expensesID) {
  try {
    const { deleteOneDocument } = await import("../database/database.mjs");
    const { ObjectId } = await import("mongodb");

    const id = ObjectId.createFromHexString(_expensesID);
    const success = await deleteOneDocument(Expenses, {
      _id: id,
    });

    return success;
  } catch (e) {
    throw new Error("Error at addExpenses:\n", e);
  }
}

const Distance = "Distance";

/** To create a new distance record
 *
 * @param {*} newDocument js object following the distance.txt format
 * @returns 1 if successfully created else throw an error
 */
export async function addDistance(newDocument) {
  try {
    const { createOneDocument } = await import("../database/database.mjs");
    const distance = await createOneDocument(Distance, newDocument);

    return distance;
  } catch (e) {
    console.error("Error at addDistance:\n", e.message);
    throw new Error("Error at addDistance:\n", e.message);
  }
}

/** To get the list of distance record, able to filter the list by including the following parameters
 *
 * @param {*} _username the username of the user 
 * @param {*} startDate to filter distance from this date onwards
 * @param {*} endDate to filter distance before this date (inclusive)
 * @param {*} descending -1 to view from latest to oldest, 1 to view from oldest to latest
 * @param {*} max max number of documents to view
 * @returns a cursor object
 */
export async function getDistanceList(
  _username,
  startDate, //operation date
  endDate, // current date
  descending,
  max
) {
  try {
    const { findDocuments } = await import("../database/database.mjs");

    startDate = startDate !== undefined ? startDate : new Date(2024, 0, 19);
    endDate = endDate !== undefined ? endDate : new Date();
    descending = descending !== undefined ? descending : -1;
    max = max !== undefined ? max : Number.MAX_SAFE_INTEGER;

    /* SET TO SINGAPORE TIME */
    endDate.setHours(endDate.getHours() + 8);

    let pipeline = {
    username: _username,
    date: {
          $gte: new Date(startDate).toISOString(),
          $lte: new Date(endDate).toISOString(),
        }
    }
   
    const sortedPipeline = { date: descending };

    const documentArray = await findDocuments(
      Distance,
      pipeline,
      sortedPipeline,
      max
    );

    return documentArray;
  } catch (e) {
    console.error("Error at getDistanceList:\n", e.message);
    throw new Error("Error at getDistanceList:\n", e);
  }
}

/** To edit a specify distance record
 *
 * @param {*} _distanceID the ID of the distance record
 * @param {*} _updatedDocument A js object containing the key:value of the fields to be updated
 * @returns a js object of the updated expense
 */
export async function editDistance(_distanceID, _updatedDocument) {
  try {
    const { upsertDocument } = await import("../database/database.mjs");
    const { ObjectId } = await import("mongodb");

    delete _updatedDocument._id;
    const id = ObjectId.createFromHexString(_distanceID);

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
    console.error("Error at editDistance:\n", e.message);
    throw new Error("Error at editDistance:\n", e);
  }
}

/** To delete an distance
 *
 * @param {*} _distanceID the ID of the distance
 * @returns 1 means successful else throw an error
 */
export async function deleteDistance(_distanceID) {
  try {
    const { deleteOneDocument } = await import("../database/database.mjs");
    const { ObjectId } = await import("mongodb");

    const id = ObjectId.createFromHexString(_distanceID);
    const success = await deleteOneDocument(Distance, {
      _id: id,
    });

    return success;
  } catch (e) {
    throw new Error("Error at deleteDistance:\n", e);
  }
}
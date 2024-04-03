import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://songbelvedere:VCJAZUjVB5uE2KDm@sweproject.eb6ansz.mongodb.net/?retryWrites=true&w=majority&appName=SWEproject";

const client = new MongoClient(uri);

export async function setupDB() {
  try {
    await client.connect(); //connect to cluster
    console.log("Database connected");

    global.db = client.db("SWEproject");
    //await listDatabases(client);
  } catch (e) {
    throw new Error("Error at setUpDB:\n", e);
  }
}

export async function closeDB() {
  await client.close();
}

// CRUD OPERATION

/** To create one document
 *
 * @param {*} collectionName name of the collection
 * @param {*} newDocument a js object, format is in dateBaseFormat folder
 */
export async function createOneDocument(collectionName, newDocument) {
  try {
    //console.log(global.db);
    const result = await global.db
      .collection(collectionName)
      .insertOne(newDocument);
    console.log("Document Created");
    return result;
  } catch (e) {
    console.error("Error at createOneDocument:\n", e.message);
    throw new Error("Error at createOneDocument:\n", e.message);
  }
}

/** To find a list of documents, can include filter setting in pipeline
 *
 * @param {*} collectionName name of the collection
 * @param {*} pipeline Filter setting. pipeline = {attributeNameToBeFilter: attributeValue}\
 * @param {*} sortedpipeline sort the cursor object based on the given pipeline
 * @param max the max number of document the cursor object will return.
 * @returns A cursor object after filtering
 */
export async function findDocuments(
  collectionName,
  pipeline,
  sortedpipeline,
  max
) {
  try {
    // console.log("what the db contains now");
    // const all = await global.db.collection(collectionName).find();
    // const documentAll = await all.toArray();
    // console.log(documentAll);

    const cursor = await global.db
      .collection(collectionName)
      .find(pipeline)
      .sort(sortedpipeline)
      .limit(max);

    const documentArray = await cursor.toArray();
    console.log(documentArray);
    return documentArray;
  } catch (e) {
    console.error("Error at findDocuments:\n", e.message);
    throw new Error("Error at findDocuments:\n", e);
  }
}

/** To find one documents that matches the filter setting in pipeline
 *
 * @param {*} collectionName name of collection
 * @param {*} pipeline filter setting. pipeline = {attributeNameToBeFilter: attributeValue}
 * @returns a js object
 */
export async function findOneDocument(collectionName, pipeline) {
  try {
    const obj = await global.db.collection(collectionName).findOne(pipeline);
    return obj;
  } catch (e) {
    console.error("Error at findOneDocuments:\n", e.message);
    throw new Error("Error at findOneDocuments:\n", e);
  }
}

/** To count the number of documents that matches the pipeline setting
 *
 * @param {*} collectionName name of the collection
 * @param {*} pipeline Filter setting. pipeline = {attributeNameToBeFilter: attributeValue}
 * @returns the count
 */
export async function documentCount(collectionName, pipeline) {
  try {
    const count = await global.db.collection(collectionName).count(pipeline);
    return count;
  } catch (e) {
    throw new Error("Error at documentCount:\n", e);
  }
}

/** To perform some operation on the collection with a specific aggegration setting in pipeline
 * 
 * @param {*} collectionName name of the collection
 * @param {*} pipeline aggregate setting
 *  pipeline = [ {
    {$match: { attributeName: "valueToMatch"} },
    {$group: { newAttributeName: "$attributeToMatchAndItTakesItValue", newAttributeName : {$sum : "valueToBeSum"}}}
 * @returns A cursor object after aggregation
 */
export async function aggregateDocuments(collectionName, pipeline) {
  try {
    const cursor = await global.db
      .collection(collectionName)
      .aggregate(pipeline);
    return cursor;
  } catch (e) {
    throw new Error("Error at aggregateDocuments:\n", e);
  }
}

/** To upsert one document in a collection
 *
 * @param {*} collectionName name of the collection
 * @param {*} pipeline to specify the document to be upserted
 * @param {*} upsertedDocument a js object with only the key:value pair that needs to be updated
 * @returns the newly upserted Document
 */
export async function upsertDocument(
  collectionName,
  pipeline,
  upsertedDocument,
  toUpsert
) {
  try {
    const cursor = await global.db
      .collection(collectionName)
      .updateOne(pipeline, upsertedDocument, { upsert: toUpsert });
    return cursor;
  } catch (e) {
    console.error("Error at upsertDocument:\n", e.message);
    throw new Error("Error at upsertDocument:\n", e);
  }
}

/** To delete one document from a collection
 *
 * @param {*} collectionName name of the collection
 * @param {*} documentID to specify the document to be deleted
 */
export async function deleteOneDocument(collectionName, pipeline) {
  try {
    const result = await global.db
      .collection(collectionName)
      .deleteOne(pipeline);
    console.log(result);
    if (result.deletedCount === 1) return 1;
    else return 0;
  } catch (e) {
    throw new Error("Error at deleteOneDecoment:\n", e);
  }
}

/** List out the current collections in the datebase
 *
 */
export async function listDatabases() {
  const databasesList = await global.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => {
    console.log(`-${db.name}`);
  });
}

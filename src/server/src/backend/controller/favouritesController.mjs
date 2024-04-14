// controller/favouritesController.mjs
const Favourites = "Favourites";

/** To add a place to a user's favorites
 * Adds a favorite document to the "Favourites" collection based on the provided document object.
 * @param {Object} document - The document object containing userID and placeID properties.
 * @returns {boolean} - A boolean indicating the success of the insertion operation.
 * @throws {Error} - Throws an error if the insertion operation fails.
 */
export async function addFavorite(document) {
    try {
        // Import the upsertDocument function from the database module
        const { upsertDocument } = await import("../database/database.mjs");

        // Call the upsertDocument function to insert or update the specified favorite
        const success = await upsertDocument(
            "Favourites", // Collection name
            { userID: document.userID, placeID: document.placeID }, // Filter criteria
            { $set: { placeID: document.placeID } }, // Update with $set operator
            true // Indicate whether to insert if document doesn't exist
        );

        // Log a success message to the console
        console.log(`Place ${document.placeID} added to favorites for user ${document.userID}`);

        // Return the success status
        return success;
    } catch (e) {
        // If an error occurs, throw an error with a descriptive message
        throw new Error("Error at addFavorite:", e);
    }
}


/** To delete a favourite.
 * Deletes a favorite document from the "Favourites" collection based on the provided document object.
 * @param {Object} document - The document object containing userID and placeID properties.
 * @returns {boolean} - A boolean indicating the success of the deletion operation.
 * @throws {Error} - Throws an error if the deletion operation fails.
 */
export async function deleteFavorite(document) {
    try {
        // Import the deleteOneDocument function from the database module
        const { deleteOneDocument } = await import("../database/database.mjs");

        // Call the deleteOneDocument function to delete the specified favorite
        const success = await deleteOneDocument("Favourites", { userID: document.userID, placeID: document.placeID });

        // Log a success message to the console
        console.log(`Place ${document.placeID} removed from favorites for user ${document.userID}`);

        // Return the success status
        return success;
    } catch (e) {
        // If an error occurs, throw an error with a descriptive message
        throw new Error("Error at deleteFavorite:", e);
    }
}

/**
 * Checks if a specific record exists in the "Favourites" collection based on the provided userID and placeID.
 * @param {Object} document - The document object containing userID and placeID properties.
 * @returns {boolean} - A boolean indicating whether the record exists.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function isFavorited(document) {
    try {
        // Import the findOneDocument function from the database module
        const { findOneDocument } = await import("../database/database.mjs");

        // Use the findOneDocument function to find a record in the "Favourites" collection based on the provided userID and placeID
        const foundFavorite = await findOneDocument("Favourites", { userID: document.userID, placeID: document.placeID });

        // Log a success message to the console
        console.log(`Search for user ${document.userID} and place ${document.placeID} in favorites`);

        // Return true if the record is found, otherwise return false
        return foundFavorite !== null;
    } catch (e) {
        // If an error occurs, throw an error with a descriptive message
        throw new Error(`Error checking record existence in Favourites collection: ${e.message}`);
    }
}

/**
 * Retrieves a list of favorite records for a specific user from the "Favourites" collection based on the provided userID.
 * @param {Object} document - The document object containing userID property.
 * @returns {Array} - An array containing the retrieved favorite records.
 * @throws {Error} - Throws an error if the operation fails.
 */
export async function favoritesList(document) {
    try {
        // Import the findDocuments function from the database module
        const { findDocuments } = await import("../database/database.mjs");

        // Use the findDocuments function to retrieve favorite records from the "Favourites" collection based on the provided userID
        const favorites = await findDocuments("Favourites", { userID: document.userID }, null, Infinity);

        // Log a success message to the console
        console.log(`List user ${document.userID} favorites`);
        // Return the retrieved favorite records
        return favorites;
    } catch (e) {
        // If an error occurs, throw an error with a descriptive message
        throw new Error(`Error finding favorites: ${e.message}`);
    }
}



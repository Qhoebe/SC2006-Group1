// controller/evChargerController.mjs
const EVStations = "EVStations";

export async function getEVChargersList() {
    try {
        const { findDocuments } = await import("../database/database.mjs");
        const evChargersList = await findDocuments(EVStations, {});
        return evChargersList;
    } catch (error) {
        console.error("Error fetching EV charger list:", error.message);
        throw new Error("Error fetching EV charger list:", error);
    }
}

export async function getEVChargerDetails(ev_station, userID) {
    try {
        // Import the findOneDocument function
        const { findOneDocument } = await import("../database/database.mjs");

        // Find the EV charger document based on its name
        const evChargerDetails = await findOneDocument(EVStations, { name: ev_station });

        // Throw an error if the EV charger is not found
        if (!evChargerDetails) {
            throw new Error("EV charger not found");
        }

        // Check if the user ID is provided
        if (userID) {
            // Import the isEVChargerFavoritedByUser function
            const { isEVChargerFavoritedByUser } = await import("../controller/evChargerController.mjs");

            // Check if the EV charger is favorited by the user
            evChargerDetails.isFavorited = await isEVChargerFavoritedByUser(userID, ev_station);
        }

        // Return the EV charger details
        return evChargerDetails;
    } catch (error) {
        console.error("Error fetching EV charger details:", error.message);
        throw new Error("Error fetching EV charger details:", error);
    }
}

/** Add an EV charger to a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} ev_station The name of the EV charger to be added to favorites
 */
export async function addToFavorites(userID, ev_station) {
    try {
        await addEVChargerToFavorites(userID, ev_station);
        console.log(`EV charger ${ev_station} added to favorites for user ${userID}`);
        // Optionally, you can return a success message or status code here
    } catch (error) {
        console.error("Error adding EV charger to favorites:", error);
        throw new Error("Error adding EV charger to favorites:", error);
    }
}

/** To add an EV charger to a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} ev_station The name of the EV charger to be added to favorites
 */
export async function addEVChargerToFavorites(userID, ev_station) {
    try {
        const { upsertDocument } = await import("../database/database.mjs");

        // Upsert the favorite entry for the user
        await upsertDocument("favorites", { userID }, { $addToSet: { evChargers: ev_station } }, true);
    } catch (e) {
        console.error("Error at addEVChargerToFavorites:", e);
        throw new Error("Error at addEVChargerToFavorites:", e);
    }
}

/** Check if an EV charger is favorited by a user
 *
 * @param {*} userID The ID of the user
 * @param {*} ev_station The name of the EV charger
 * @returns {boolean} True if the EV charger is favorited by the user, false otherwise
 */
export async function isEVChargerFavoritedByUser(userID, ev_station) {
    try {
        const { findOneDocument } = await import("../database/database.mjs");
        const favorites = await findOneDocument("favorites", { userID });
        return favorites && favorites.evChargers.includes(ev_station);
    } catch (error) {
        console.error("Error checking if EV charger is favorited by user:", error);
        throw new Error("Error checking if EV charger is favorited by user:", error);
    }
}

/** Remove an EV charger from a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} ev_station The name of the EV charger to be removed from favorites
 */
export async function removeFromFavorites(userID, ev_station) {
    try {
        await removeEVChargerFromFavorites(userID, ev_station);
        console.log(`EV charger ${ev_station} removed from favorites for user ${userID}`);
        // Optionally, you can return a success message or status code here
    } catch (error) {
        console.error("Error removing EV charger from favorites:", error);
        throw new Error("Error removing EV charger from favorites:", error);
    }
}

/** Remove an EV charger from a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} ev_station The name of the EV charger to be removed from favorites
 */
export async function removeEVChargerFromFavorites(userID, ev_station) {
    try {
        const { upsertDocument } = await import("../database/database.mjs");

        // Check if the EV charger is favorited by the user
        const isFavorited = await isEVChargerFavoritedByUser(userID, ev_station);
        if (isFavorited) {
            // Remove the EV charger from the favorites list
            await upsertDocument("favorites", { userID }, { $pull: { evChargers: ev_station } }, true);
            console.log(`EV charger ${ev_station} removed from favorites for user ${userID}`);
        } else {
            console.log(`EV charger ${ev_station} is not in favorites for user ${userID}`);
        }
    } catch (error) {
        console.error("Error removing EV charger from favorites:", error);
        throw new Error("Error removing EV charger from favorites:", error);
    }
}

export async function getEVChargersFavoritedByUser(userID) {
    try {
        // Import the isEVChargerFavoritedByUser function
        const { isEVChargerFavoritedByUser } = await import("../controller/evChargerController.mjs");

        // Import the findDocuments function
        const { findDocuments } = await import("../database/database.mjs");

        // Retrieve all EV chargers from the database
        const allEVChargers = await findDocuments(EVStations, {});

        // Filter the list of EV chargers to include only the ones favorited by the user
        const favorites = allEVChargers.filter(async (evCharger) => {
            return await isEVChargerFavoritedByUser(userID, evCharger.name);
        });

        // Return the list of favorited EV chargers
        return favorites;
    } catch (error) {
        console.error("Error fetching favorited EV chargers:", error.message);
        throw new Error("Error fetching favorited EV chargers:", error);
    }
}

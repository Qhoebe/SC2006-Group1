// controller/petrolStationController.mjs
const PetrolStations = "PetrolStations";

export async function getPetrolStationsList() {
    try {
        const { findDocuments } = await import("../database/database.mjs");
        const petrolStationList = await findDocuments(PetrolStations, {});
        return petrolStationList;
    } catch (error) {
        console.error("Error fetching petrol station list:", error.message);
        throw new Error("Error fetching petrol station list:", error);
    }
}

export async function getPetrolStationDetails(petrol_station, userID) {
    try {
        // Import the findOneDocument function
        const { findOneDocument } = await import("../database/database.mjs");

        // Find the petrol station document based on its ID
        const petrolStationDetails = await findOneDocument(PetrolStations, { petrol_station: petrol_station });

        // Throw an error if the petrol station is not found
        if (!petrolStationDetails) {
            throw new Error("Petrol station not found");
        }

        // Check if the user ID is provided
        if (userID) {
            // Import the isPetrolStationFavoritedByUser function
            const { isPetrolStationFavoritedByUser } = await import("../controller/petrolStationController.mjs");

            // Check if the petrol station is favorited by the user
            petrolStationDetails.isFavorited = await isPetrolStationFavoritedByUser(userID, petrol_station);
        }

        // Return the petrol station details
        return petrolStationDetails;
    } catch (error) {
        console.error("Error fetching petrol station details:", error.message);
        throw new Error("Error fetching petrol station details:", error);
    }
}

/** Add a petrolStation to a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} petrol_station The name of the petrolStation to be added to favorites
 */
export async function addToFavorites(userID, petrol_station) {
    try {
        await addPetrolStationToFavorites(userID, petrol_station);
        console.log(`PetrolStation ${petrol_station} added to favorites for user ${userID}`);
        // Optionally, you can return a success message or status code here
    } catch (error) {
        console.error("Error adding petrolStation to favorites:", error);
        throw new Error("Error adding petrolStation to favorites:", error);
    }
}

// QUESTION: Should we include this into database folder instead? 
/** To add a petrolStation to a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} petrol_station The name of the petrolStation to be added to favorites
 */
export async function addPetrolStationToFavorites(userID, petrol_station) {
    try {
        const { upsertDocument } = await import("../database/database.mjs");

        // Upsert the favorite entry for the user
        await upsertDocument("favorites", { userID }, { $addToSet: { petrolStations: petrol_station } }, true);
    } catch (e) {
        console.error("Error at addPetrolStationToFavorites:", e);
        throw new Error("Error at addPetrolStationToFavorites:", e);
    }
}

// QUESTION: Should we include this into database folder instead?
/** Check if a petrolStation is favorited by a user
 *
 * @param {*} userID The ID of the user
 * @param {*} petrol_station The name of the petrolStation
 * @returns {boolean} True if the petrolStation is favorited by the user, false otherwise
 */
export async function isPetrolStationFavoritedByUser(userID, petrol_station) {
    try {
        const { findOneDocument } = await import("../database/database.mjs");
        const favorites = await findOneDocument("favorites", { userID });
        return favorites && favorites.petrolStations.includes(petrol_station);
    } catch (error) {
        console.error("Error checking if petrolStation is favorited by user:", error);
        throw new Error("Error checking if petrolStation is favorited by user:", error);
    }
}

/** Remove a petrolStation from a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} petrol_station The name of the petrolStation to be removed from favorites
 */
export async function removeFromFavorites(userID, petrol_station) {
    try {
        await removePetrolStationFromFavorites(userID, petrol_station);
        console.log(`PetrolStation ${petrol_station} removed from favorites for user ${userID}`);
        // Optionally, you can return a success message or status code here
    } catch (error) {
        console.error("Error removing petrolStation from favorites:", error);
        throw new Error("Error removing petrolStation from favorites:", error);
    }
}

// QUESTION: Should we include this into database folder instead?
/** Remove a petrolStation from a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} petrol_station The name of the petrolStation to be removed from favorites
 */
export async function removePetrolStationFromFavorites(userID, petrol_station) {
    try {
        const { upsertDocument } = await import("../database/database.mjs");

        // Check if the petrolStation is favorited by the user
        const isFavorited = await isPetrolStationFavoritedByUser(userID, petrol_station);
        if (isFavorited) {
            // Remove the petrolStation from the favorites list
            await upsertDocument("favorites", { userID }, { $pull: { petrolStations: petrol_station } }, true);
            console.log(`PetrolStation ${petrol_station} removed from favorites for user ${userID}`);
        } else {
            console.log(`PetrolStation ${petrol_station} is not in favorites for user ${userID}`);
        }
    } catch (error) {
        console.error("Error removing petrolStation from favorites:", error);
        throw new Error("Error removing petrolStation from favorites:", error);
    }
}

export async function getPetrolStationsFavoritedByUser(userID) {
    try {
        // Import the isPetrolStationFavoritedByUser function
        const { isPetrolStationFavoritedByUser } = await import("../controller/petrolStationController.mjs");

        // Import the findDocuments function
        const { findDocuments } = await import("../database/database.mjs");

        // Retrieve all petrol stations from the database
        const allPetrolStations = await findDocuments(PetrolStations, {});

        // Filter the list of petrol stations to include only the ones favorited by the user
        const favorites = allPetrolStations.filter(async (petrolStation) => {
            return await isPetrolStationFavoritedByUser(userID, petrolStation.petrol_station);
        });

        // Return the list of favorited petrol stations
        return favorites;
    } catch (error) {
        console.error("Error fetching favorited petrol stations:", error.message);
        throw new Error("Error fetching favorited petrol stations:", error);
    }
}

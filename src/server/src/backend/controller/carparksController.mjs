// controller/carparksController.mjs
const Carparks = "Carparks";

import axios from "axios";

export async function getCarparksList() {
  try {

    // Define your custom header value
    const headers = {
      "AccountKey": "kOpaExgdQci4MFe1S0a8Iw==", // Replace YourAccessToken with your actual token
      "Content-Type": "application/json"
      // Add more headers if needed
    };

    // Make a request to the external API to fetch the carpark list
    const response = await axios.get("http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2");
    const carparkList = response.data.value;

    return carparkList;
  } catch (error) {
    console.error("Error fetching carpark list:", error.message);
    throw new Error("Error fetching carpark list:", error);
  }
}

export async function getCarparkDetails(carparkID, userID) {
  try {
    // Define your custom header value
    const headers = {
      "AccountKey": "kOpaExgdQci4MFe1S0a8Iw==", // Replace YourAccessToken with your actual token
      "Content-Type": "application/json"
      // Add more headers if needed
    };

    // Import the latest5ReviewList function within the function
    const { latest5ReviewList } = await import("../controller/reviewsController.mjs");

    // Make a request to the external API to fetch all carparks
    const response = await axios.get("http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2", {
      headers: headers
    });
    const allCarparks = response.data.value;

    // Find the carpark with the specified ID in the list
    const carparkDetails = allCarparks.find(carpark => carpark.CarParkID === carparkID);

    if (!carparkDetails) {
      throw new Error("Carpark not found");
    }

    if (userID) {
      carparkDetails.isFavorited = await isCarparkFavoritedByUser(userID, carparkID);
    }

    // Retrieve the latest reviews for the carpark
    const latestReviews = await latest5ReviewList(carparkID);
    carparkDetails.latestReviews = latestReviews;

    return carparkDetails;
  } catch (error) {
    console.error("Error fetching carpark details:", error.message);
    throw new Error("Error fetching carpark details:", error);
  }
}



/** Add a carpark to a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} carparkID The ID of the carpark to be added to favorites
 */
export async function addToFavorites(userID, carparkID) {
  try {
    await addCarparkToFavorites(userID, carparkID);
    console.log(`Carpark ${carparkID} added to favorites for user ${userID}`);
    // Optionally, you can return a success message or status code here
  } catch (error) {
    console.error("Error adding carpark to favorites:", error);
    throw new Error("Error adding carpark to favorites:", error);
  }
}

// QUESTION: Should we include this into database folder instead? 
/** To add a carpark to a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} carparkID The ID of the carpark to be added to favorites
 */
export async function addCarparkToFavorites(userID, carparkID) {
  try {
    const { upsertDocument } = await import("../database/database.mjs");

    // Upsert the favorite entry for the user
    await upsertDocument("favorites", { userID }, { $addToSet: { carparks: carparkID } }, true);
  } catch (e) {
    console.error("Error at addCarparkToFavorites:", e);
    throw new Error("Error at addCarparkToFavorites:", e);
  }
}

// QUESTION: Should we include this into database folder instead?
/** Check if a carpark is favorited by a user
 *
 * @param {*} userID The ID of the user
 * @param {*} carparkID The ID of the carpark
 * @returns {boolean} True if the carpark is favorited by the user, false otherwise
 */
export async function isCarparkFavoritedByUser(userID, carparkID) {
  try {
    const { findOneDocument } = await import("../database/database.mjs");
    const favorites = await findOneDocument("favorites", { userID });
    return favorites && favorites.carparks.includes(carparkID);
  } catch (error) {
    console.error("Error checking if carpark is favorited by user:", error);
    throw new Error("Error checking if carpark is favorited by user:", error);
  }
}

/** Remove a carpark from a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} carparkID The ID of the carpark to be removed from favorites
 */
export async function removeFromFavorites(userID, carparkID) {
  try {
    await removeCarparkFromFavorites(userID, carparkID);
    console.log(`Carpark ${carparkID} removed from favorites for user ${userID}`);
    // Optionally, you can return a success message or status code here
  } catch (error) {
    console.error("Error removing carpark from favorites:", error);
    throw new Error("Error removing carpark from favorites:", error);
  }
}

// QUESTION: Should we include this into database folder instead?
/** Remove a carpark from a user's favorites
 *
 * @param {*} userID The ID of the user
 * @param {*} carparkID The ID of the carpark to be removed from favorites
 */
export async function removeCarparkFromFavorites(userID, carparkID) {
  try {
    const { upsertDocument } = await import("../database/database.mjs");

    // Check if the carpark is favorited by the user
    const isFavorited = await isCarparkFavoritedByUser(userID, carparkID);
    if (isFavorited) {
      // Remove the carpark from the favorites list
      await upsertDocument("favorites", { userID }, { $pull: { carparks: carparkID } }, true);
      console.log(`Carpark ${carparkID} removed from favorites for user ${userID}`);
    } else {
      console.log(`Carpark ${carparkID} is not in favorites for user ${userID}`);
    }
  } catch (error) {
    console.error("Error removing carpark from favorites:", error);
    throw new Error("Error removing carpark from favorites:", error);
  }
}

export async function getCarparksFavoritedByUser(userID) {
  try {
    // Define your custom header value
    const headers = {
      "AccountKey": "kOpaExgdQci4MFe1S0a8Iw==", // Replace YourAccessToken with your actual token
      "Content-Type": "application/json"
      // Add more headers if needed
    };

    // Make a request to the external API to fetch the carpark list
    const response = await axios.get("http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2");
    const allCarparks = response.data.value;

    // Filter the list of carparks to include only the ones favorited by the user
    const favorites = allCarparks.filter(async (carpark) => {
      return await isCarparkFavoritedByUser(userID, carpark.CarParkID);
    });

    return favorites;
  } catch (error) {
    console.error("Error fetching favorited carparks:", error.message);
    throw new Error("Error fetching favorited carparks:", error);
  }
}






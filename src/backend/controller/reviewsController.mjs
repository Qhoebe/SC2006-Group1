const Reviews = "Reviews";

/** Add a new review
 *
 * @param {*} newReview Review object containing userID, facilityID, date, anonymity, rating, and review
 * @returns The newly created review object
 */
export async function addReview(newReview) {
  try {
    const { createOneDocument } = await import("../database/database.mjs");
    const review = await createOneDocument(Reviews, newReview);
    return review;
  } catch (error) {
    console.error("Error adding review:", error.message);
    throw new Error("Error adding review:", error);
  }
}

/** Get a list of reviews
 *
 * @param {*} facilityID The ID of the facility to filter the reviews
 * @param {number} max Maximum number of reviews to retrieve
 * @returns An array of reviews
 */
export async function getReviewsList(facilityID, max) {
  try {
    const { findDocuments } = await import("../database/database.mjs");
    const pipeline = { facilityID };
    const sortedPipeline = { date: -1 }; // Sort by date in descending order
    const reviews = await findDocuments(Reviews, pipeline, sortedPipeline, max);
    return reviews;
  } catch (error) {
    console.error("Error getting reviews list:", error.message);
    throw new Error("Error getting reviews list:", error);
  }
}

/** Edit an existing review
 *
 * @param {*} reviewID The ID of the review to edit
 * @param {*} updatedReview Updated review object
 * @returns The updated review object
 */
export async function editReview(reviewID, updatedReview) {
  try {
    const { upsertDocument } = await import("../database/database.mjs");
    const { ObjectId } = await import("mongodb");

    const id = ObjectId.createFromHexString(reviewID);
    const updatedReviewWithoutID = { ...updatedReview };
    delete updatedReviewWithoutID._id;

    const updatedDoc = await upsertDocument(
      Reviews,
      { _id: id },
      { $set: updatedReviewWithoutID },
      false
    );

    return updatedDoc;
  } catch (error) {
    console.error("Error editing review:", error.message);
    throw new Error("Error editing review:", error);
  }
}

/** Delete a review
 *
 * @param {*} reviewID The ID of the review to delete
 * @returns 1 if deletion is successful, otherwise throws an error
 */
export async function deleteReview(reviewID) {
  try {
    const { deleteOneDocument } = await import("../database/database.mjs");
    const { ObjectId } = await import("mongodb");

    const id = ObjectId.createFromHexString(reviewID);
    const success = await deleteOneDocument(Reviews, { _id: id });

    return success;
  } catch (error) {
    console.error("Error deleting review:", error.message);
    throw new Error("Error deleting review:", error);
  }
}

/** Get the latest 5 reviews for a specific facility
 *
 * @param {*} facilityID The ID of the facility to retrieve the latest reviews for
 * @returns An array of the latest 5 reviews for the specified facility
 */
export async function getLatestReviews(facilityID) {
    try {
      const { findDocuments } = await import("../database/database.mjs");
      const pipeline = facilityID ? { facilityID } : {};
      const sortedPipeline = { date: -1 }; // Sort by date in descending order
      const latestReviews = await findDocuments(Reviews, pipeline, sortedPipeline, 5);
      return latestReviews;
    } catch (error) {
      console.error("Error getting latest reviews:", error.message);
      throw new Error("Error getting latest reviews:", error);
    }
  }
  

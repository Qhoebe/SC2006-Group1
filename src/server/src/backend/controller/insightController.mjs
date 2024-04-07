const Distance = 'Distance'; 
const Expenses = 'Expenses'

/** get the total distance travelled within a specific date
 * 
 * @param {*} _username username of the user
 * @param {*} startDate start date of range (default is start of the month) 
 * @param {*} endDate  end date of range (default is the current date)
 * @returns 
 */
export async function sumDistanceForDateRange(_username, startDate, endDate) {
  try {

    // set default start date to the start of the month and end date to the current date
    startDate = startDate !== undefined ? startDate : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    endDate = endDate !== undefined ? endDate : new Date();

    const { aggregateDocuments } = await import("../database/database.mjs");

    const pipeline = [
      {
        $match: {
            username: _username,
            date: {
              $gte: new Date(startDate).toISOString(), // Convert startDate to a Date object
              $lte: new Date(endDate).toISOString(),   // Convert endDate to a Date object
            },
        },
      },
      {
        $group: {
            _id: null,
            totalDistance: { $sum: "$distanceTravelled" }, // Sum of the distance field
        },
      },
    ];

    const result = await aggregateDocuments(Distance, pipeline)

    if (result.length > 0) {
      return result[0].totalDistance; // Return the total distance
    } else {
      return 0; // Return 0 if no documents match the date range
    }
  } catch (e) {
    throw new Error("Error at sumDistanceForDateRange:\n" + e);
  }
}

/** get the total amount spend for each category  within a specific date
 * 
 * @param {*} _username username of the user
 * @param {*} startDate start date of range (default is start of the month) 
 * @param {*} endDate  end date of range (default is the current date)
 * @returns 
 */
export async function sumExpensesForDateRange(_username, startDate, endDate) {
    try {
      
      // set default start date to the start of the month and end date to the current date
      startDate = startDate !== undefined ? startDate : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      endDate = endDate !== undefined ? endDate : new Date();
  
      const { aggregateDocuments } = await import("../database/database.mjs");
  
      const pipeline = [
        {
          $match: {
              username: _username,
              date: {
                $gte: new Date(startDate).toISOString(), // Convert startDate to a Date object
                $lte: new Date(endDate).toISOString(),   // Convert endDate to a Date object
              },
          },
        },
        {
          $group: {
              _id: '$category', // Group by category
              totalSpend: { $sum: "$cost" }, // Sum of the cost field
          },
        },
      ];
  
      const result = await aggregateDocuments(Expenses, pipeline)
      
      if (result.length > 0) {
        return result; // Return the total spend for each category
      } else {
        return 0; // Return 0 if no documents match the date range
      }
    } catch (e) {
      throw new Error("Error at sumExpensesForDateRange:\n" + e);
    }
}

/** get the total fuel pump within a specific date
 * 
 * @param {*} _username username of the user
 * @param {*} startDate start date of range (default is start of the month) 
 * @param {*} endDate  end date of range (default is the current date)
 * @returns 
 */
export async function sumFuelPumpForDateRange(_username, startDate, endDate) {
    try {
      // set default start date to the start of the month and end date to the current date
      startDate = startDate !== undefined ? startDate : new Date(new Date().getFullYear(), new Date().getMonth(), 1);
      endDate = endDate !== undefined ? endDate : new Date();
  
      const { aggregateDocuments } = await import("../database/database.mjs");
  
      const pipeline = [
        {
          $match: {
              username: _username,
              category: 0,  // Filter by PETROL category
              date: {
                $gte: new Date(startDate).toISOString(), // Convert startDate to a Date object
                $lte: new Date(endDate).toISOString(),   // Convert endDate to a Date object
              },
          },
        },
        {
          $group: {
              _id: null,
              totalFuelPump: { $sum: "$amountOfFuelPump" }, // Sum of the amountOfFuelPump field
          },
        },
      ];
  
      const result = await aggregateDocuments(Expenses, pipeline)
      
      if (result.length > 0) {
        return result[0].totalFuelPump // Return the totalPetrolPump
      } else {
        return 0; // Return 0 if no documents match the date range
      }
    } catch (e) {
      console.error(e)
      throw new Error("Error at sumFuelPumpForDateRange:\n" + e);
      
    }
}
  
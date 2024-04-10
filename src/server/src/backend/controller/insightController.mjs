const Distance = 'Distance'; 
const Expenses = 'Expenses'

function getMonthRanges() {
  let currentDate = new Date();
  let monthRanges = [];

  for (let i = 0; i < 12; i++) {
    currentDate.setDate(1); // Ensure we're at the first of the month
    currentDate.setMonth(currentDate.getMonth() - 1); // Move to the first day of the previous month
    let startDate = new Date(currentDate); // Start date is the first of the month

    let endDate = new Date(currentDate); // Clone currentDate for end date calculation
    endDate.setMonth(endDate.getMonth() + 1); // Move to the first day of the next month
    endDate.setDate(0); // Set to the last day of the previous month

    startDate.setHours(startDate.getUTCHours() + 8);
    endDate.setHours(startDate.getUTCHours() + 8);

    startDate = startDate.toISOString().split('T')[0];
    endDate = endDate.toISOString().split('T')[0];

    monthRanges.push({
      start_date: new Date(startDate),
      end_date: new Date(endDate)  //i.e of return is 
    });

    /* EXAMPLE OF RETURN, HENCE WHEN MATCH NEED TO INCLUDE GTE AND LTE
      WHEN WE PUSH TO DB, THE DATE IS IN THE SAME FORMAT WHERE WE DONT CARE ABOUT TIME
    { 
    start_date: 2023-04-01T00:00:00.000Z,
    end_date: 2023-04-30T00:00:00.000Z
    }*/
  }

  return monthRanges;
}

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
        return [{_id: 0, totalSpend:0},{_id: 1, totalSpend:0},{_id: 2, totalSpend:0}]; // Return 0 if no documents match the date range
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
  

function getMonth(index){
  const monthName = ['Jan', 'Feb', 'Mar', 'Apr', 'May' , 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

  return monthName[index]
}

export async function getExpenseForPastYear(_username) {
  const monthsArray = getMonthRanges(); // Assuming getMonthRanges() returns an array of month objects

  // Use map to create an array of promises
  const promises = monthsArray.map(async (month) => {
    try {
      const expenses = await sumExpensesForDateRange(_username, month.start_date, month.end_date);
      let total = 0;

      const expensesForMonth = expenses.map(expense => {
        total += expense.totalSpend;
        if (expense._id === 0) {
          return { y: expense.totalSpend, label: getMonth(month.start_date.getMonth()) };
        }
        return null;
      }).filter(e => e); // Remove nulls

      // Return an object with both expenses and total for the month
      return { expensesForMonth, total: { y: total, label: getMonth(month.start_date.getMonth()) } };
    } catch (e) {
      console.error(e);
      throw new Error("Error at getExpenseForPastYear for sumExpensesForDateRange:\n" + e);
    }
  });

  // Wait for all promises to resolve
  const results = await Promise.all(promises);

  // Separate totals and expenses based on the results, maintaining the order
  const totalArray = results.map(result => result.total);
  const expensesArray = results.flatMap(result => result.expensesForMonth);

  const data = [{
    type: "spline",
    name: "Total Expenses",
    showInLegend: true,
    dataPoints: totalArray
  }, {
    type: "spline",
    name: "Petrol Expenses",
    showInLegend: true,
    dataPoints: expensesArray
  }];
  
  return data;
}


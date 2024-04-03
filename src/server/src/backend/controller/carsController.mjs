/** To get the list of model for a specific car make
 *
 * @param {*} makeID the ID of the car make
 * @returns a hmtl string containing the list of model for a specific make
 */
export async function getListOfModels(makeID) {
  try { 
    const importPath = `../database/car/models/${makeID}.js`;

    const { default: models } = await import(importPath); // default : models since we are importing a string
 
    //console.log(models); // DEBUGGING

    return models;
  } catch (e) {
    throw new Error("Error at getListOfModels:\n", e);
  }
}

// Function that gets the Car Fuel Consumption for a specific model
// return the json object.

/** To get the car fuel consumption of a specific model
 *
 * @param {*} makeID the ID of the make of the car
 * @param {*} modelID the ID of the model of the car
 * @returns a float with the value of the fuel consumption of the car
 */
export async function getCarFuelConsumption(makeID, modelID) {
  try {
    const res = await fetch(
      "https://vrl.lta.gov.sg/lta/vrl/action/ajaxLoadFuelCostCalculatorAction?FUNCTION_ID=F2305001ET&car1MakeCd=" +
        makeID +
        "&car1ModelCd=" +
        modelID +
        "&typ=getCO2FuelEconomyData"
    );

    const data = await res.json();

    console.log(data); // DEBUGGING
    return data;
  } catch (e) {
    throw new Error("Error at getCarFuelConsumption:\n", e);
  }
}

// Function that get the name of the model
// return a the model name in String

/** To get the name of the model
 *
 * @param {*} makeID the ID of the make of the car
 * @param {*} modelID the ID of the model of the car
 * @returns a string containing the name of the model
 */
export async function getNameOfModel(makeID, modelID) {
  try {
    const importPath = `../database/car/models/${makeID}.js`;

    const module = await import(importPath);
    const htmlListOfModels = module.default;

    // Parse the HTML string
    const { JSDOM } = await import("jsdom");
    const dom = new JSDOM(htmlListOfModels);
    const htmlDoc = dom.window.document;

    // Find the option with a specific value
    const document = htmlDoc.querySelector(`option[value="${modelID}"]`);

    if (!document) {
      throw new Error("Car Model Name not found");
    }

    return document.textContent;
  } catch (e) {
    throw new Error("Error at getNameOfModel:\n", e);
  }
}

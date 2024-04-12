import { JSDOM } from "jsdom";
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
    console.log(`Retrieving model data for makeID: ${makeID}, modelID: ${modelID}`);
    const importPath = `../database/car/models/${makeID}.js`;
    
    // Attempt to dynamically import the car model data
    const module = await import(importPath);
    const htmlListOfModels = module.default;

    // Dynamically import JSDOM only if needed
    const dom = new JSDOM(htmlListOfModels);
    const htmlDoc = dom.window.document;

    // Find the option with a specific value
    const optionElement = htmlDoc.querySelector(`option[value="${modelID}"]`);

    if (!optionElement) {
      console.error("Car model not found for the provided modelID:", modelID);
      throw new Error("Car Model Name not found");
    }

    return optionElement.textContent;
  } catch (e) {
    console.error("Error at getNameOfModel:", e);
    // Consider logging this error to a central logging service if this is a production environment
    throw new Error(`Error retrieving car model name: ${e.message}`);
  }
}

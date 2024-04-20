const UserInformation = "UserInformation";

// have a method to check the strength of the password
// have a method to ensure that a username does not contain any XSS


function isStrongPassword(password) {
  // Check if the password length is more than 7
  if (password.length <= 7) {
      return false;
  }
  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
      return false;
  }
  // Check for at least one lowercase letter
  if (!/[a-z]/.test(password)) {
      return false;
  }
  // Check for at least one digit
  if (!/[0-9]/.test(password)) {
      return false;
  }
  // Check for at least one special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return false;
  }
  return true;
}

/** To get the user particulars
 *
 * @param {*} _username the username of the user
 * @returns a js object
 */
export async function getUserDetail(_username) {
  try {
    const { findOneDocument } = await import("../database/database.mjs");
    if (!findOneDocument) {
      throw new Error("findDocument can not be imported");
    }
    const user = await findOneDocument(UserInformation, {
      username: _username,
    });
    return user;
  } catch (e) {
    throw new Error("Error at getUserDetail:\n", e);
  }
}

/** Check if the inputted username and password is in the DB
 *
 * @param {*} _username the username of the user
 * @param {*} _password the password of the user
 * @returns 1 / found else return the message
 */
export async function login(_username, _password) {
  try {
    const user = await getUserDetail(_username);

    if (!user) return "Username not found";

    if (user.password === _password) return 1;
    else {
      return "Wrong password";
    }
  } catch (e) {
    throw new Error("Error at login:\n", e);
  }
}

async function getNameAndFuelConsumption(_carMakeID, _carModelID) {
  try {
    const { getCarFuelConsumption, getNameOfModel } = await import(
      "./carsController.mjs"
    );

    const carName = await getNameOfModel(_carMakeID, _carModelID);

    const carFuelConsumption = await getCarFuelConsumption(
      _carMakeID,
      _carModelID
    );
    console.log([carName, carFuelConsumption.carOneElecEnergyConsumed]);
    return [carName, carFuelConsumption.carOneElecEnergyConsumed];
  } catch (e) {
    throw new Error("Error at getNameAndFuelConsumption:\n", e);
  }
}

/** Update the user information
 *
 * @param {*} document a js object following the format from user.txt
 * @returns
 */
export async function editUserInfo(document) {
  try {
    const { upsertDocument } = await import("../database/database.mjs");

    const nameAndFuelCons = await getNameAndFuelConsumption(
      document.carMakeID,
      document.carModelID
    );
    
    const user = await upsertDocument(
      UserInformation,
      {
        username: document.username,
      },
      {
        $set: {
          password: document.password,
          carMakeID: document.carMakeID,
          carModelID: document.carModelID,
          carName: nameAndFuelCons[0],
          carFuelConsumption: nameAndFuelCons[1],
        },
      },
      true
    );

    console.log(user);
    return user;
  } catch (e) {
    throw new Error("Error at editUserInfo:\n", e);
  }
}
/** To create a new user
 *
 * @param {*} newDocument a js object that contains all the particulars of the user required. Refer to user.txt
 * @returns 0 / username is already taken, 1 / successfully registered.
 */
export async function signup(newDocument) {
  try {

    const { documentCount } = await import("../database/database.mjs");

    const isUserNameUnique = await documentCount(UserInformation, {
      username: newDocument.username,
    });
    if (isUserNameUnique > 0) return 0;

    if (!isStrongPassword(newDocument.password)) return -1; 

   await editUserInfo(newDocument);
    return 1;
  } catch (e) {
    throw new Error("Error at signup:\n", e);
  }
}

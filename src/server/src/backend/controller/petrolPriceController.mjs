export async function getPetrolPrice(username, distanceTravalled, fuelPrice, twoWay, numOfDays){
    try{ 
        const { getUserDetail } = await import("./userController.mjs");
        const userDetails = await getUserDetail(username);
        const fuelConsumption = userDetails.carFuelConsumption

        const oneDayPrice = (distanceTravalled/100) * fuelPrice * fuelConsumption; 

        let total; 
        
        if (twoWay){
            total = oneDayPrice * 2 * numOfDays;
        }
        else{
            total = oneDayPrice * numOfDays
        }

        return total; 
    }catch(e){
            console.error("Error at getPetrolPrice", e)
            throw new Error("Error at getPetrolPrice")
    }
}
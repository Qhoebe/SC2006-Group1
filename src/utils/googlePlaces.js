
 export async function facilityLocator(lat, lng, facilityType,range) {
  try {
    // Construct the search URL
    const searchParams = new URLSearchParams({
      location: `${lat},${lng}`,
      key: "AIzaSyBQIjmVOaNYjue75PAQmy49Urzr0PnCtrw",
      query: facilityType,
    });

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?${searchParams.toString()}`;


    // Fetch data from the Google Maps API
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?${searchParams.toString()}`, {
      method: "POST",
    })
  
    const data = await response.json();
    console.log("asas");
    console.log(data);
    // Error handling
    if (data.status === "REQUEST_DENIED") {
      return { status: "REQUEST_DENIED", error_message: data.error_message };
    }

    // Process successful results
    if (data.status === "OK") {
      const results = data.results.map((result) => {

        return {
          formatted_address: result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          name: result.name,
        };
      });
      return { status: "OK", results };
    }

    // Catch any other errors
  } catch (error) {
    return { status: "REQUEST_DENIED", error_message: "Error" };
  }
}


export async function test(x){
 console.log(x)

 return {message: x}
}

// async function main() {
//   const latlng = "1.347169 103.680133";

//   //replace space with ,
//   // const latlngArray = latlng.split(" ").join(",")

//   const response = await facilityLocator(
//     1.347169,
//     103.680133,
//     "Petrol Station",
//   );

//   for (const result of response.results) {
//     console.log(result.name);
//     console.log(result.formatted_address);
//   }
// }

// main();

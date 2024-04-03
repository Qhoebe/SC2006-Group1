"use client";
import { useEffect,useState } from 'react'

function SignupView() {
  const [selectedCarBrand, setSelectedCarBrand] = useState('');
  const[selectedCarModel, setSelectedCarModel] = useState('');

  //get carModels from server depending on selectedCarBrand
  const [carModels, setCarModels] = useState('');

  //request server for list of model for selected brand
  useEffect(() => {
    if(selectedCarBrand==="") setCarModels([]);
    console.log(selectedCarBrand);
    const fetchData = async () => {
      const response = await fetchPut('/user/signup', { carMakeID: selectedCarBrand });

      if (response && response.listofModels){
        
      await setCarModels(parseCarOptions(response.listofModels) );
      }else setCarModels([]);
    };
fetchData();

  },[selectedCarBrand])
  

  
  
  const onCarBrandChange = (event) => {
    setSelectedCarBrand(event.target.value);
  };
  const onCarModelChange = (event) => {
    setSelectedCarModel(event.target.value);
    
  };


  async function handleSubmit(event){
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(event.target); // Get the form data
    const submitData = Object.fromEntries(formData); // Convert FormData to object
    submitData.carMakeID=selectedCarBrand;
    submitData.carModelID=selectedCarModel;
console.log(submitData)
    try {
        const response = await fetch('user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submitData), // Convert the object to JSON string
        }).then((response) => response.json()).then((data) => console.log(data));

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        // Handle success, e.g., show a success message or redirect to a new page
    } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error, e.g., show an error message
    }
}
  
  const carBrands=parseCarOptions(carMakesString)
  
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Signup</h1>
        <form onSubmit={handleSubmit} className="w-1/4 mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input type="text" placeholder="Name" required minLength="2" maxLength="30" pattern="[a-zA-Z0-9]+" name="username" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div className="mb-4">
                    <label  className="block text-gray-700">Password:</label>
                    <input type="password" placeholder="Password" required minLength="2" maxLength="30" name="password" className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>

                <div className="mb-4">
                  <h1>Car Brand:</h1>
        <select value={selectedCarBrand} onChange={onCarBrandChange} className="block w-full px-3 py-2 border rounded-md shadow-sm">
        {carBrands.map((carBrand) => (
        <option key={carBrand.value} value={carBrand.value}>
          {carBrand.name}
        </option>
      ))}
    </select>
    </div>

    <div className="mb-4">
                  <h1>Car Model:</h1>
    <select value={selectedCarModel} onChange={onCarModelChange} className="block w-full px-3 py-2 border rounded-md shadow-sm">
        {carModels&&carModels.map((carModel) => (
        <option key={carModel.value} value={carModel.value}>
          {carModel.name}
        </option>
      ))}
    </select>
    </div>
                <div className="pt-7">
                    <input type="submit" 
                    className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:text-sm" />
                   
                </div>

            </form>

       

        
      </div>
    )
  
}

const fetchPut = async (url, body) => {
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const responseData = await response.json();
 
    return (responseData);
  } catch (error) {
    console.error('Error:', error);
  }
};

 const carMakesString = `
      <option value="">Select Car Brand</option>
      <option value="A13">ALFA ROMEO</option>
      <option value="A90">ALPINA</option>
      <option value="A15">ALPINE</option>
      <option value="A33">ASTON MARTIN</option>
      <option value="A38">AUDI</option>
      <option value="B16">B.M.W.</option>
      <option value="B07">BENTLEY</option>
      <option value="B80">BLUECAR</option>
      <option value="B74">BYD</option>
      <option value="C16">CHRYSLER</option>
      <option value="C19">CITROEN</option>
      <option value="D52">DFSK</option>
      <option value="F05">FERRARI</option>
      <option value="F06">FIAT</option>
      <option value="F15">FORD</option>
      <option value="F43">FOTON</option>
      <option value="G53">GAC</option>
      <option value="G52">GREAT WALL</option>
      <option value="H67">HIGER</option>
      <option value="H16">HONDA</option>
      <option value="H43">HYUNDAI</option>
      <option value="I30">INFINITI</option>
      <option value="I12">ISUZU</option>
      <option value="J01">JAGUAR</option>
      <option value="J05">JEEP</option>
      <option value="K20">KIA</option>
      <option value="K38">KOENIGSEGG</option>
      <option value="L02">LAMBORGHINI</option>
      <option value="L07">LAND ROVER</option>
      <option value="L20">LOTUS</option>
      <option value="M24">M.G.</option>
      <option value="M68">MAN</option>
      <option value="M12">MASERATI</option>
      <option value="MA1">MAXUS</option>
      <option value="M17">MAZDA</option>
      <option value="M97">MCLAREN</option>
      <option value="M20">MERCEDES BENZ</option>
      <option value="M84">MINI</option>
      <option value="M31">MITSUBISHI</option>
      <option value="M39">MORGAN</option>
      <option value="N06">NISSAN</option>
      <option value="O18">OHM</option>
      <option value="O05">OPEL</option>
      <option value="P57">PERODUA</option>
      <option value="P12">PEUGEOT</option>
      <option value="P64">POLESTAR</option>
      <option value="P20">PORSCHE</option>
      <option value="R08">RENAULT</option>
      <option value="R16">ROLLS ROYCE</option>
      <option value="S13">SEAT</option>
      <option value="SC9">SERES</option>
      <option value="SC6">SHINERAY</option>
      <option value="S26">SKODA</option>
      <option value="SC5">SOKON</option>
      <option value="SD2">SRM</option>
      <option value="S95">SSANGYONG</option>
      <option value="S42">SUBARU</option>
      <option value="S45">SUZUKI</option>
      <option value="T74">TESLA</option>
      <option value="T15">TOYOTA</option>
      <option value="V19">VOLKSWAGEN</option>
      <option value="V20">VOLVO</option>
`;
function parseCarOptions(carMakesString) {

if (typeof carMakesString !== 'string')
            return [];
  // Convert carMakesString into an array by splitting it
  const lines = carMakesString.split('\n');
  
  return lines.map((line) => {
    // Ensure line is not empty
    if (!line.trim()) {
      return null;
    }
    
    const [valuePart, namePart] = line
      .trim()
      .replace("<option value=", "")
      .replace("</option>", "")
      .split(">")
      .filter(Boolean);

    // Ensure both valuePart and namePart are not empty
    if (!valuePart || !namePart) {
      return null;
    }

    const value = valuePart.replace(/"/g, "");
    const name = namePart.trim();

    return { value, name };
  }).filter(Boolean); // Filter out any null values
}


export default SignupView
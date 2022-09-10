import Country from "./country.js";
const allCountries_ar = []

export const createStartCountries = (_ar) => { 
  // copy array
  allCountries_ar.splice(0,_ar.length,..._ar); 
  console.log(_ar)
  let startPage_ar = ["israel","united states","france","united kingdom","thailand"];
  startPage_ar = _ar.filter(item => startPage_ar.includes(item.name.common.toLowerCase()))
  document.querySelector("#id_loading").classList.add("d-none");
  startPage_ar.forEach(item => {
        let country = new Country("#id_parent",item,createCountriesByName,displayBorderName);
        country.render();
      })
      document.querySelector("#up_control").classList.remove("d-none");
}

export const createCountries = input => { 
  let arr = allCountries_ar.filter(item => item.name.common.toLowerCase().includes(input.toLowerCase()) ||
  item.cca3.toLowerCase().includes(input.toLowerCase()) ||item.cca2.toLowerCase().includes(input.toLowerCase()) );
  // cca2
  document.querySelector("#id_parent").innerHTML = "";
  if(arr.length!=0){
    arr.forEach(item => {
      let country = new Country("#id_parent",item,createCountriesByName,displayBorderName);
      country.render();
    })
    document.querySelector("#id_loading").classList.add("d-none");
    document.querySelector("#up_control").classList.remove("d-none");
  }
  else{
    document.querySelector("#id_loading").classList.add("d-none");
    document.querySelector("#up_control").classList.add("d-none");
    document.querySelector("#id_parent").innerHTML = `
    <h4>Not found valid countries...</h4>
  `
  }
  // up_control
} 

/** get country code return full name */
export const displayBorderName = async (code) => {
  let url = `https://restcountries.com/v3.1/alpha/${code.toLowerCase()}`;
  let resp = await fetch(url);
  let data = await resp.json();
  // console.log(data)
  let { name } = data[0];
  // console.log(name.common)
  return name.common;
}
/** get name of country and render single country */
export const createCountriesByName = async name => {
  console.log(name);
  let url = `https://restcountries.com/v3.1/name/${name.toLowerCase()}`;
  let resp = await fetch(url);
  let data = await resp.json();
  console.log(data)
  document.querySelector("#id_parent").innerHTML ="";
  let country = new Country("#id_parent",data[0],createCountriesByName,displayBorderName);
  country.singleRender();
}
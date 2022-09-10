import { createStartCountries } from "./countriesManger.js";
import { declareEvents } from "./viewEvents.js";

const init = () => { 
    doApi();
    declareEvents();
}

const doApi = async() => {
  document.querySelector("#id_loading").classList.remove("d-none");
  document.querySelector("#up_control").classList.add("d-none");
    let url = "https://restcountries.com/v3.1/all";
    let resp = await fetch(url);
    let data = await resp.json();
    createStartCountries(data);
  }

init();
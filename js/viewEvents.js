import { createCountries, createCountriesByName, checkLocalStorage, doApi } from "./countriesManger.js";

export const declareEvents = () => {
    let search = document.querySelector("#search-input");
    let logo = document.querySelector("#logo");
    let search_btn = document.querySelector("#search-button");
    let usa_li = document.querySelector("#usa_header")
    let israel_li = document.querySelector("#israel_header")
    let france_li = document.querySelector("#france_header")
    let uk_li = document.querySelector("#uk_header")
    let thailand_li = document.querySelector("#thailand_header")
    search.addEventListener("keypress", (e) => {
        console.log(e.key)
        if (e.key === "Enter") {
            document.querySelector("#id_loading").classList.remove("d-none");
            document.querySelector("#up_control").classList.add("d-none");
            createCountries(search.value)
        }
    })
    search_btn.addEventListener("click", () => {
        document.querySelector("#up_control").classList.add("d-none");
        document.querySelector("#id_loading").classList.remove("d-none");
        createCountries(search.value);
    })
    // need to change all
    usa_li.addEventListener("click", () => {
        // window.open(`pages/singleCountry.html?name=United States`, "_self");
        createCountriesByName("United%20States%20of%20America")
    })
    israel_li.addEventListener("click", () => {
        // window.open(`pages/singleCountry.html?name=israel`, "_self");
        createCountriesByName("israel")
    })
    thailand_li.addEventListener("click", () => {
        // window.open(`pages/singleCountry.html?name=thailand`, "_self");
        createCountriesByName("thailand")

    })
    uk_li.addEventListener("click", () => {
        // window.open(`pages/singleCountry.html?name=United Kingdom`, "_self");
        createCountriesByName("united kingdom");
    })
    france_li.addEventListener("click", () => {
        // window.open(`pages/singleCountry.html?name=france`, "_self");
        createCountriesByName("france");
    })
    logo.addEventListener("click", () => {
        localStorage.setItem("lastS", "");
        checkLocalStorage();
        doApi();
        document.querySelector("#search-input").value = "";
    })
}
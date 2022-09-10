export default class Country {
    constructor(_parent, _item,_createCountriesByName,_displayBorderName,_createCountries,_lastS) {
        // functions
        this.createCountriesByName = _createCountriesByName;
        this.displayBorderName = _displayBorderName;
        this.createCountries = _createCountries;

        this.lastS = _lastS;
        this.parent = _parent;
        this.image = _item.flags.png;
        this.name = _item.name.common;
        this.capital = _item.capital;
        this.population = `${(Math.floor((_item.population / 1000000) * 1000) / 1000).toLocaleString()}M`;
        if(_item.currencies != null){
            const currencyArray = Object.values(_item.currencies);
            this.currencies = `${currencyArray[0].name} ${currencyArray[0].symbol}`;
        }
        if(_item.languages != null){
            const languages_ar = Object.values(_item.languages);
            this.languages = languages_ar.join();
        }
        this.borders_ar = _item.borders;
        this.region = _item.region;
        this.lat = _item.latlng[0];
        this.lon = _item.latlng[1];
    }
    render() {
        let myDiv = document.createElement("div");
        // row-cols-1 row-cols-lg-3 row-cols-sm-2 g-3
        myDiv.className = "box col-lg-4 col-sm-6 p-2";
        document.querySelector(this.parent).append(myDiv);
        myDiv.innerHTML += `
        <div class="card border border-primary h-100 m-0">
        <div class="card-image">
            <img src="${this.image}" class="overflow-hidden"
                alt="name" width="100%" height="100%">
        </div>
         <div class="card-body mx-auto">
            <h6 class="card-title">Country : ${this.name}</h6>
            <p class="card-text">Capital : ${this.capital}</p>
          </div>
       </div>
        `
        myDiv.addEventListener("click", () => {
            // fix the bug of america
            if(this.name === "United States"){
                this.name = "United%20States%20of%20America";
            }
            // send name to build finction
            this.createCountriesByName(this.name);
        })
    }
    singleRender() {
        let div = document.createElement("div");
        div.className = "card mb-3 mx-auto p-3";
        div.style = "max-width: 800px;";
        document.querySelector(this.parent).append(div);
        div.innerHTML = `
          <div class="row g-0">
          <div class="col-md-6">
            <img src="${this.image}" class="img-fluid rounded-start border border-dark" alt="${this.name}" width="100%">
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title m-0">${this.name}</h5>
              <p class="card-text">Population : ${this.population}</p>
              <p class="card-text">Region : ${this.region}</p>
              <p class="card-text">Languages : ${this.languages}</p>
              <p class="card-text">Coin : ${this.currencies}</p>
              <p class="card-text">Capital : ${this.capital}</p>
            </div>
          </div>
          <div class="mapAndBoreders row mt-3 p-2">
          <div class="map col-md-6"></div>
            <div class="borders col-md-6"></div>
          </div>
        </div>
        <div className="controls row p-2">
         <button class="backMain_btn btn btn-primary" title="home"><i class="fa fa-home" aria-hidden="true"></i></button>
        </div>
          `
          document.querySelector(".map").innerHTML = `
          <iframe 
          width="300" 
          height="170" 
          frameborder="0" 
          scrolling="no" 
          allowfullscreen  
          src="https://maps.google.com/maps?q=${this.lat},${this.lon}&hl=en&z=5&amp;output=embed"
         >
         </iframe>
          `
          let borders = div.querySelector(".borders");
          if (this.borders_ar) {
            this.borders_ar.forEach(async (item, i) => {
              if(i === 0){
                borders.innerHTML += `Borders : `
              }
              // wait for data reloaded
              const CountryName = await this.displayBorderName(item)
              let border = document.createElement("span");
              border.className = "neighbors"
              border.style = "cursor: pointer;";
              border.innerHTML = `${CountryName}  `;
              borders.append(border);
              border.addEventListener("click", () => {
                // window.open(`singleCountry.html?name=${CountryName}`, "_self")
                this.createCountriesByName(CountryName);
              })
            })
          }    
          let btn_backMain = div.querySelector(".backMain_btn");
          btn_backMain.addEventListener("click", () => {
            this.createCountries(this.lastS);
          })
    }


}
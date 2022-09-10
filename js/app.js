import { checkLocalStorage, doApi } from "./countriesManger.js";
import { declareEvents } from "./viewEvents.js";

const init = () => {
  checkLocalStorage();
  doApi();
  declareEvents();
}



init();
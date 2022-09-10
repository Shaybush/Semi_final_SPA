import { checkLocalStorage } from "./countriesManger.js";
import { declareEvents } from "./viewEvents.js";

const init = () => {
  checkLocalStorage();
  declareEvents();
}



init();
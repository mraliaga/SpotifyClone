//Api classini import etdik,classin ornegini aldik

import { API } from "./api.js";
import { UI } from "./ui.js";

//ui kopyasi
const ui = new UI();
//api kopyasi
const api = new API();

document.addEventListener("DOMContentLoaded", () => {
  //Loaderi render et
  ui.renderLoader();
  //Api a istek at ve gelen verilerle ekrana kart render et

  api
    .getPopular()
    .then((data) => ui.renderCards(data))
    .catch((err) => {
      console.log("Hataaaa:", err);
      alert("Uzgunuz h olustui");
    });
});

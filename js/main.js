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

//Formun gonderilme olayini izle

ui.form.addEventListener("submit", (e) => {
  //Form gonderildiginde sayfa yenilemeyi engelle
  e.preventDefault();
  //input daki arama parametresine eris
  const query = e.target[0].value;
  //aratilan kelime yoksa fonk durdur.Bu sayede api hakkimizi bosa harcamadik.

  if (query.trim() === "")
    return alert("Lutfen gecerli arama islemi gerceklestiriniz.");
  //Loaderi render et
  ui.renderLoader();

  //Basligi guncelle
  ui.updateTitle("results for " + query);

  //Api ye aratilan kelimeyle istek at
  api
    .searchMusic(query)

    //Gelen sarki verileriyle ekrana kart render et
    .then((data) => ui.renderCards(data))
    //Hata varsa yakala ve uyari ver
    .catch((err) => {
      alert("Islem Gerceklestirilemedi");
      console.log(err);
    });
});

//Liste alaninda gerceklesen tiklanma molay.arini izle

ui.list.addEventListener("click", (e) => {
  console.log("tt");
  //Eger play classina sahip bir elemana tiklandi ise sarki calma islemini gerceklestir.
  if (e.target.className === "play") {
    console.log("Playa tiklandi");
  }
});

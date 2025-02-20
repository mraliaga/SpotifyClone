//Api classini import etdik,classin ornegini aldik
import { API } from "./api.js";
import { UI } from "./ui.js";

//ui kopyasi
const ui = new UI();
//api kopyasi
const api = new API();

document.addEventListener("DOMContentLoaded", () => {
  // Logo tıklama olayını ekle
  const logo = document.querySelector("#logo");
  logo.addEventListener("click", () => {
    // Ana sayfaya dön
    ui.renderCards(null);
    ui.updateTitle("Popular Music");
  });

  // Başlangıçta boş playlist mesajını göster
  ui.renderCards(null);
});

//Form submit olayını dinle
ui.form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = e.target[0].value;

  if (!query.trim()) {
    return alert("Lütfen geçerli bir arama yapın");
  }

  try {
    // Loaderi göster
    ui.renderLoader();

    // Başlığı güncelle
    ui.updateTitle(`"${query}" için sonuçlar`);

    // API'den arama sonuçlarını al
    const data = await api.searchMusic(query);

    // Sonuçları ekrana bas
    ui.renderCards(data);
  } catch (err) {
    console.log(err);
    alert("Arama sırasında bir hata oluştu");
  }
});

//Liste alanindaki tıklanma olaylarını izle
ui.list.addEventListener("click", (e) => {
  if (e.target.closest(".play")) {
    const card = e.target.closest(".card");
    const data = card.dataset;
    ui.renderPlayer(data);
  }
});

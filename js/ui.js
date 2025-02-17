export class UI {
  //kurucu metod
  constructor() {
    this.list = document.querySelector(".list");
    this.form = document.querySelector("form");
    this.title = document.querySelector("#title");
  }

  // Ekrana muzik karti render eden fonksyon

  renderCards(songs) {
    //Oncesinde list kismindaki html i temizle
    this.list.innerHTML = "";

    //Her muzik verisi icin ekrana bir html olustur
    songs.forEach((song) => {
      //Card olustur
      const card = document.createElement("div");
      //Carda class ekle
      card.className = "card";
      //Card elemanini sarki verilerini aktar
      card.dataset.title = song.title;
      card.dataset.subtitle = song.subtitle;
      card.dataset.img = song.images.coverarthq;
      card.dataset.mp3 = song.hub.actions[1].uri;

      //Cardin icerigini belirle
      card.innerHTML = `
        <figure>
                <img
                  src="${song.images.coverarthq}"
                  alt=""
                />
                <div class="play">
                  <i class="bi bi-play-fill"></i>
                </div>
              </figure>


              <div class="card-info">
                <h4>${song.title}</h4>
                <h4>${song.subtitle}</h4>
              </div>`;
      //cardi html icerisine yerlestir
      this.list.appendChild(card);
    });
  }
  //Ekrana loader eden fonk
  renderLoader() {
    this.list.innerHTML = `
  <!-- From Uiverse.io by mrhyddenn --> 
<div class="spinner">
    <div class="spinnerin"></div>
</div>
`;
  }

  //Arama islemi sonucunda baslik kismini guncelleyen fonk.

  updateTitle(text) {
    this.title.textContent = text;
  }
}

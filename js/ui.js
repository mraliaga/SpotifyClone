export class UI {
  //kurucu metod
  constructor() {
    this.list = document.querySelector(".list");
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

      //Cardin icerigini belirle
      card.innerHTML = `
        <figure>
                <img
                  src="./img:gif/ab67616d0000b273d5568dedd90ea5dcc0fd063a.jpeg"
                  alt=""
                />
                <div class="play">
                  <i class="bi bi-play-fill"></i>
                </div>
              </figure>


              <div class="card-info">
                <h4>Rumors</h4>
                <h4>NEFFEX</h4>
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
}

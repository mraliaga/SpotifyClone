export class UI {
  //kurucu metod
  constructor() {
    this.list = document.querySelector(".list");
    this.form = document.querySelector("form");
    this.title = document.querySelector("#title");
    this.player = document.querySelector(".player");

    // Başlangıçta player'ı gizle
    this.player.classList.remove("active");
  }

  // Ekrana muzik karti render eden fonksyon

  renderCards(data) {
    this.list.innerHTML = "";

    // Eğer data yoksa playlist mesajını göster
    if (!data) {
      this.list.innerHTML = `
        <div class="empty-playlist">
          <i class="bi bi-music-note-list"></i>
          <h3>Kayıtlı Playlistiniz Yok</h3>
          <p>
            <i class="bi bi-plus-circle"></i>
            Beğendiğiniz müzikleri playlistinize ekleyerek müzik deneyiminizi iyileştirin
          </p>
        </div>
      `;
      return;
    }

    // Eğer arama sonucu boşsa
    if (data.length === 0) {
      this.list.innerHTML = `
        <div class="empty-playlist">
          <i class="bi bi-emoji-frown"></i>
          <h3>Sonuç Bulunamadı</h3>
          <p>Farklı bir arama yapmayı deneyin</p>
        </div>
      `;
      return;
    }

    // Loading animasyonu
    this.renderLoader();

    // Kartları oluştur
    setTimeout(() => {
      this.list.innerHTML = "";

      data.forEach((song) => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
          <figure>
            <img src="${song.images?.coverart || "default-image.jpg"}" />
            <div class="play">
              <i class="bi bi-play-fill"></i>
            </div>
          </figure>
          <div class="card-info">
            <h4>${song.title || "Başlıksız"}</h4>
            <h4>${song.subtitle || "Sanatçı bilgisi yok"}</h4>
          </div>
        `;

        // Dataset'e müzik bilgilerini ekle
        div.dataset.url = song.hub?.actions?.[1]?.uri || "";
        div.dataset.title = song.title || "";
        div.dataset.img = song.images?.coverart || "";
        div.dataset.subtitle = song.subtitle || "";

        this.list.appendChild(div);
      });
    }, 800);
  }
  //Ekrana loader eden fonk
  renderLoader() {
    this.list.innerHTML = `
      <div class="loading-wrapper">
        <div class="modern-loader">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
        <p>Yükleniyor...</p>
      </div>
    `;
  }

  //Arama islemi sonucunda baslik kismini guncelleyen fonk.

  updateTitle(text) {
    this.title.textContent = text;
  }

  sliceText(text) {
    if (text) {
      return text.slice(0, 16) + "...";
    }
    return text;
  }

  //Oynatma alanini guncelleyen fonk.

  renderPlayer(song) {
    // Player'ı aktif et
    this.player.classList.add("active");

    this.player.innerHTML = `
      <div class="player-inner">
        <!-- Sol: Şarkı Bilgileri -->
        <div class="info">
          <img src="${song.img}" alt="" />
          <div class="song-info">
            <h5>${song.title}</h5>
            <p>${song.subtitle || ""}</p>
          </div>
          <i class="bi bi-heart"></i>
        </div>

        <!-- Orta: Kontroller -->
        <div class="controls">
          <div class="control-buttons">
            <i class="bi bi-shuffle"></i>
            <i class="bi bi-skip-start-fill"></i>
            <button class="play-btn">
              <i class="bi bi-pause-circle-fill"></i>
            </button>
            <i class="bi bi-skip-end-fill"></i>
            <i class="bi bi-repeat"></i>
          </div>
          <div class="progress-area">
            <span>0:00</span>
            <div class="progress-bar">
              <div class="progress"></div>
            </div>
            <span>3:45</span>
          </div>
        </div>

        <!-- Sağ: Ses Kontrolleri -->
        <div class="volume-controls">
          <i class="bi bi-mic"></i>
          <i class="bi bi-collection"></i>
          <i class="bi bi-volume-up"></i>
          <div class="volume-bar">
            <div class="volume"></div>
          </div>
        </div>

        <audio src="${song.url}"></audio>
      </div>
    `;

    const audio = this.player.querySelector("audio");
    const playBtn = this.player.querySelector(".play-btn");
    const progress = this.player.querySelector(".progress");
    const volume = this.player.querySelector(".volume");

    // Otomatik oynatma ve play butonu güncelleme
    const playAudio = () => {
      audio.play();
      playBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
      // Resmi döndürme animasyonunu başlat
      this.player.querySelector(".info img").classList.add("animate");
    };

    const pauseAudio = () => {
      audio.pause();
      playBtn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
      // Resmi döndürme animasyonunu durdur
      this.player.querySelector(".info img").classList.remove("animate");
    };

    // Sayfa yüklendiğinde otomatik başlat
    audio.addEventListener("loadeddata", playAudio);

    // Play/Pause butonu kontrolü
    playBtn.addEventListener("click", () => {
      if (audio.paused) {
        playAudio();
      } else {
        pauseAudio();
      }
    });

    // Şarkı ilerledikçe progress barı güncelle
    audio.addEventListener("timeupdate", () => {
      const progressPercent = (audio.currentTime / audio.duration) * 100;
      progress.style.width = progressPercent + "%";
    });

    // Progress bar'a tıklama kontrolü
    const progressBar = this.player.querySelector(".progress-bar");
    progressBar.addEventListener("click", (e) => {
      const width = progressBar.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    });

    // Ses kontrolü
    volume.style.width = "100%";
    const volumeBar = this.player.querySelector(".volume-bar");
    volumeBar.addEventListener("click", (e) => {
      const volumePercent = e.offsetX / volumeBar.offsetWidth;
      audio.volume = volumePercent;
      volume.style.width = volumePercent * 100 + "%";
    });

    // Şarkı bittiğinde player'ı gizle
    audio.addEventListener("ended", () => {
      this.player.classList.remove("active");
      // Animasyonu durdur
      this.player.querySelector(".info img").classList.remove("animate");
    });
  }

  toggleAnimation() {
    const image = document.querySelector(".info img");
    image.classList.toggle("animate");
  }
}

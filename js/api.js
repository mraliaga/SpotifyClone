const url = "https://shazam.p.rapidapi.com/search?term=adele&locale=en-US";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "d626c81409msheedded755399591p1dceb6jsnfd10c7232bf8",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

export class API {
  //Constructor
  constructor() {
    this.url = "https://shazam.p.rapidapi.com/";
    this.options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "d626c81409msheedded755399591p1dceb6jsnfd10c7232bf8",
        "x-rapidapi-host": "shazam.p.rapidapi.com",
      },
    };
  }

  // Arama yapma isteği
  async searchMusic(query) {
    try {
      // Aynı searchMusics fonksiyonunu kullanalım çünkü o çalışıyor
      const url = `${this.url}search?term=${query}&locale=en-US`;
      const res = await fetch(url, this.options);

      if (!res.ok) {
        throw new Error("Arama başarısız oldu");
      }

      const data = await res.json();
      // Verinin içerisinde bulunan katmanlı yapıyı düzenle
      const formatted = data.tracks.hits.map((item) => item.track);
      return formatted;
    } catch (error) {
      console.log("API Hatası:", error);
      throw error;
    }
  }
}

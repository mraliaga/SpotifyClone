//Api url
const url =
  "https://shazam.p.rapidapi.com/search?term=kiss%20the%20rain&locale=en-US&limit=15";

//Headers ===>Apini bizi tamniyip verileri iletmesi icin gerekli obje
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "fa3c3e14d3msh064a40b1cc63e2ap1254c9jsn72eefac08091",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

export class API {
  //Populer muzikleri Apiden alan fonksiyon

  async getPopular() {
    //   //fetch ile urldden v erileri aldik sonra js nesnesine cevirdik devfaminda verinin icerisinde bulunan katmanli yapiyi duzenledik ve sarki verisine eristyik.
    //   const res = await fetch(url, options);
    //   const data = await res.json();

    //   const formatted = data.tracks.hits.map((item) => item.track);

    //   return formatted;

    const data = await this.searchMusic("timati");
    const data1 = await this.searchMusic("lahmacun");

    return [...data, ...data1];
  }
  //Aratilan kelimeye gore sarki verilerini alan fonksyon gir

  async searchMusic(query) {
    //Urli dinamik hale getirdik
    const url = `https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US`;
    //Simdi Apiye istek at
    const res = await fetch(url, options);
    // Gelen cevabi js nesnesine cevir
    const data = await res.json();
    //Apiden gelen verideki gereksiz kapsami formatlama
    console.log(data);
    const formatted = data.tracks.hits.map((item) => item.track);

    console.log(formatted);
    return formatted;
  }
}

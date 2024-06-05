/** tipi analiz  edip ona göre fonksiyonun çagırıldığı yere tipe denk gelen açıklamayı gönderir.*/
export const detecType = (type) => {
    switch(type ){
        case "park":
            console.log(type);
        return "park yeri";
        case "home":
            console.log(type);
    return "ev";
    case "job":
        console.log(type);
    return "iş";
    case "goto":
        console.log(type);
    return "ziyaret";
    }
}; //? export etcez yani ihraç etcez
//** local sroeage yı gğncelleyecek fonksiyon */
export const setStorage = (data) => {
    //* veriyi locale göndermek i.in stringe çevirme
   const strData = JSON.stringify(data);
   console.log(strData);
   //* locaStorage veriyi gönderdik (applicationdan bakabilirsin)
   localStorage.setItem("notes", strData);
};
// ** konsolda çıktı  stringe çevirmek için json kullanacaz


var carIcon = L.icon({
    iconUrl: "car.png",
    iconSize: [50,60],
});
var homeIcon = L.icon({
    iconUrl: "home-marker.png",
    iconSize: [50,60],
});
var jobIcon = L.icon({
    iconUrl: "job.png",
    iconSize: [50,60],
});
var visitIcon = L.icon({
    iconUrl: "visit.png",
    iconSize: [50,60],
});


export const detecIcon = (type) => {
    switch (type){
    case "park":
    return carIcon;
    case "home":
        return homeIcon;
        case "job":
        return jobIcon;
        case "goto":
        return visitIcon;

}
};
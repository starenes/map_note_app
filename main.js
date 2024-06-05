import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import {detecIcon,detecType, setStorage} from "./helpers.js";

//! html 'den gelenler
const form = document.querySelector("form");
const list = document.querySelector("ul");


//!---- OLAY İZLEYİCİLERİ -----
form.addEventListener("submit",handleSubmit);
list.addEventListener("click",handleClick);
//! ortak kullanım alanı;
var map;
//*dizi ;
var layerGroup = [];
var notes = JSON.parse(localStorage.getItem("notes")) || [];
//! localstorage de veri bastır yoksa veya yada || boş bir dizi getir.
var coords = [];

//! kullanıcının konumunu ögrenmek için getCurrentposition methodunu kullandık


navigator.geolocation.getCurrentPosition(loadMap,errorFunction);
function errorFunction(){
}
//* Haritaya tıklanınca çalışır.
function onMapClick(e) {
    //* haritaya tıkladığında form bileşenin display özelliğini flex yaptık ve tıklanıldığında ekle butonu çıktı.
    form.style.display = "flex";
    //* konsolda tıkladığımızda veriler gözültü
    //* haritada tıkladığımız yerin koordinatlarını aktarır.
    coords=[e.latlng.lat, e.latlng.lng];
}
//* Konum harita getirildi.
function loadMap (e) {
     //! konsoldan konumumuz için iki terimi alıp (e.coords.latitude,e.coords.longitude) alt koda yapıştırdık 
    //* 1 haritanın kurulumu
     map = L.map('map').setView([e.coords.latitude,e.coords.longitude], 13);
    L.control;
    //* 2 haritanın nasıl gözükeceği;
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//*3. haritada ekrana basılacak imleçleri tutacagımız katman
    layerGroup = L.layerGroup().addTo(map);

    //* Localden gelen notları listeleme 
    renderNoteList (notes);




//! konumumuz haritaya gözüktü ve click olayını ekleyeceğiz
//* haritada bir tıklanma oldugunda çalışacak.
map.on('click', onMapClick);
 }

 function renderMarker(item){

//Markerı oluşturur.
L.marker(item.coords,{icon:detecIcon(item.status)})
.addTo(layerGroup) // imleçleriolduğu katmana ekler.
.bindPopup(`${item.desc}`); //üzerine tıklanınca açılacak popup ekleme
 }


 function handleSubmit(e){
    e.preventDefault()  //* sayfanın yenilenmesini engeller.
    const desc = e.target[0].value; // formun içerisindeki text inputun değerini alma
    const date = e.target[1].value; // formun içerisindeki date inputunun değerini alma
    const status = e.target[2].value; // formun içerisindeki select yapısının degerini alma
   
    notes.push({
        id: uuidv4(),
        desc,
        date,
        status,
        coords,
    });


    //* local storage güncelle 
    setStorage(notes);
  //*renderNoteList fonksiyonuna parametre notes dizisini gönderdik 
    renderNoteList(notes);

//* form gönderildiğinde kapat
    form.style.display = "none";""
 }

 //* ekrana notları aktaracak fonksiyon
 function renderNoteList(item) {
    //* notlar(list) alanını temizle
    list.innerHTML="";
    //* markerleri temizler.
    layerGroup.clearLayers();
    //*herbir not için li etiketi oluşturur ve içerisini günceller.
    item.forEach((item) => {
        const listElement = document.createElement("li"); //* bir li etiketi oluşturur.
        listElement.dataset.id = item.id ; //* li etiketine data-id özelliği ekleme
        //*description güncelledik yerine item.desc yaptık */
        listElement.innerHTML =`
        <div>
        <p>${item.desc}</p>
        <p><span>Tarih:</span>${item.date}</p>
        <p><span>Durum:</span>${detecType(item.status)}</p>
    </div>
    <i class="bi bi-x-circle" id="delete"></i>
    <i class="bi bi-airplane" id="fly"></i>   
        ` ;
        
        list.insertAdjacentElement("afterbegin",listElement); 
        renderMarker(item);
    });
 }
// yukarıda ki list.appendChild(listElement);//* ekleme yöntemi 


//* not alanında tıklanma olayını izler
 function handleClick(e){
    //* güncellenecek elemanın id sini ögrenmek için  parentElement yöntemini kullandık
    const id = e.target.parentElement.dataset.id ;
    if (e.target.id === "delete"){
        //* id sini bildiğimiz elementin diziden filter yöntemi kullanarak kaldırdık
        notes = notes.filter((note) => note.id != id);
        console.log(notes);
        setStorage(notes); //* localstorge güncelle
        renderNoteList(notes); //*ekranı güncelle


        
    }
    if (e.target.id === "fly") {
        const note = notes.find ((note) => note.id ==id); //* tıkladığımız elemanın id ile dizi içerisindeki elemanlarından herhangi birinin idsi eşleşirse bul
        console.log(note);
        map.flyTo(note.coords);
        //* haritayı bulduğumuz elemana yönlendirmesi için flyto methodunu kullanır.
    }
 }
 //!! npmjs adresinden uuid aldık  import ettik script module ekledik ve benzersiz ıd oluşturduk.
 //!! şimdi yukarıda tanımlanan ortak kullanım alanına not dizi içerisinde obje şeklinde göndercez bunuda ; push yöntemiyle 
 //!! en çok kullanılan dizi yöntemleri 


/*  önemli git hupta güncelleme 
git add.
git commit -m "ismi yazacazz"
git push
*/ 

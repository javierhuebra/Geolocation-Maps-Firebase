let buttonCapture = document.querySelector(".boton-capturar");
let textoCoordenadas = document.getElementById("texto_coordenadas");
let lon;
let lat;
let acc;
let fecha;
let hora;
let hoy = new Date();
//para google maps
let map;
let marker;

let watchID;
let geoLoc;

function initMap(){
    const myLatLng = {lat:-38.717304,lng:-62.265307};
   
    map = new google.maps.Map(document.getElementById("map"), {
        center: myLatLng,
        zoom: 14,
        mapId: "bf8ebf6d0565e5fc",
        disableDefaultUI: true,
    });

    marker = new google.maps.Marker({
        
        map,
        icon: "images/mono_black.png"
    })
    ver();
      
}

function ver(){
    let i=0;
    let markers=[];
    let infoWindow=[];
    let posicionGrabar;
    

    db.collection("coordenadas").get().then((querySnapshot)=>{
        
        querySnapshot.forEach((doc)=>{
            posicionGrabar = {lat: doc.data().lat,lng: doc.data().lon};
            markers[i]= new google.maps.Marker({
                position: posicionGrabar,
                map,
                icon: "images/mono.png"
                
            })
            infoWindow[i]= new google.maps.InfoWindow();
            let html;
            if(doc.data().mensaje=="" && doc.data().firma==""){
                html =`<h3 id="fecha_registro">${doc.data().fecha} ${doc.data().hora}</h3><br>
                <h3 id="mensaje_registro">Este mono no quiere hablar</h3><br>
                <p id="firma_registro">Mono anónimo</p>
                <p id="precision_registro">Precisión: ${doc.data().acc.toFixed(2)}</p>`;
            }else if(doc.data().firma==""){
                html =`<h3 id="fecha_registro">${doc.data().fecha} ${doc.data().hora}</h3><br>
                <h3 id="mensaje_registro">${doc.data().mensaje}</h3><br>
                <p id="firma_registro">Mono anónimo</p>
                <p id="precision_registro">Precisión: ${doc.data().acc.toFixed(2)}</p>`;
            }else if(doc.data().mensaje==""){
                html =`<h3 id="fecha_registro">${doc.data().fecha} ${doc.data().hora}</h3><br>
                <h3 id="mensaje_registro">Este mono no quiere hablar</h3><br>
                <p id="firma_registro">${doc.data().firma}</p>
                <p id="precision_registro">Precisión: ${doc.data().acc.toFixed(2)}</p>`;
            }else{
                html =`<h3 id="fecha_registro">${doc.data().fecha} ${doc.data().hora}</h3><br>
                <h3 id="mensaje_registro">${doc.data().mensaje}</h3><br>
                <p id="firma_registro">${doc.data().firma}</p>
                <p id="precision_registro">Precisión: ${doc.data().acc.toFixed(2)}</p>`;
            }
            
            
            infoWindow[i].setContent(html);
            
            
                  
            i++;
        });
        let j=0;
        for (let j=0;j<i;j++){
            markers[j].addListener("click", () => {
                map.setCenter(markers[j].position);
                map.setZoom(17);
                infoWindow[j].open({
                  anchor: markers[j],
                  map,
                  shouldFocus: false,
                });
              });
              
              
        }

        
        
    });
}
//aca termina lo de google maps

function guardar(){
    db.collection("coordenadas").add({
        lat: lat,
        lon: lon,
        acc: acc,
        firma: document.getElementById('nombre_ventana').value,
        mensaje: document.getElementById('mensaje_ventana').value,
        fecha: fecha,
        hora: hora
        
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    
}

buttonCapture.addEventListener("click",()=>{
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(posicion=>{
             lat=posicion.coords.latitude;
             lon=posicion.coords.longitude;
             acc=posicion.coords.accuracy;
             fecha=hoy.toLocaleDateString();
             hora= hoy.getHours()+ ':' + hoy.getMinutes();

             const myLatLng = {lat: lat, lng: lon};
             /* textoCoordenadas.textContent =`Tus coordenadas son lat: ${lat} lon:${lon} precisión:${acc}`; */
             let html=`<div id="ventana_mono"><h3 id="tit_infowindow">Aquí estás<br>para el mundo</h3>
             <p id="alerta_1"></p>
    
             <input autocomplete="off" id="nombre_ventana" type="text" placeholder="Firmá o @instagram"></input>
            
             <textarea id="mensaje_ventana" placeholder="Gritale al mundo!"></textarea>
             </div>`;

             let botonPrueba = document.createElement("BUTTON");
             botonPrueba.innerHTML="Plantar Mono";
             botonPrueba.setAttribute("id","boton_ventana");
             let divPrueba = document.createElement("DIV");
             divPrueba.innerHTML=html;
             divPrueba.appendChild(botonPrueba);

             botonPrueba.addEventListener("click",()=>{//mando la funcion ver y guardar para que actualice insta ndea, y cierro la window
               
                    
                if(document.getElementById('nombre_ventana').value.length>12 || document.getElementById('mensaje_ventana').value.length>80){
                    document.getElementById("alerta_1").innerHTML="Tu firma es mayor a 12 caracteres<br>o<br>El texto mayor a 80";
            
                
                }else{
                    guardar();//aca debo agregar la validacion para la longitud de los textos, pero mañana o en un rato.
                    infoWindow.close(map,marker);
                    ver();
                    ventanaAbierta=false;
                }
               
             })

             let infoWindow=new google.maps.InfoWindow();
             infoWindow.setContent(divPrueba);
             
             infoWindow.open(map,marker);
             

             marker.setPosition(myLatLng);
             map.setCenter(myLatLng);
             map.setZoom(16);   

            })
        }
})


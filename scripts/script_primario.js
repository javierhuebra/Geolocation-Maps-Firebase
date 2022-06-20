document.getElementById("cerrar_info").addEventListener("click",()=>{
    document.querySelector(".info-app-visible").classList.add("info-app-oculta");
    document.querySelector(".info-app-visible").classList.remove("info-app-visible");
})

document.getElementById("informacion_app").addEventListener("click",()=>{
    document.querySelector(".info-app-oculta").classList.add("info-app-visible");
    document.querySelector(".info-app-oculta").classList.remove("info-app-oculta");
})

//Prueba de actualizacion en github
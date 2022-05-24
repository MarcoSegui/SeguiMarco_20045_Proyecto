const baseDatos = JSON.parse(localStorage.getItem("BaseDatos"));

console.log(baseDatos)

let name = ""
let room = "";
let price = 0;
let quota = 0;
let checkIn = ""
let checkOut = ""
let diffDays = 0

const today = new Date().toLocaleDateString('en-ca')

console.log(today)

document.getElementById("checkin").setAttribute("min", today);
document.getElementById("checkout").setAttribute("min", today);

//_____________________________________________

let div1=document.getElementById("div1");
let div2=document.getElementById("div2");
let div3=document.getElementById("div3");
let div4=document.getElementById("div4");

setTimeout(() =>    {
    swal({
        title: "Si sos un verdadero PetLover, no te pierdas esta oportunidad",
        text: "¡Este verano traé tu mascota con tigo!",
        icon: "img/pet_logo.jpg",
    });
}, 1500)

const btnDiv1 = document.getElementById("btnDiv1");

btnDiv1.onclick = () => {
    name = document.getElementById("name");
    if (name.value != "") {
        sessionStorage.setItem("name", name.value);
        div1.style.display = "none";
        div2.style.display = "";
        swal(`¡Hola ${name.value.toUpperCase()}!`, "Comenzemos con la reserva");
    } else {
        swal("Error","Por favor ingresa un nombre válido", "warning");
}}

baseDatos.forEach((item) => {   
    let btnDiv2 = document.getElementById(item.habitacion);
    btnDiv2.addEventListener('click',(e) => {
        console.log(e.target);
        console.log(btnDiv2.id);
        room = item.habitacion;
        price = item.precio;
        quota = item.cupo;
        console.log(room, price, quota);
        div2.style.display = "none";
        div3.style.display = "";
    })
})

const btnDiv3 = document.getElementById("btnDiv3");

btnDiv3.onclick = () => {  
    checkIn = (document.getElementById("checkin")).value;
    checkOut = (document.getElementById("checkout")).value;
    let checkInDays = new Date(checkIn).getTime()
    let checkOutDays = new Date(checkOut).getTime()
    console.log(checkIn, checkOut)

    if ((checkInDays != "") && (checkOutDays != "") && (checkOutDays > checkInDays)) {
        diffDays = (checkOutDays - checkInDays)/(1000*60*60*24)
        console.log(diffDays)
        div3.style.display = "none";
        div4.style.display = "";
        name = sessionStorage.getItem("name");
        let subTotal = Number(price * diffDays);
        let iva = Number(subTotal * 0.21);
        let total = Number(iva + subTotal);

        document.getElementById("titulo").innerHTML = `<h2>${name.toUpperCase()}</h2>`;
        
        (quota >1) ? ((diffDays > 1) ? document.getElementById("texto2").innerHTML = `Elegiste una habitación <b>${room}</b> con una capacidad para <b>${quota}</b> personas, por <b>${diffDays}</b> noches, desde el <b>${checkIn}</b> hasta el <b>${checkOut}</b>.` : document.getElementById("texto2").innerHTML = `Elegiste una habitación <b>${room}</b> con una capacidad para <b>${quota}</b> personas, por <b>1</b> noche, desde el <b>${checkIn}</b>, hasta el <b>${checkOut}</b>.`) : ((diffDays > 1) ? document.getElementById("texto2").innerHTML = `Elegiste una habitación <b>${room}</b> con una capacidad para <b>1</b> persona, por <b>${diffDays}</b> noches, desde el <b>${checkIn}</b> hasta el <b>${checkOut}</b>.` : document.getElementById("texto2").innerHTML = `Elegiste una habitación <b>${room}</b> con una capacidad para <b>1</b> persona, por <b>1</b> noche, desde el <b>${checkIn}</b>, hasta el <b>${checkOut}</b>.`)
           
        document.getElementById("texto3").innerHTML = `El precio es <b>$${price}</b> por día (impuestos no incluídos)`;
        
        document.getElementById("texto4").innerHTML = `<b>-Subtotal:</b> $${subTotal}`;

        document.getElementById("texto5").innerHTML = `<b>-Iva</b> (21%): $${iva}`;

        document.getElementById("texto6").innerHTML = `<b>-Total:</b> $${total}`;

    } else {
        swal("Error", "Por favor ingresa una fecha válida", "warning");
    }
}

const btnDiv4 = document.getElementById("btnDiv4");
btnDiv4.onclick = () =>   {
    swal({
        title: "Su reserva ha sido confirmada",
        text: "¡Gracias por confiar en nosotros!",
        icon: "success",
        button: "Finalizar",
    });
    console.log("Finalizado el proceso de reserva")
    div4.style.display = "none";
    div1.style.display = "";
}

//_______________________________________________________

const btnDiv3Back = document.getElementById("btnDiv3Back");

btnDiv3Back.onclick = () => {
    div3.style.display = "none";
    div2.style.display = "";
}

const btnDiv4Back = document.getElementById("btnDiv4Back");

btnDiv4Back.onclick = () => {
    div4.style.display = "none";
    div3.style.display = "";
}
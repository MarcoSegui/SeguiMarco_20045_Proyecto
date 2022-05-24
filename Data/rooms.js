class Hotel {
    constructor(id, habitacion, cupo, precio, stock) {
        this.id = id.toUpperCase();
        this.habitacion = habitacion;
        this.cupo = parseInt(cupo);
        this.precio = parseFloat(precio);
        this.stock= stock;
    }
}

const hotel = [];

hotel.push(new Hotel("H1", "Simple", 1, 1500, true));
hotel.push(new Hotel("H2", "Doble", 2, 2500, true));
hotel.push(new Hotel("H3", "Triple", 3, 3500, true));
hotel.push(new Hotel("H4", "Familiar", 4, 5000, true));

const guardarLocal = (clave, valor) => {
    localStorage.setItem(clave, valor);
};

guardarLocal("BaseDatos", JSON.stringify(hotel));
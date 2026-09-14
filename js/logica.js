//FUNCIÓN PARA CONVERTIR EL TEXTO DE LAS CONFIGURACIONES A NÚMEROS ENTEROS.
function obtenerValorEntero(inputTexto) {
    return parseInt(inputTexto.value);
}

function generarTablaMatriz(num_alternativas) {
    const cuerpoMatriz = document.getElementById("cuerpo-matriz");

    cuerpoMatriz.innerHTML = "";

    for (let i = 1; i <= num_alternativas ; i++) {

        const fila = document.createElement("tr");

        // COLUMNA ("JUEGOS"): CELDA CON UN INPUT DE TEXTO PARA EL NOMBRE DEL JUEGO.
        const celdaNombre = document.createElement("td");
        const inputNombre = document.createElement("input");
        inputNombre.type = "text";
        inputNombre.placeholder = "Juego" + i;
        celdaNombre.appendChild(inputNombre);
        fila.appendChild(celdaNombre);

        //COLUMNA ("COSTO"): CELDA CON UN INPUT DE NUMBER PARA EL VALOR DE COSTO.
        const celdaNombre2 = document.createElement("td");
        const inputNombre2 = document.createElement("input");
        inputNombre2.type = "number";
        inputNombre2.placeholder = "Ejem. 1000";
        celdaNombre2.appendChild(inputNombre2);
        fila.appendChild(celdaNombre2);

        //COLUMNA ("PLATAFORMA"): CELDA CON UN SELECT PARA ELEGIR LA PLATAFORMA
        const celdaNombre3 = document.createElement("td");
        const inputNombre3 = document.createElement("select");
        inputNombre3.type = "text";
        inputNombre3.placeholder = "Ejem. Xbox/PS";
        celdaNombre3.appendChild(inputNombre3);
        fila.appendChild(celdaNombre3);

        //COLUMNA ("GÉNERO"): CELDA CON UN SELECT PARA ELEGIR EL GÉNERO
        const celdaNombre4 = document.createElement("td");
        const inputNombre4 = document.createElement("select");
        inputNombre4.type = "text";
        inputNombre4.placeholder = "Ejem. FPS, RPG";
        celdaNombre4.appendChild(inputNombre4);
        fila.appendChild(celdaNombre4);

        // RESTO DE COLUMNAS ("ARTE", "MÚSICA", "DURACIÓN", "RESEÑAS"): CELDA CON UN INPUT PARA EL VALOR DEL CRITERIO.
        for (let j = 1 ; j <= 4 ; j++) {
        const celdaValor = document.createElement("td");
        const inputValor = document.createElement("input");
        inputValor.type = "number";
        inputValor.placeholder = "Ej. 8, 95";
        celdaValor.appendChild(inputValor);
        fila.appendChild(celdaValor);
        }

        //COLUMNA ("SUMA PUNTUAJE"): CELDA QUE MOSTRARÁ LA SUMA TOTAL DE LA OPERACIÓN SAW INDIVIDUAL DE CADA ALTERNATIVA.
        const celdaNombre5 = document.createElement("td");
        const inputNombre5 = document.createElement("input");
        inputNombre5.type = "text";
        inputNombre5.readOnly = true
        inputNombre5.placeholder = "...";
        celdaNombre5.appendChild(inputNombre5);
        fila.appendChild(celdaNombre5);
        
        //SE AGREGA LA FILA DE LA TABLA PARA QUE EL USUARIO AGREGE O ELIJA SUS VALORES.
        cuerpoMatriz.appendChild(fila)

        
    }
}

const btnGenerar = document.getElementById("btn-generar");
const vistaConfig = document.getElementById("vista-configuracion");
const vistaMatriz = document.getElementById("vista-matriz");

const inputAlternativas = document.getElementById("num_alter");

btnGenerar.addEventListener("click", function() {

    //SE PASAN LOS PESOS DE LAS PONDERACIONES ASIGNADAS POR EL USUARIO A LA NUEVA TABLA
    document.getElementById("matriz-costo").value = document.getElementById("config-costo").value
    document.getElementById("matriz-plataforma").value = document.getElementById("config-plataforma").value
    document.getElementById("matriz-genero").value = document.getElementById("config-genero").value
    document.getElementById("matriz-arte").value = document.getElementById("config-arte").value
    document.getElementById("matriz-musica").value = document.getElementById("config-musica").value
    document.getElementById("matriz-duracion").value = document.getElementById("config-duracion").value
    document.getElementById("matriz-resena").value = document.getElementById("config-resena").value
    //***************/

    let numAlternativas = obtenerValorEntero(inputAlternativas);

    generarTablaMatriz(numAlternativas);

    //OCULTA LAS CONFIGURACIONES Y MUESTRA LAS TABLAS GENERADAS
    vistaConfig.classList.add("oculto");
    //OCULTA LAS TABLAS GENERADAS Y VUELVE A MOSTRAR LAS CONFIGURACIONES
    vistaMatriz.classList.remove("oculto");
});
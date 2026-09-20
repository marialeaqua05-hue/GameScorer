function ejecutarTOPSIS(listaJuegos, pesos){
    let resultados = [];
    let numJuegos = listaJuegos.length;

    //PASO 1: SUMAR LOS CUADRADOS DE CADA CRITERIO
    //Inicializamos un objeto para almacenar las sumas de los cuadrados
    let sumaCuadrados = {
        costo: 0, 
        plat: 0, 
        gen: 0, 
        arte: 0, 
        mus: 0, 
        dur: 0, 
        res: 0
    };

    //Recorremos la lista de juegos para calcular las sumas de los cuadrados
    for (let juego of listaJuegos) {
        sumaCuadrados.costo += Math.pow(juego.costo, 2);
        sumaCuadrados.plat += Math.pow(juego.plat, 2);
        sumaCuadrados.gen += Math.pow(juego.gen, 2);
        sumaCuadrados.arte += Math.pow(juego.arte, 2);
        sumaCuadrados.mus += Math.pow(juego.mus, 2);
        sumaCuadrados.dur += Math.pow(juego.dur, 2);
        sumaCuadrados.res += Math.pow(juego.res, 2);
    }

    //PASO 2: OBTENER LA RAÍZ CUADRADA DE CADA SUMA
    let raizCuadradaSuma = {
        raizCosto: Math.sqrt(sumaCuadrados.costo),
        raizPlataforma: Math.sqrt(sumaCuadrados.plat),
        raizGenero: Math.sqrt(sumaCuadrados.gen),
        raizArte: Math.sqrt(sumaCuadrados.arte),
        raizMusica: Math.sqrt(sumaCuadrados.mus),
        raizDuracion: Math.sqrt(sumaCuadrados.dur),
        raizResenas: Math.sqrt(sumaCuadrados.res)
    };

    //PASO 3 y 4: NORMALIZAR LOS VALORES DE CADA CRITERIO (valor en matriz original / raíz cuadrada de la suma de cuadrados) y MULTIPLICAR POR LOS PESOS
    let MatrizNormalizada = [];

    for (let juego of listaJuegos) {
        let filaPonderada = {
            nombre: juego.nombre, // Conservamos el nombre para el final
            img: juego.img,       // Conservamos la imagen
            costo: (juego.costo / raizCuadradaSuma.raizCosto) * pesos.costo,
            plat: (juego.plat / raizCuadradaSuma.raizPlataforma) * pesos.plat,
            gen: (juego.gen / raizCuadradaSuma.raizGenero) * pesos.gen,
            arte: (juego.arte / raizCuadradaSuma.raizArte) * pesos.arte,
            mus: (juego.mus / raizCuadradaSuma.raizMusica) * pesos.mus,
            dur: (juego.dur / raizCuadradaSuma.raizDuracion) * pesos.dur,
            res: (juego.res / raizCuadradaSuma.raizResenas) * pesos.res
        };
        MatrizNormalizada.push(filaPonderada);
    };

    //PASO 5: DETERMINAR LOS VALORES IDEALES POSITIVOS Y NEGATIVOS
    let idealPositivo = {
        costo: Math.min(...MatrizNormalizada.map(juego => juego.costo)), // Costo es un criterio de costo, por lo que buscamos el mínimo
        plat: Math.max(...MatrizNormalizada.map(juego => juego.plat)),
        gen: Math.max(...MatrizNormalizada.map(juego => juego.gen)),
        arte: Math.max(...MatrizNormalizada.map(juego => juego.arte)),
        mus: Math.max(...MatrizNormalizada.map(juego => juego.mus)),
        dur: Math.max(...MatrizNormalizada.map(juego => juego.dur)),
        res: Math.max(...MatrizNormalizada.map(juego => juego.res))
    };

    let idealNegativo = {
        costo: Math.max(...MatrizNormalizada.map(juego => juego.costo)), // Costo es un criterio de costo, por lo que buscamos el máximo
        plat: Math.min(...MatrizNormalizada.map(juego => juego.plat)),
        gen: Math.min(...MatrizNormalizada.map(juego => juego.gen)),
        arte: Math.min(...MatrizNormalizada.map(juego => juego.arte)),
        mus: Math.min(...MatrizNormalizada.map(juego => juego.mus)),
        dur: Math.min(...MatrizNormalizada.map(juego => juego.dur)),
        res: Math.min(...MatrizNormalizada.map(juego => juego.res))
    };

    //PASO 6: CALCULAR LA DISTANCIA A LOS IDEALES POSITIVO Y NEGATIVO
    //matriz de resta = matrizNormalizada - idealPositivo
    //se guarda la raiz de cada suma horizontal de cada fila
    for (let juego of MatrizNormalizada) {
        juego.distanciaPositiva = Math.sqrt(
            Math.pow(juego.costo - idealPositivo.costo, 2) +
            Math.pow(juego.plat - idealPositivo.plat, 2) +
            Math.pow(juego.gen - idealPositivo.gen, 2) +
            Math.pow(juego.arte - idealPositivo.arte, 2) +
            Math.pow(juego.mus - idealPositivo.mus, 2) +
            Math.pow(juego.dur - idealPositivo.dur, 2) +
            Math.pow(juego.res - idealPositivo.res, 2)
        );
    }

    //matriz de resta = matrizNormalizada - idealNegativo
    for (let juego of MatrizNormalizada) {
        juego.distanciaNegativa = Math.sqrt(
            Math.pow(juego.costo - idealNegativo.costo, 2) +
            Math.pow(juego.plat - idealNegativo.plat, 2) +
            Math.pow(juego.gen - idealNegativo.gen, 2) +
            Math.pow(juego.arte - idealNegativo.arte, 2) +
            Math.pow(juego.mus - idealNegativo.mus, 2) +
            Math.pow(juego.dur - idealNegativo.dur, 2) +
            Math.pow(juego.res - idealNegativo.res, 2)
        );
    }

    //PASO 7: CALCULAR EL PUNTAJE FINAL PARA CADA JUEGO
    // puntajeFinal = raices de la matriz 6 o distanciaNegativa / (suma de las raices de la matriz 5 y 6 o distanciaPositiva + distanciaNegativa)
    for (let juego of MatrizNormalizada) {
        juego.puntajeFinal = juego.distanciaNegativa / (juego.distanciaPositiva + juego.distanciaNegativa);
    }

    //devolvemos solo el nombre, la imagen y el puntaje final de cada juego
    resultados = MatrizNormalizada.map(juego => 
        ({
            nombre: juego.nombre,
            img: juego.img,
            puntaje: juego.puntajeFinal
        })
    );

    return resultados; // Se lo devolvemos a interfaz.js
}
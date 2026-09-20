// // 1. La función de normalización de costo que corregimos antes
// function conversionCostoValor(costo, costoMinimo) {
//     if (isNaN(costo) || costo === 0 || costoMinimo === 0) return 1; 
//     let valorNormalizado = (costoMinimo / costo);
//     return Math.round(valorNormalizado * 100) / 100;
// }



// 2. La función principal que ui.js llamará
function ejecutarSAW(listaJuegos, pesos, listaMinMax) {
    let resultados = [];

    listaJuegos.forEach(juego => {
        //Normalizacion de valores
        let ValoresNormalizados = { 
            //El costo es un valor que buscamos disminuir, entonces se divide el minimo entre cada valor
            valCosto: listaMinMax.minCosto / juego.costo,

            //Maximizar: Se divide el valor original entre el maximo de cada columna
            valPlat: juego.plat / listaMinMax.maxPlat,
            valGen: juego.gen / listaMinMax.maxGen,
            valArte: juego.arte / listaMinMax.maxArte,
            valMus: juego.mus / listaMinMax.maxMus,
            valDur: juego.dur / listaMinMax.maxDur,
            valRes: juego.res / listaMinMax.maxRes
        }

        // Hacemos la suma multiplicada por los pesos
        let puntajeTotal = (ValoresNormalizados.valCosto * pesos.costo) + 
                           (ValoresNormalizados.valPlat * pesos.plat) + 
                           (ValoresNormalizados.valGen * pesos.gen) + 
                           (ValoresNormalizados.valArte * pesos.arte) + 
                           (ValoresNormalizados.valMus * pesos.mus) + 
                           (ValoresNormalizados.valDur * pesos.dur) + 
                           (ValoresNormalizados.valRes * pesos.res);
        
        // Guardamos el resultado en la lista
        resultados.push({
            nombre: juego.nombre,
            puntaje: puntajeTotal,
            img: juego.img
        });
    });

    return resultados; // Se lo devolvemos a ui.js
}
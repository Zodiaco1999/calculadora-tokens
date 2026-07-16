const PRECIOS = {
  "claude-haiku-4-5-20251001": { entrada: 1.00,  salida: 5.00  },
  "claude-sonnet-5":           { entrada: 3.00,  salida: 15.00 },
  "claude-opus-4-8":           { entrada: 5.00,  salida: 25.00 },
  "claude-fable-5":            { entrada: 10.00, salida: 50.00 },
  "modelo-manual":             { entrada: 0.00, salida: 0.00 }
};

const $ = id => document.getElementById(id);
const modelo        = $("modelo");
const precioEntrada = $("precioEntrada");
const precioSalida  = $("precioSalida");
const tokensEntrada = $("tokensEntrada");
const tokensSalida  = $("tokensSalida");

const fmtUSD = n => "$" + n.toLocaleString("en-US", {
  minimumFractionDigits: 6,
  maximumFractionDigits: 6
});

function setPreciosDesdeModelo() {
  const p = PRECIOS[modelo.value];
  precioEntrada.value = p.entrada;
  precioSalida.value  = p.salida;
  calcular();
}

function calcular() {
  const pIn  = parseFloat(precioEntrada.value) || 0;
  const pOut = parseFloat(precioSalida.value)  || 0;
  const tIn  = parseFloat(tokensEntrada.value) || 0;
  const tOut = parseFloat(tokensSalida.value)  || 0;
  const costoIn  = (tIn  / 1_000_000) * pIn;
  const costoOut = (tOut / 1_000_000) * pOut;
  $("costoEntrada").textContent = fmtUSD(costoIn);
  $("costoSalida").textContent  = fmtUSD(costoOut);
  $("total").textContent        = fmtUSD(costoIn + costoOut);
}

modelo.addEventListener("change", setPreciosDesdeModelo);

[precioEntrada, precioSalida, tokensEntrada, tokensSalida]
  .forEach(el => el.addEventListener("input", calcular));
  
setPreciosDesdeModelo();

// ✅ Importamos los estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// ✅ Importamos los estilos personalizados de la calculadora
import './App.css';
// ✅ Importamos React y useState
import { useState } from "react";



// ✅ Funcion principal de la aplicación de la calculadora
export default function App() {

  // ✅ Estado para manejar la pantalla, operadores y modo oscuro
  const [display, setDisplay] = useState("0");
  const [previo, setPrevio] = useState(null);
  const [operador, setOperador] = useState(null);
  const [esperaSiguiente, setEsperaSiguiente] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [errorTimeout, setErrorTimeout] = useState(null);
  const [esError, setEsError] = useState(false);

  // ✅ Funcion de formateo,solo si es necesario, muestra los enteros sin decimales,y floats con 3 decimales
  const formateaNumero = (num) => {
    const parseado = parseFloat(num);
    if (Number.isInteger(parseado)) {
      return String(parseado);
    } else {
      return parseado.toFixed(3); // Redondear a 3 decimales
    }
  };

  // ✅ Función para convertir el display a número, devolviendo 0 si no es un número válido
  const convierteDisplay = () => {
    return parseFloat(display) || 0;
  };


  // ✅ Función para manejar la entrada de dígitos
  // ✅ Si se está esperando el siguiente número, reinicia el display
  // ✅ Si hay un error, reinicia el display
  // ✅ Si el display es "0", reemplaza con el nuevo dígito
  // ✅ Si no, concatena el dígito al display actual
  // ✅ Si el display es un número válido, lo convierte a string
  // ✅ Si no, muestra "0"
  const digitoEntrada = (digito) => {
    if (esperaSiguiente) {
      setDisplay(String(digito));
      setEsError(false);
      setEsperaSiguiente(false);
    } else {
      if (display === "0" || esError) {
        setDisplay(String(digito));
        setEsError(false);
      } else {
        setDisplay(display + String(digito));
      }
    }
  };


  // ✅ Función para limpiar todo
  // ✅ Reinicia el display a "0", los operadores y el estado de espera
  // ✅ También limpia el estado de error si estaba activo
  // ✅ Esta función se usa al presionar el botón "AC"
  // ✅ No formatea el número, ya que es un reinicio completo
  // ✅ El display siempre comienza en "0"
  const limpiaTodo = () => {
    setDisplay("0");
    setPrevio(null);
    setOperador(null);
    setEsperaSiguiente(false);
    setEsError(false);
  };


  // ✅ Función para manejar el retroceso
  const backspace = () => {
    if (!esError) {
      setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"));
    }
  };

  // ✅ Función para realizar el cálculo según el operador
  // ✅ Si b es 0, muestra un mensaje de error y reinicia el display después de 2 segundos
  // ✅ Si no, realiza la división normalmente
  const calcula = (a, operador, b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    // ✅ Calculo de los operadores con  los números a y b
    switch (operador) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      // ✅ Manejo de división por cero
      // ✅ Si b es 0, muestra un mensaje de error y reinicia el display después de 2 segundos
      // ✅ Si no, realiza la división normalmente  
      case "/":
        if (b === 0) {
          if (errorTimeout) clearTimeout(errorTimeout);
          setDisplay("Error división por 0");
          setEsError(true);
          const timeout = setTimeout(() => {
            setDisplay(formateaNumero(a));
            setEsError(false);
          }, 2000);
          setErrorTimeout(timeout);
          return null;
        }
        return a / b;
      default: return b;
    }
  };// ✅ Fin de la función calcula



  // ✅ Función para manejar los operadores
  // ✅ Si no hay operador previo, lo establece
  // ✅ Si ya hay un operador, calcula el resultado con el operador previo y el número actual
  // ✅ Si el resultado es válido, lo muestra en el display
  // ✅ Establece el nuevo operador y espera el siguiente número
  // ✅ Esta función se usa al presionar los botones de los operadores (+, -, *, /)
  // ✅ No formatea el número, ya que es un cálculo intermedio
  // ✅ El display se formatea solo al confirmar el resultado
  // ✅ El estado de espera se activa para esperar el siguiente número
  const manejaOperador = (siguienteOperador) => {
    const actual = convierteDisplay();
    if (previo == null) {
      setPrevio(actual);
    } else if (operador) {
      const resultado = calcula(previo, operador, actual);
      if (resultado !== null) {
        setPrevio(resultado);
        // ✅ Aquí sí formateamos para mostrar limpio en la pantalla
        setDisplay(formateaNumero(resultado));
      }
    }
    setOperador(siguienteOperador);
    setEsperaSiguiente(true);
  };

  // ✅ Función para manejar el botón de igual
  // ✅ Comprueba si hay un operador y un número previo
  // ✅ Si es así, calcula el resultado y lo muestra en el display
  const manejaIgual = () => {
    if (operador && previo != null) {
      const actual = convierteDisplay();
      const resultado = calcula(previo, operador, actual);
      if (resultado !== null) {
        // ✅ Formateamos SOLO aquí, cuando se confirma el resultado
        setDisplay(formateaNumero(resultado));
        setPrevio(null);
        setOperador(null);
        setEsperaSiguiente(true);
      }
    }
  };

    // ✅ Función para alternar entre modo oscuro y claro
  const cambiaTema = () => setModoOscuro(!modoOscuro);


  // ✅ Función para renderizar los  botonesde la calculadora
  // ✅ Cada botón tiene un label, color de fondo, color de texto y una función onClick
  // ✅ Los botones tienen un estilo específico según su tipo (círculo o rectángulo redondeado)
  // ✅ Los botones de números y operadores tienen un colspan para ajustar el diseño
  // ✅ Los colores y estilos se definen en línea para mayor flexibilidad
  const renderBoton = (label, bgColor, textColor, onClick, colSpan = 1) => (
    <td colSpan={colSpan} className="text-center">
      <button
        className="btn btn-push btn-circle"
        style={{ backgroundColor: bgColor, color: textColor }}
        onClick={onClick}
      >
        {label}
      </button>
    </td>
  );

    // ✅ Función para renderizar los botones largos de rectángulo redondeado
    // ✅ Los botones de "0" y "=" ocupan más espacio con colspan=2
    // ✅ Se usa una clase btn-rounded-rect para el botón alargado por eso se hizo esta función
  const renderBotonLargo = (label, bgColor, textColor, onClick, colSpan = 2) => (
    <td colSpan={colSpan} className="text-center">
      <button
        className="btn btn-push btn-rounded-rect"
        style={{ backgroundColor: bgColor, color: textColor }}
        onClick={onClick}
      >
        {label}
      </button>
    </td>
  );

  // ✅ Renderiza la interfaz de la calculadora
  // ✅ Usa un contenedor principal con un fondo oscuro o claro según el estado modoOscuro
  // ✅ Incluye un botón para alternar entre modo oscuro y claro
  // ✅ Muestra el display de la calculadora con un estilo específico
  // ✅ Cada fila de botones se renderiza con los botones correspondientes
  // ✅ Los botones de números, operadores y funciones especiales están organizados en filas
  return (
    <div className={modoOscuro ? "bg-dark text-light vh-100 d-flex justify-content-center align-items-center" : "bg-light vh-100 d-flex justify-content-center align-items-center"}>
      <div className={`calc-container ${modoOscuro ? "bg-dark-mode" : "bg-light-mode"}`}
>
        <div className="mb-3 d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={cambiaTema}>
            {modoOscuro ? "Modo Luz" : "Modo Oscuro"}
          </button>
        </div>
        <table>
          <tbody>
            <tr>
              <td colSpan={4} className={`calc-display ${esError ? "error" : ""}`}>
                {display}
              </td>
            </tr>
            <tr>
              {renderBoton("AC", "#a5a5a5", "white", limpiaTodo)}
              {renderBoton("⌫", "#a5a5a5", "white", backspace)}
              {renderBoton(".", "#333333", "white", () => digitoEntrada('.'))}
              {renderBoton("/", "#F89B10", "white", () => manejaOperador("/"))}
            </tr>
            <tr>
              {renderBoton("7", "#333333", "white", () => digitoEntrada(7))}
              {renderBoton("8", "#333333", "white", () => digitoEntrada(8))}
              {renderBoton("9", "#333333", "white", () => digitoEntrada(9))}
              {renderBoton("*", "#F89B10", "white", () => manejaOperador("*"))}
            </tr>
            <tr>
              {renderBoton("4", "#333333", "white", () => digitoEntrada(4))}
              {renderBoton("5", "#333333", "white", () => digitoEntrada(5))}
              {renderBoton("6", "#333333", "white", () => digitoEntrada(6))}
              {renderBoton("-", "#F89B10", "white", () => manejaOperador("-"))}
            </tr>
            <tr>
              {renderBoton("1", "#333333", "white", () => digitoEntrada(1))}
              {renderBoton("2", "#333333", "white", () => digitoEntrada(2))}
              {renderBoton("3", "#333333", "white", () => digitoEntrada(3))}
              {renderBoton("+", "#F89B10", "white", () => manejaOperador("+"))}
            </tr>
            <tr>
              <td align='center' colSpan={2}>{renderBotonLargo("0", "#333333", "white", () => digitoEntrada(0), 2)}</td>
              <td align='center' colSpan={2}>{renderBotonLargo("=", "#F89B10", "white", manejaIgual)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

}// ✅ Fin de la función principal de la aplicación de la calculadora




// ✅ Importamos los estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';


// ✅ Importamos los estilos personalizados
import './App.css';

// ✅ Importamos React y useState
import { useState } from "react";

// ✅ Importamos Link de expo-router para navegación

// ✅ Componente principal de la aplicación
export default function App() {
// ✅ Estado para manejar la pantalla, operadores y modo oscuro
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [errorTimeout, setErrorTimeout] = useState(null);
  const [isError, setIsError] = useState(false);

  // ✅ Funcion de formateo,solo si es necesario, muestra los enteros sin decimales,y floats con 3 decimales
  const formatNumber = (num) => {
    const parsed = parseFloat(num);
    if (Number.isInteger(parsed)) {
      return String(parsed);
    } else {
      return parsed.toFixed(3); // Redondear a 3 decimales
    }
  };

// ✅ Función para convertir el display a número, devolviendo 0 si no es un número válido
  const parseDisplay = () => {
    return parseFloat(display) || 0;
  };
// ✅ Función para manejar la entrada de dígitos
  // ✅ Si se está esperando el siguiente número, reinicia el display
  // ✅ Si hay un error, reinicia el display
  // ✅ Si el display es "0", reemplaza con el nuevo dígito
  // ✅ Si no, concatena el dígito al display actual
  // ✅ Si el display es un número válido, lo convierte a string
  // ✅ Si no, muestra "0"
  const inputDigit = (digit) => {
    if (waitingForNext) {
      setDisplay(String(digit));
      setIsError(false);
      setWaitingForNext(false);
    } else {
      if (display === "0" || isError) {
        setDisplay(String(digit));
        setIsError(false);
      } else {
        setDisplay(display + String(digit));
      }
    }
  };
// ✅ Función para limpiar todo
  // ✅ Reinicia el display a "0", los operadores y el estado de espera
  // ✅ También limpia el estado de error si estaba activo
  // ✅ Esta función se usa al presionar el botón "AC"
  // ✅ No formatea el número, ya que es un reinicio completo
  // ✅ El display siempre comienza en "0"
  const clearAll = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setWaitingForNext(false);
    setIsError(false);
  };

  // ✅ Función para manejar el retroceso
  const backspace = () => {
    if (!isError) {
      setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"));
    }
  };

  // ✅ Función para manejar los operadores
  // ✅ Realiza el cálculo según el operador seleccionado
  // ✅ Si hay un error de división por cero, muestra un mensaje de error
  // ✅ Si no, devuelve el resultado del cálculo
  // ✅ Si el operador no es válido, devuelve el segundo número
  // ✅ Siempre convierte los números a flotantes para evitar errores de tipo
  // ✅ Si hay un error, muestra un mensaje y espera 2 segundos antes de reiniciar el display
  // ✅ Devuelve siempre un número real
  const compute = (a, op, b) => {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (op) {
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
          setIsError(true);
          const timeout = setTimeout(() => {
            setDisplay(formatNumber(a));
            setIsError(false);
          }, 2000);
          setErrorTimeout(timeout);
          return null;
        }
        return a / b;
      default: return b;
    }
  };

    // ✅ Función para manejar los operadores
    // ✅ Si no hay operador previo, lo establece
    // ✅ Si ya hay un operador, calcula el resultado con el operador previo y el número actual
    // ✅ Si el resultado es válido, lo muestra en el display
    // ✅ Siempre formatea el resultado antes de mostrarlo
    // ✅ Establece el operador actual y espera el siguiente número
    // ✅ Esta función se usa al presionar los botones de los operadores (+, -, *, /)
    // ✅ No formatea el número, ya que es un cálculo intermedio
    // ✅ El display se formatea solo cuando se confirma el resultado final
    // ✅ El operador se establece al presionar el botón correspondiente
    // ✅ Si hay un error, no se realiza ningún cálculo y se espera el siguiente número
  const handleOperator = (nextOp) => {
    const current = parseDisplay();
    if (previous == null) {
      setPrevious(current);
    } else if (operator) {
      const result = compute(previous, operator, current);
      if (result !== null) {
        setPrevious(result);
        // ✅ Aquí sí formateamos para mostrar limpio en la pantalla
        setDisplay(formatNumber(result));
      }
    }
    setOperator(nextOp);
    setWaitingForNext(true);
  };

  // ✅ Función para manejar el botón de igual
  // ✅ Comprueba si hay un operador y un número previo
  // ✅ Si es así, calcula el resultado y lo muestra en el display
  const handleEquals = () => {
    if (operator && previous != null) {
      const current = parseDisplay();
      const result = compute(previous, operator, current);
      if (result !== null) {
        // ✅ Formateamos SOLO aquí, cuando se confirma el resultado
        setDisplay(formatNumber(result));
        setPrevious(null);
        setOperator(null);
        setWaitingForNext(true);
      }
    }
  };

    // ✅ Función para alternar entre modo oscuro y claro
  const toggleTheme = () => setDarkMode(!darkMode);

    // ✅ Función para renderizar los  botonesde la calculadora
  // ✅ Cada botón tiene un label, color de fondo, color de texto y una función onClick
  // ✅ Los botones tienen un estilo específico según su tipo (círculo o rectángulo redondeado)
  // ✅ Los botones de números y operadores tienen un colspan para ajustar el diseño
  
  // ✅ Los colores y estilos se definen en línea para mayor flexibilidad
  const renderButton = (label, bgColor, textColor, onClick, colSpan = 1) => (
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
    // ✅ Función para renderizar los botones de rectángulo redondeado
    // ✅ Los botones de "0" y "=" ocupan más espacio con colspan=2
  const renderRoundedRectangle = (label, bgColor, textColor, onClick, colSpan = 2) => (
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

  return (
    <div className={darkMode ? "bg-dark text-light vh-100 d-flex justify-content-center align-items-center" : "bg-light vh-100 d-flex justify-content-center align-items-center"}>
      <div className="p-3 rounded" style={{ backgroundColor: darkMode ? "#1c1c1c" : "#f0f0f0" }}>
        <div className="mb-3 d-flex justify-content-between">
          <button className="btn btn-secondary" onClick={toggleTheme}>
            {darkMode ? "Modo Luz" : "Modo Oscuro"}
          </button>
        </div>
        <table>
          <tbody>
            <tr>
              <td colSpan={4} style={{
                height: "140px",
                backgroundColor: "#a5a5a5",
                color: isError ? "red" : "white",
                fontSize: isError ? "28px" : "48px",
                verticalAlign: "bottom",
                textAlign: "right",
                paddingRight: "20px",
                borderRadius: "8px"
              }}>
                {display}
              </td>
            </tr>
            <tr>
              {renderButton("AC", "#a5a5a5", "white", clearAll)}
              {renderButton("⌫", "#a5a5a5", "white", backspace)}
              {renderButton(".", "#333333", "white", () => inputDigit('.'))}
              {renderButton("/", "#F89B10", "white", () => handleOperator("/"))}
            </tr>
            <tr>
              {renderButton("7", "#333333", "white", () => inputDigit(7))}
              {renderButton("8", "#333333", "white", () => inputDigit(8))}
              {renderButton("9", "#333333", "white", () => inputDigit(9))}
              {renderButton("*", "#F89B10", "white", () => handleOperator("*"))}
            </tr>
            <tr>
              {renderButton("4", "#333333", "white", () => inputDigit(4))}
              {renderButton("5", "#333333", "white", () => inputDigit(5))}
              {renderButton("6", "#333333", "white", () => inputDigit(6))}
              {renderButton("-", "#F89B10", "white", () => handleOperator("-"))}
            </tr>
            <tr>
              {renderButton("1", "#333333", "white", () => inputDigit(1))}
              {renderButton("2", "#333333", "white", () => inputDigit(2))}
              {renderButton("3", "#333333", "white", () => inputDigit(3))}
              {renderButton("+", "#F89B10", "white", () => handleOperator("+"))}
            </tr>
            <tr>
              <td align='center' colSpan={2}>{renderRoundedRectangle("0", "#333333", "white", () => inputDigit(0), 2)}</td>
              <td align='center' colSpan={2}>{renderRoundedRectangle("=", "#F89B10", "white", handleEquals)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


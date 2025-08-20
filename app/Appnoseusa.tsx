import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import './App.css'; // Importando estilos de CSS tipo iphone 

export default function App() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Formatea el número
  const parseDisplay = () => parseFloat(display) || 0;

 // Maneja la entrada de dígitos
  // Si se está esperando el siguiente número, reinicia el display
  // Si hay un error, reinicia el display
  // Si el display es "0", reemplaza con el nuevo dígito
  // Si no, concatena el dígito al display actual
  // Si el display es un número válido, lo convierte a string
  // Si no, muestra "0"
  const inputDigit = (digit) => {
    if (waitingForNext) {
      setDisplay(String(digit));
      setWaitingForNext(false);
    } else {
      if (display === "0") setDisplay(String(digit));
      else setDisplay(display + String(digit));
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setWaitingForNext(false);
  };

  const backspace = () => {
    setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"));
  };

  // Estado adicional para manejar mensaje de error
const [errorTimeout, setErrorTimeout] = useState(null);

const compute = (a, op, b) => {
   a = parseFloat(a);
   b = parseFloat(b);
  switch (op) {
    case "+":
      console.log("Suma", a, b);
      return (a + b).toFixed(2); // Redondear a dos decimales
    case "-":
      return (a - b).toFixed(2); // Redondear a dos decimales
    case "*":
      return (a * b).toFixed(2); // Redondear a dos decimales
    case "/":
      if (b === 0) {
        // Cancelar cualquier temporizador previo
        console.log("División por cero detectada");
        if (errorTimeout) clearTimeout(errorTimeout);

        // Mostrar mensaje de error
        alert("Error division por 0");
        setDisplay("Error division por 0");

        // Restaurar el valor anterior después de 2 segundos
        const timeout = setTimeout(() => {
          setDisplay(String(a));
        }, 2000);

        setErrorTimeout(timeout);
        return a; // No cambia el valor
      }

      return ((a / b).toFixed(2)); // Redondear a dos decimales
      default:
      return b;
  }
};

  const handleOperator = (nextOp) => {
    const current = parseDisplay();
    if (previous == null) {
      setPrevious(current);
    } else if (operator) {
      const result = compute(previous, operator, current);
      setPrevious(result);
      setDisplay(String(result));
    }
    setOperator(nextOp);
    setWaitingForNext(true);
  };

  const handleEquals = () => {
    if (operator && previous != null) {
      const current = parseDisplay();
      const result = compute(previous, operator, current);
      setDisplay(String(result));
      setPrevious(null);
      setOperator(null);
      setWaitingForNext(true);
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const btnStyle = {
    width: "68px",
    height: "68px",
    borderRadius: "50%",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "4px",
  };

  const btnStyleDouble= {
    width: "140px",
    height: "68px",
    borderRadius: "50%",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "4px",
  };


  const RoundedRectangle= {
        width: '140px',
        height: '68px',
        backgroundColor: 'lightblue',
        borderRadius: '35px', // Ajusta el valor para cambiar el radio de las esquinas
        fontSize: "24px",
        fontWeight: "bold",
        margin: "4px",
      
};



  const renderButton = (label, bgColor, textColor, onClick, colSpan = 1) => (
    <td colSpan={colSpan} className="text-center">
      <button
        className="btn"
        style={{ ...btnStyle, backgroundColor: bgColor, color: textColor }}
        onClick={onClick}
      >
        {label}
      </button>
    </td>
  );
  const renderRoundedRectangle = (label, bgColor, textColor, onClick, colSpan = 2) => (
    <td colSpan={colSpan} className="text-center">
      <button
        className="btn"
        style={{ ...RoundedRectangle, backgroundColor: bgColor, color: textColor }}
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
            {/* Caja de resultados */}
            <tr>
              <td colSpan={4} style={{ height: "140px", backgroundColor: "#a5a5a5", color: "white", fontSize: "48px", verticalAlign: "bottom", textAlign: "right", paddingRight: "20px", borderRadius: "8px" }}>
                {display}
              </td>
            </tr>
            {/* Fila AC, Backspace, Division */}
            <tr>
              {renderButton("AC", "#a5a5a5", "white", clearAll)}
              {renderButton("⌫", "#a5a5a5", "white", backspace)}
              {renderButton(".", "#333333", "white",() => inputDigit('.'))}
              {/*<td align='right' colSpan={2} >*/}
              {renderButton("/", "#F89B10", "white", () => handleOperator("/"))}
              {/*</td>*/}
            </tr>
            {/* Fila 7 8 9 - */}
            <tr>
              {renderButton("7", "#333333", "white", () => inputDigit(7))}
              {renderButton("8", "#333333", "white", () => inputDigit(8))}
              {renderButton("9", "#333333", "white", () => inputDigit(9))}
              {renderButton("*", "#F89B10", "white", () => handleOperator("*"))}
            </tr>
            {/* Fila 4 5 6 + */}
            <tr>
              {renderButton("4", "#333333", "white", () => inputDigit(4))}
              {renderButton("5", "#333333", "white", () => inputDigit(5))}
              {renderButton("6", "#333333", "white", () => inputDigit(6))}
               {renderButton("-", "#F89B10", "white", () => handleOperator("-"))}
            </tr>
            {/* Fila 1 2 3 = */}
            <tr>
              {renderButton("1", "#333333", "white", () => inputDigit(1))}
              {renderButton("2", "#333333", "white", () => inputDigit(2))}
              {renderButton("3", "#333333", "white", () => inputDigit(3))}
              {renderButton("+", "#F89B10", "white", () => handleOperator("+"))}
            </tr>
            {/* Fila 0 (colspan=2) */}
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
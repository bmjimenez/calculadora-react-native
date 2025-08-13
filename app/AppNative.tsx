import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNext, setWaitingForNext] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [errorTimeout, setErrorTimeout] = useState(null);
  const [isError, setIsError] = useState(false);

  const formateaNumero = (num) => {
    const parsed = parseFloat(num);
    return Number.isInteger(parsed) ? String(parsed) : parsed.toFixed(3);
  };

  const parseDisplay = () => parseFloat(display) || 0;

  const inputDigito = (digito) => {
    if (waitingForNext) {
      setDisplay(String(digito));
      setIsError(false);
      setWaitingForNext(false);
    } else {
      if (display === "0" || isError) {
        setDisplay(String(digito));
        setIsError(false);
      } else {
        setDisplay(display + String(digito));
      }
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setWaitingForNext(false);
    setIsError(false);
  };

  const backspace = () => {
    if (!isError) {
      setDisplay((d) => (d.length > 1 ? d.slice(0, -1) : "0"));
    }
  };

  const calcula = (a, operador, b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operador) {
      case "+": return a + b;
      case "-": return a - b;
      case "*": return a * b;
      case "/":
        if (b === 0) {
          if (errorTimeout) clearTimeout(errorTimeout);
          setDisplay("Error división por 0");
          setIsError(true);
          const timeout = setTimeout(() => {
            setDisplay(formateaNumero(a));
            setIsError(false);
          }, 2000);
          setErrorTimeout(timeout);
          return null;
        }
        return a / b;
      default: return b;
    }
  };

  const manejaOperador = (nextOp) => {
    const current = parseDisplay();
    if (previous == null) {
      setPrevious(current);
    } else if (operator) {
      const resultado = calcula(previous, operator, current);
      if (resultado !== null) {
        setPrevious(resultado);
        setDisplay(formateaNumero(resultado));
      }
    }
    setOperator(nextOp);
    setWaitingForNext(true);
  };
// ✅ Función para manejar el botón "="
// ✅ Si hay un operador y un número previo, realiza el cálculo
// ✅ Muestra el resultado en el display si es válido
// ✅ Resetea el número previo y el operador
// ✅ Establece el estado para esperar el siguiente número
// ✅ Formatea el resultado antes de mostrarlo
// ✅ No realiza cálculos si hay un error previo
  const manejaIgual = () => {
    if (operator && previous != null) {
      const current = parseDisplay();
      const resultado = calcula(previous, operator, current);
      if (resultado !== null) {
        setDisplay(formateaNumero(resultado));
        setPrevious(null);
        setOperator(null);
        setWaitingForNext(true);
      }
    }
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  const renderBoton = (label, bgColor, textColor, onPress, flex = 1) => (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor, flex }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: darkMode ? "#1c1c1c" : "#f0f0f0" }]}>
      <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
        <Text style={styles.themeButtonText}>
          {darkMode ? "Modo Luz" : "Modo Oscuro"}
        </Text>
      </TouchableOpacity>

      <View style={styles.display}>
        <Text
          style={{
            color: isError ? "red" : "white",
            fontSize: isError ? 28 : 48,
            textAlign: "right",
          }}
        >
          {display}
        </Text>
      </View>

      <View style={styles.row}>
        {renderBoton("AC", "#a5a5a5", "white", clearAll)}
        {renderBoton("⌫", "#a5a5a5", "white", backspace)}
        {renderBoton(".", "#333333", "white", () => inputDigito("."))}
        {renderBoton("/", "#F89B10", "white", () => manejaOperador("/"))}
      </View>

      <View style={styles.row}>
        {renderBoton("7", "#333333", "white", () => inputDigito(7))}
        {renderBoton("8", "#333333", "white", () => inputDigito(8))}
        {renderBoton("9", "#333333", "white", () => inputDigito(9))}
        {renderBoton("*", "#F89B10", "white", () => manejaOperador("*"))}
      </View>

      <View style={styles.row}>
        {renderBoton("4", "#333333", "white", () => inputDigito(4))}
        {renderBoton("5", "#333333", "white", () => inputDigito(5))}
        {renderBoton("6", "#333333", "white", () => inputDigito(6))}
        {renderBoton("-", "#F89B10", "white", () => manejaOperador("-"))}
      </View>

      <View style={styles.row}>
        {renderBoton("1", "#333333", "white", () => inputDigito(1))}
        {renderBoton("2", "#333333", "white", () => inputDigito(2))}
        {renderBoton("3", "#333333", "white", () => inputDigito(3))}
        {renderBoton("+", "#F89B10", "white", () => handleOperator("+"))}
      </View>

      <View style={styles.row}>
        {renderBoton("0", "#333333", "white", () => inputDigito(0), 2)}
        {renderBoton("=", "#F89B10", "white", manejaIgual, 2)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "flex-end",
  },
  display: {
    height: 140,
    backgroundColor: "#a5a5a5",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 20,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: 35,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  themeButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#555",
    borderRadius: 8,
  },
  themeButtonText: {
    color: "white",
    fontSize: 16,
  },
});

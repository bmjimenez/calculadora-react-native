import { Link } from 'expo-router';

import { Text, View } from "react-native";

export default function HomeScreenWeb() {
  return (
    <View>
      <Text><div style={{ textAlign: 'center' }}>Home Screen</div></Text>
      <Text><div style={{ textAlign: 'center' }}>Bienvenido a la calculadora</div></Text>
      <div align="center"><Link href="/AppWeb"><img align="center" width="480" height="480" src="https://img.icons8.com/color/480/apple-calculator.png" alt="apple-calculator"/></Link></div>

      <Link href="/InfoScreen"><Text><div style={{ textAlign: 'center' }}>Acerca de la app</div></Text></Link>
      <Text><div style={{ textAlign: 'center' }}>Bernardo Moya 2025 TecMilenio Curso React Avanzado</div></Text>
    </View>
  );
}

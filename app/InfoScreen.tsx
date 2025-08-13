import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function InfoScreen(){
     return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Calculadora basica</Text>
                <Text>Bernardo Moya</Text>
                <Text>Agosto 2025</Text>
                <Text>Curso react Tec Milenio</Text>
                
                <Link type="image/png" sizes="120x120" rel="icon" href=".../icons8-calculator-color-120.png"></Link>
                <img width="480" height="480" src="https://img.icons8.com/color/480/apple-calculator.png" alt="apple-calculator"/>
                <Link href="/" style={{ marginTop: 20 }}>Ir al home</Link>
            </View>
        )
}
import { Text, View } from "react-native";
import { styles } from "./style";

export default function ListDiet(){
    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.cell}>Abacaxi</Text>
                <Text style={styles.cell}> 2 fatias médias</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.cell}>Suco de Laranja</Text>
                <Text style={styles.cell}> 200ml</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.cell}>Pão de forma</Text>
                <Text style={styles.cell}> 2 fatias</Text>
            </View>
        </View>
    );
}
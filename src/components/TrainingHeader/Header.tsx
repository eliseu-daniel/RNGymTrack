import { Text, View } from "react-native";
import { styles } from "./style";

export default function TrainingHeader() {
  return (
    <View style={styles.headerTable}>
        <Text style={styles.headerTableText} >Série</Text>
        <Text style={styles.headerTableText} >Anterior</Text>
        <Text style={styles.headerTableText} >Kg</Text>
        <Text style={styles.headerTableText} >Rep</Text>
        <Text style={styles.headerTableText} >Check</Text>
    </View>
  );
}
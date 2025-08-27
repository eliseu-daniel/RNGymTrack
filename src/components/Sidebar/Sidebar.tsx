import { Text, View } from "react-native";
import Button from "../Button/Button";
import { styles } from "./style";

export default function Sidebar() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Eliseu</Text>
      </View>
      <View style={styles.menu}>
        <Button title="Treinos" textStyle={styles.items} style={styles.button}/>
        <Button title="Dietas" textStyle={styles.items} style={styles.button}/>
        <Button title="Feedbacks" textStyle={styles.items} style={styles.button}/>
      </View>
    </View>
  );
}
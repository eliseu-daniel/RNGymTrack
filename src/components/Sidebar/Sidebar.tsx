import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import Button from "../Button/Button";
import { styles } from "./style";

export default function Sidebar() {
  const router = useRouter();
  const handleNavigationTraining = () => {
      router.push('/trainning');
  };

  const handleNavigationDiet = () => {
      router.push('/diet');
  };

  const handleNavigationFeedback = () => {
      router.push('/feedback');
  };

  const hadleNavigationLogout = () => { 
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Eliseu</Text>
      </View>
      <View style={styles.menu}>
        <Button title="Treinos" onPress={handleNavigationTraining} textStyle={styles.items} style={styles.button}/>
        <Button title="Dietas" onPress={handleNavigationDiet} textStyle={styles.items} style={styles.button}/>
        <Button title="Feedbacks" onPress={handleNavigationFeedback} textStyle={styles.items} style={styles.button}/>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity >
          <MaterialIcons name="logout" onPress={hadleNavigationLogout} size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
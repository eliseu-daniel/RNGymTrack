import http from "@/service/HttpService";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Button from "../Button/Button";
import { styles } from "./style";

export default function Sidebar() {
  const router = useRouter();
  const user = http.getPatient();

  const handleNavigationHome = () => {
    router.replace('/home');
  };

  const handleNavigationTraining = () => {
    router.replace('/trainning');
  };

  const handleNavigationDiet = () => {
    router.replace('/diet');
  };

  const handleNavigationFeedback = () => {
    router.replace('/feedback');
  };

  const hadleNavigationLogout = async () => {
    try {

      await http.logoutPatient();

      router.replace("/");

    } catch (error) {

      console.log(error);

      Alert.alert("Erro", "Erro ao fazer logout");

    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>{user?.name}</Text>
      </View>
      <View style={styles.menu}>
        <Button title="Home" onPress={handleNavigationHome} textStyle={styles.items} style={styles.button} />
        <Button title="Treinos" onPress={handleNavigationTraining} textStyle={styles.items} style={styles.button} />
        <Button title="Dietas" onPress={handleNavigationDiet} textStyle={styles.items} style={styles.button} />
        <Button title="Feedbacks" onPress={handleNavigationFeedback} textStyle={styles.items} style={styles.button} />
      </View>
      <View style={styles.logout}>
        <TouchableOpacity >
          <MaterialIcons name="logout" onPress={hadleNavigationLogout} size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
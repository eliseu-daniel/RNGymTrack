import Button from "@/components/Button/Button";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { Text, TextInput, View } from "react-native";
import { styles } from "./style";

export default function Index() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/home');
  }
  
  return (
    <View style={styles.container}>
        <Text style={styles.title}>GymTrackPro</Text>
        <Text style={styles.text}>E-mail</Text>
        <TextInput style={styles.input} placeholder="E-mail Cadastrado" 
          placeholderTextColor={colors.text}
        />
        <Button title= "Entrar" textColor={colors.text} 
          backgroundColor={colors.secondary}
          style={styles.button}
          textStyle= {styles.btnText}  
          onPress={handleLogin}
        />
    </View>
  );
}

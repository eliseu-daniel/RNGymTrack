import Button from "@/components/Button/Button";
import { colors } from "@/styles/colors";
import { Text, TextInput, View } from "react-native";
import { styles } from "./style";

export default function Index() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>GymTrackPro</Text>
        <Text style={styles.text}>E-mail</Text>
        <TextInput style={styles.input} placeholder="E-mail Cadastrado" placeholderTextColor={colors.text}/>
        <Text style={styles.text}>Senha</Text>
        <TextInput style={styles.input} placeholder="Senha Cadastrada" placeholderTextColor={colors.text}/>
        <Button title= "Entrar" textColor={colors.text} 
          backgroundColor={colors.secondary}
          style={styles.button}
          textStyle= {styles.btnText}  
        />
    </View>
  );
}

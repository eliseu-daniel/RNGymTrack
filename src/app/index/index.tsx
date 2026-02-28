import Button from "@/components/Button/Button";
import http from "@/service/HttpService";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";
import { styles } from "./style";

export default function Index() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!email) {
      Alert.alert("Erro", "Digite seu e-mail");
      return;
    }

    try {

      setLoading(true);

      const response = await http.loginPatient(email);

      // response.patient vem do backend
      const patient = response.patient;

      router.replace({
        pathname: "/home",
        params: {
          patientId: patient.id.toString(),
          patientName: patient.name,
        },
      });

    } catch (error: any) {

      console.log(error);

      Alert.alert(
        "Erro no login",
        error?.body?.message ||
        "E-mail não encontrado"
      );

    } finally {

      setLoading(false);

    }

  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>GymTrackPro</Text>
      <Text style={styles.text}>E-mail</Text>
      <TextInput style={styles.input} placeholder="E-mail Cadastrado"
        placeholderTextColor={colors.text}
        value={email}
        onChangeText={setEmail}
      />
      {
        loading ? (
          <ActivityIndicator
            size="large"
            color={colors.secondary}
            style={{ marginTop: 20 }}
          />) : (
          <Button title="Entrar" textColor={colors.text}
            backgroundColor={colors.secondary}
            style={styles.button}
            textStyle={styles.btnText}
            onPress={handleLogin}
          />
        )
      }
    </View>
  );
}

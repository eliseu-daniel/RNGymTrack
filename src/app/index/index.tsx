import Button from "@/components/Button/Button";
import http from "@/service/HttpService";
import { colors } from "@/styles/colors";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, View } from "react-native";
import { styles } from "./style";

export default function Index() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    async function checkSession() {
      await http.ready();
      const token = http.getToken();
      if (token) {
        router.replace("/home");
        return;
      }
      setCheckingSession(false);
    }
    checkSession();
  }, []);

  const handleLogin = async () => {
    if (!email) {
      Alert.alert("Erro", "Digite seu e-mail");
      return;
    }

    try {
      setLoading(true);
      const response = await http.loginPatient(email);
      router.replace("/home");
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

  if (checkingSession) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color={colors.secondary}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SynchroFit</Text>
      <Text style={styles.text}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail Cadastrado"
        placeholderTextColor={colors.text}
        value={email}
        onChangeText={setEmail}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.secondary}
          style={{ marginTop: 20 }}
        />
      ) : (
        <Button
          title="Entrar"
          textColor={colors.text}
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
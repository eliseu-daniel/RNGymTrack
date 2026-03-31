import Button from "@/components/Button/Button";
import exerciseService, { ExerciseData } from "@/service/ExerciseService";
import { colors } from "@/styles/colors";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { styles } from "./style";

export default function Video() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [exercise, setExercise] = useState<ExerciseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const fetchExercise = async () => {
      try {
        const data = await exerciseService.getExercise(Number(id));

        setExercise(data);
      } catch (error) {
        console.error("Erro ao buscar exercício:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  const getEmbedUrl = (url: string) => {
    if (!url || typeof url !== "string") return url;
    return url;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text>Exercício não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Button
          title="←"
          onPress={handleBack}
          style={styles.button}
          textStyle={styles.btnText}
          textColor={colors.text}
        />
        <Text style={styles.textBlue}>
          {exercise?.exercise || "Nome não disponível"}
        </Text>
        <Text style={styles.text}>Execução:</Text>
        <View style={styles.link}>
          <Pressable onPress={() => Linking.openURL(exercise.link_exercise)}>
            <Text style={styles.linkText}>Ver no YouTube</Text>
          </Pressable>
        </View>
        <View style={styles.videoContent}>
          {exercise.link_exercise ? (
            <WebView
              source={{ uri: getEmbedUrl(exercise.link_exercise) }}
              style={styles.video}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
            />
          ) : (
            <Text style={styles.text}>Vídeo não disponível.</Text>
          )}
        </View>
      </View>
    </View>
  );
}

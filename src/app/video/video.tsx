import Button from "@/components/Button/Button";
import exerciseService, { ExerciseData } from "@/service/ExerciseService";
import { colors } from "@/styles/colors";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Linking, Pressable, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { styles } from "@/styles/pages/video/style";

export default function Video() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [exercise, setExercise] = useState<ExerciseData | null>(null);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

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

  const getVideoId = (url: string): string => {
    if (!url || typeof url !== "string") return "";

    const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
    if (embedMatch?.[1]) return embedMatch[1];

    const watchMatch = url.match(/[?&]v=([^&]+)/);
    if (watchMatch?.[1]) return watchMatch[1];

    const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
    if (shortMatch?.[1]) return shortMatch[1];

    return "";
  };

  const videoId = useMemo(() => {
    return exercise?.link_exercise ? getVideoId(exercise.link_exercise) : "";
  }, [exercise]);

  const embedHtml = useMemo(() => {
    if (!videoId) return "";
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; background-color: #000; }
            html, body { width: 100%; height: 100%; }
            iframe { width: 100%; height: 100%; border: none; }
          </style>
        </head>
        <body>
          <iframe
            src="https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0&modestbranding=1&autoplay=0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </body>
      </html>
    `;
  }, [videoId]);

  const handleVideoError = () => {
    setVideoError(true);
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
          {exercise.exercise || "Nome não disponível"}
        </Text>

        <Text style={styles.text}>Execução:</Text>

        <View style={styles.link}>
          <Pressable onPress={() => Linking.openURL(exercise.link_exercise)}>
            <Text style={styles.linkText}>Ver no YouTube</Text>
          </Pressable>
        </View>

        <View style={styles.videoContent}>
          {videoId && !videoError ? (
            <WebView
              source={{ html: embedHtml, baseUrl: "https://www.youtube.com" }}
              style={styles.video}
              originWhitelist={["*"]}
              javaScriptEnabled
              domStorageEnabled
              allowsInlineMediaPlayback
              mediaPlaybackRequiresUserAction={false}
              allowsFullscreenVideo
              scalesPageToFit={false}
              mixedContentMode="always"
              onError={handleVideoError}
              onHttpError={(e) => {
                if (e.nativeEvent.statusCode >= 400) {
                  setVideoError(true);
                }
              }}
            />
          ) : (
            <View style={styles.fallback}>
              <Text style={styles.fallbackText}>
                {videoError
                  ? "Este vídeo não permite reprodução incorporada."
                  : "Vídeo não disponível."}
              </Text>
              {exercise.link_exercise ? (
                <Pressable
                  style={styles.fallbackButton}
                  onPress={() => Linking.openURL(exercise.link_exercise)}
                >
                  <Text style={styles.fallbackButtonText}>
                    ▶ Assistir no YouTube
                  </Text>
                </Pressable>
              ) : null}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

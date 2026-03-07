import http from "@/service/HttpService";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    (async () => {
      await http.ready();
      const token = http.getToken();

      const first = segments[0];
      const isLogin = first === "index";

      const protectedRoutes = [
        "diet",
        "dietSelected",
        "home",
        "training",
        "trainingSelected",
        "feedback",
        "feedbackSelected",
      ];

      if (!token && protectedRoutes.includes(first)) {
        router.replace("index");
        return;
      }

      if (token && isLogin) {
        router.replace("/home");
        return;
      }
    })();
  }, [segments]);

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{ headerShown: false }}
    />
  );
}
import httpWorkout from "@/service/WorkoutService";
import { colors } from "@/styles/colors";
import { buildWeekFromItems, DateWeek, WeekDayKey } from "@/utils/dataTraining";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import Button from "../Button/Button";
import Exercises from "../ListExercises/Exercises";
import TrainingHeader from "../TrainingHeader/Header";
import TrainingTitle from "../TrainingTitle/Title";
import { styles } from "./style";

export default function Training() {
  const router = useRouter();
  const { day } = useLocalSearchParams<{ day: WeekDayKey }>();
  const selectedDay = (day ?? "segunda") as WeekDayKey;
  const [week, setWeek] = useState<DateWeek>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const items = await httpWorkout.getWorkoutItems();

        const built = buildWeekFromItems(items, {
          onlyActive: true,
          sortByName: false,
        });

        setWeek(built);
      } catch (e) {
        console.log("Erro carregando treinos:", e);
        setWeek([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const exercises = useMemo(() => {
    return week?.[0]?.[selectedDay]?.exercises ?? [];
  }, [week, selectedDay]);

  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const startRest = (seconds: number) => {
    if (!seconds || seconds <= 0) return;
    setTimerSeconds(seconds);
    setTimerRunning(true);
  };

  const stopRest = () => {
    setTimerRunning(false);
    setTimerSeconds(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current as unknown as number);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (timerRunning && timerSeconds && timerSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (!prev) return 0;
          if (prev <= 1) {
            setTimerRunning(false);
            if (intervalRef.current) {
              clearInterval(intervalRef.current as unknown as number);
              intervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000) as unknown as number;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current as unknown as number);
        intervalRef.current = null;
      }
    };
  }, [timerRunning]);

  const formatTime = (s: number | null) => {
    if (!s || s <= 0) return "00:00";
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleFinishTraining = () => {
    router.back();
  };

  type RenderSeriesProps = {
    series: number;
    anterior?: string | null;
    kg: number;
    rep: number;
    rest_time?: number | null;
  };

  const renderSeries = ({ series, anterior, kg, rep, rest_time }: RenderSeriesProps) => {
    return Array.from({ length: series }, (_, index) => (
      <Exercises
        key={`${index}`}
        series={index + 1}
        anterior={anterior ?? "--"}
        kg={kg}
        rep={rep}
        rest_time={rest_time}
        onStartRest={startRest}
        onStopRest={stopRest}
      />
    ));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.FinishTraining}>
        <Button
          title="Terminar"
          onPress={handleFinishTraining}
          textStyle={styles.btnFinishTrainingText}
          style={styles.btnFinish}
        />
      </View>

      <View>
        <Text style={styles.dayOfWeek}>
          {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}
        </Text>
      </View>

      <View>
        <Text style={styles.timer}>{timerSeconds && timerSeconds > 0 ? `Descanso ${formatTime(timerSeconds)}` : ""}</Text>
      </View>

      <View style={styles.trainingContainer}>
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <TrainingTitle title={item.title} />
              <TrainingHeader />
              {renderSeries({
                series: item.series,
                anterior: item.anterior,
                kg: item.kg,
                rep: item.rep,
                rest_time: item.rest_time ?? null,
              })}
            </View>
          )}
          style={styles.divider}
          showsVerticalScrollIndicator={true}
          ListEmptyComponent={
            <Text style={{ marginTop: 12, color: colors.text }}>
              Nenhum exercício para {selectedDay}.
            </Text>
          }
        />
      </View>
    </View>
  );
}
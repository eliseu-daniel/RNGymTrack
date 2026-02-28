import httpWorkout from "@/service/WorkoutService";
import { colors } from "@/styles/colors";
import { buildWeekFromItems, DateWeek, WeekDayKey } from "@/utils/dataTraining";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
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

  const handleFinishTraining = () => {
    router.back();
  };

  type RenderSeriesProps = {
    series: number;
    anterior?: string | null;
    kg: number;
    rep: number;
  };

  const renderSeries = ({ series, anterior, kg, rep }: RenderSeriesProps) => {
    return Array.from({ length: series }, (_, index) => (
      <Exercises
        key={`${index}`}
        series={index + 1}
        anterior={anterior ?? "--"}
        kg={kg}
        rep={rep}
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
        <Text style={styles.timer}>Timer {/* Colocar um timer aqui */}</Text>
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
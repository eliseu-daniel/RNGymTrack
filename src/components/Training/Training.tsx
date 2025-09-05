import { DateWeek } from "@/utils/dataTraining";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";
import Button from "../Button/Button";
import Exercises from "../ListExercises/Exercises";
import TrainingHeader from "../TrainingHeader/Header";
import TrainingTitle from "../TrainingTitle/Title";
import { styles } from "./style";

export default function Training() {
  const router = useRouter();
  const { day } = useLocalSearchParams<{day: keyof DateWeek[0]}>();
  const selectedDay = day;
  const exercises = DateWeek[0][selectedDay]?.exercises || [];


  const handleFinishTraining = () => {
    router.back();
  };

  type renderSeriesProps = {
    series: number;
    anterior: string;
    kg: number;
    rep: number;
  };

  const renderSeries = ({ series, anterior, kg, rep }: renderSeriesProps) => {
    const seriesArray = Array.from({ length: series }, (_, index) => (
      <Exercises
        key={`${index}`} 
        series={index + 1}
        anterior={anterior}
        kg={kg}
        rep={rep}
      />
    ));
    return seriesArray;
  };

  
 
    return (
    <View style={styles.container}>
        <View style={styles.FinishTraining}>
            <Button title="Terminar" onPress={handleFinishTraining} 
                textStyle={styles.btnFinishTrainingText} 
                style={styles.btnFinish}
            />
        </View>
        <View>
            <Text style= {styles.dayOfWeek}>{selectedDay.charAt(0).toUpperCase()+selectedDay.slice(1)}</Text>
        </View>
        <View>
            <Text style={styles.timer}>Timer {/* Colocar um timer aqui */} </Text> 
        </View>
        <View style={styles.trainingContainer}>
            <FlatList data={exercises} keyExtractor={(item) => item.id} renderItem={({item}) => (
                <View> 
                    <TrainingTitle title={item.title} />
                    <TrainingHeader />
                    {renderSeries({
                        series: item.series,
                        anterior: item.anterior,
                        kg: item.kg,
                        rep: item.rep,
                    })};
                </View>
             )} style={styles.divider} showsVerticalScrollIndicator = {true}
            />
        </View>
    </View>
  );
}
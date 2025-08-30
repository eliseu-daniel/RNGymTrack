
import { exerciseData } from "@/utils/dataTraining";
import { useRouter } from "expo-router";
import { FlatList, Text, View } from "react-native";
import Button from "../Button/Button";
import Exercises from "../ListExercises/Exercises";
import TrainingHeader from "../TrainingHeader/Header";
import TrainingTitle from "../TrainingTitle/Title";
import { styles } from "./style";

export default function Training() {
  const router = useRouter();

  const handleFinishTraining = () => {
    router.back();
  }
 
    return (
    <View style={styles.container}>
        <View style={styles.FinishTraining}>
            <Button title="Terminar" onPress={handleFinishTraining} 
                textStyle={styles.btnFinishTrainingText} 
                style={styles.btnFinish}
            />
        </View>
        <View>
            <Text style= {styles.dayOfWeek}>Segunda</Text>
        </View>
        <View>
            <Text style={styles.timer}>Timer {/* Colocar um timer aqui */} </Text> 
        </View>
        <View style={styles.trainingContainer}>
            <FlatList data={exerciseData} keyExtractor={item => item.id} renderItem={({item}) => (
                <View> 
                    <TrainingTitle title={item.title} />
                    <TrainingHeader />
                    <Exercises series={item.series} anterior={item.anterior} kg={item.kg} rep={item.rep}/>
                    <Exercises series={item.series} anterior={item.anterior} kg={item.kg} rep={item.rep}/>
                    <Exercises series={item.series} anterior={item.anterior} kg={item.kg} rep={item.rep}/>
                    <Exercises series={item.series} anterior={item.anterior} kg={item.kg} rep={item.rep}/>
                </View>
             )} style={styles.divider} showsVerticalScrollIndicator = {true}
            />
        </View>
    </View>
  );
}
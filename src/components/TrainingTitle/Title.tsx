import { router } from "expo-router";
import { Text, View } from "react-native";
import Button from "../Button/Button";
import { styles } from "./style";

type TitleProps = {
  id: number;
  title: string;
};

export default function TrainingTitle({ title, id }: TitleProps) {
  const handleViewExecution = () => {
    router.push(`/video/video?id=${id}`);
  };

  return (
    <View>
      <Button title={title} onPress={handleViewExecution} textStyle={styles.textTitle} style={styles.titleTraining}/>
    </View>
  );
}
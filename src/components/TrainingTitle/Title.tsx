import { router } from "expo-router";
import { Text, View } from "react-native";
import Button from "../Button/Button";
import { styles } from "./style";

type TitleProps = {
  title: string;
};

export default function TrainingTitle({ title }: TitleProps) {
  const handleViewExecution = () => {
    router.push("/video/video");
  };

  return (
    <View>
      {/* <Text style={styles.titleTraining}>{title}</Text> */}
      <Button title={title} onPress={handleViewExecution} textStyle={styles.textTitle} style={styles.titleTraining}/>
    </View>
  );
}
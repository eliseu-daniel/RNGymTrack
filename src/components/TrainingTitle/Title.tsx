import { Text, View } from "react-native";
import { styles } from "./style";

type TitleProps = {
    title: string;
};

export default function TrainingTitle({ title }: TitleProps) {
  return (
    <View>
        <Text style={styles.titleTraining}>{title}</Text>
    </View>
  );
}
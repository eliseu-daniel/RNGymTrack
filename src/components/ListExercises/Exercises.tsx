import { useState } from "react";
import { StyleProp, Text, TextProps, TextStyle, View } from "react-native";
import Check from "../CheckBox/Check";
import { styles } from "./style";

type ExercisesProps = {
  series: number;
  anterior: string;
  kg: number;
  rep: number;
  style?: StyleProp<TextStyle>;
  rest_time?: number | null;
  onStartRest?: (seconds: number) => void;
  onStopRest?: () => void;
  [key: string]: any;
} & TextProps;

export default function Exercises({ series, anterior, kg, rep, style, rest_time, onStartRest, onStopRest, ...props }: ExercisesProps) {
  const [isChecked, setChecked] = useState<boolean>(false);

  const handleChange = (v: boolean) => {
    setChecked(v);
    if (v) {
      const seconds = typeof rest_time === 'number' && !isNaN(rest_time) ? rest_time : 30;
      onStartRest?.(seconds);
    } else {
      onStopRest?.();
    }
  };

  return (
    <View style={styles.ColumTable}>
      <Text style={styles.TableContentText} {...props}>{series}</Text>
      <Text style={styles.TableContentText}>{anterior}</Text>
      <Text style={styles.TableContentText}>{kg}</Text>
      <Text style={styles.TableContentText}>{rep}</Text>
      <Check value={isChecked} onValueChange={handleChange} style={styles.checkBox} />
    </View>
  );
}
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
    [key:string]: any;
}& TextProps;

export default function Exercises({ series, anterior, kg, rep, style, ...props }: ExercisesProps) {
  const [isChecked, setChecked] = useState<boolean>(false);
  
  return (
    <View style={styles.ColumTable}>
        <Text style={styles.TableContentText} {...props}>{series}</Text>
        <Text style={styles.TableContentText}>{anterior}</Text>
        <Text style={styles.TableContentText}>{kg}</Text>
        <Text style={styles.TableContentText}>{rep}</Text>
        <Check value={isChecked} onValueChange={setChecked} style={styles.checkBox}/>
    </View>
  );
}
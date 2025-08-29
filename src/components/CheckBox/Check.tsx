import Checkbox from "expo-checkbox";
import { StyleProp, ViewStyle } from "react-native";

type CheckProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

export default function Check({ value, onValueChange, style}: CheckProps) {
  return (
    <Checkbox value={value} onValueChange={onValueChange}  style={style} />
  );
}
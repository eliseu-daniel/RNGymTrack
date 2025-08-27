
import { StyleProp, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type ButtonProps = {
    title: string;
    onPress?: () => void; // Depois trocar isso por uma função que faz algo
    backgroundColor?: string;
    textColor?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    [key:string]: any; // Permite passar outras props do TouchableOpacity
};

export default function Button({title, onPress, backgroundColor, 
    textColor, style, textStyle,...props}: ButtonProps) {
    return (
        <TouchableOpacity style={[{backgroundColor}, style]} 
        onPress={onPress} activeOpacity={0.6} {...props}>
            <Text style={[{color: textColor}, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}
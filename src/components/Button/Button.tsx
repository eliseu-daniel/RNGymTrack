import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './style';

type ButtonProps = {
    title: string;
    onPress?: () => void; // Depois trocar isso por uma função que faz algo
    backgroundColor?: string;
    textColor?: string;
};

export default function Button({title, onPress, backgroundColor, textColor}: ButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, {backgroundColor}]} onPress={onPress} activeOpacity={0.6}>
            <Text style={[styles.text, {color: textColor}]}>{title}</Text>
        </TouchableOpacity>
    );
}
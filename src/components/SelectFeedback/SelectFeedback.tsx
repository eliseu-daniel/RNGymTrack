import { useState } from "react";
import { Text, View } from "react-native";


export default function SelectFeedback(){
    const [selectedValue, setSelectedValue] = useState(null);

    const pickerItemsDiet = [
        {label: 'Café da manhã', value: 'Café da manhã'},
        {label: 'Lanche da manhã', value: 'Lanche da manhã'},
        {label: 'Almoço', value: 'Almoço'},
        {label: 'Lanche da tarde', value: 'Lanche da Tarde'},
        {label: 'Jantar', value: 'Jantar'},
        {label: 'Ceia', value: 'Ceia'},
    ];

    const pickerItemsTraining = [
        {label: 'Segunda'},
        {label: 'Terça', value: 'Terça'},
        {label: 'Quarta', value: 'Quarta'},
        {label: 'Quinta', value: 'Quinta'},
        {label: 'Sexta', value: 'Sexta'},
        {label: 'Sabado', value: 'Sabado'},
        {label: 'Domingo', value: 'Domingo'}
    ];

    return(
        <View>
            <Text>TESTE</Text>
        </View>
    );
}
import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create( {
    container:{
        marginTop: 40,
        margin: 10,
        height: "93%",
        backgroundColor: colors.dark,
        borderRadius: 10,
    },
    FinishTraining: {
        marginTop: 20,
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingRight: 10,
    },
    btnFinish: {
        backgroundColor: colors.green,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    btnFinishTrainingText: 
    {
        color: colors.text,
        fontSize: 18,
        fontWeight: "bold",
    },
    trainingContainer: {
        marginTop: 20,
    },
    dayOfWeek:{
        fontSize: 22,
        color: colors.blue,
        paddingLeft: 20,
    },
    timer:{
        marginTop: 10,
        marginLeft: 20,
        fontSize: 18,
        color: colors.text,
    },
    titleTraining:
    {
        marginLeft: 20,
        fontSize: 20,
        color: colors.blue,
    },
    headerTable: {
        flexDirection: "row",
        justifyContent: "space-around",
        color: colors.text,
        marginTop: 10,
    },
    headerTableText: {
        color: colors.text,
        fontSize:18,
    },
    ColumTable: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        alignItems: "center",
    },
    TableContentText: {
        color: colors.text,
        fontSize: 16,
    },
    checkBox: {
        width: 20,
        height: 20,
        tintColor: colors.text,
    },
});
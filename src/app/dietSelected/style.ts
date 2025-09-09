import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.secondary,  
        alignItems: 'center',
        justifyContent: 'center',
    },
    content:{
       backgroundColor: colors.text,
       width: '90%',
       height: '90%',
       marginTop: 20,
    },
    button: {
        width: "14%",
        textAlign: "center",
        alignItems: "center",
        backgroundColor: colors.secondary,
        borderRadius: 5,
        padding: 5,
        margin: 3,
    },
    btnText: {
        fontSize: 20,
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    text:{
        fontSize: 30,
    },
    table: {
        marginTop: 20,
        width: "90%",
        left: 20
    },
});
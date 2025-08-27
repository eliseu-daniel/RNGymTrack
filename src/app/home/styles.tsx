import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.secondary,        
    },
    header:{
        height: 100,
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        color: colors.text,
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    sections:{
        alignItems: "center",
        marginTop: 20,
        justifyContent: "center"
    },
    button: {
        width: "90%",
        textAlign: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.text,
        borderRadius: 5,
        padding: 10,
        margin: 2,
    },
    btnText: {
        fontSize: 20,

    }
})
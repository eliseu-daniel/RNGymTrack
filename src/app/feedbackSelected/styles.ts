import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",
    },
    content:{
        width: "90%",
        backgroundColor: colors.primary,
        marginTop: 20,
        height: "90%"
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
        color: colors.text,
    },
});
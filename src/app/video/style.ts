import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        backgroundColor: colors.dark,
        width: '90%',
        height: '90%',
        marginTop: 20,
        borderRadius: 10,
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
    textBlue: {
        fontSize: 24,
        color: colors.blue,
        paddingLeft: 20,
    },
    text: {
        paddingTop: 20,
        fontSize: 24,
        color: colors.text,
        paddingLeft: 20,
    },
    table: {
        marginTop: 20,
        width: "90%",
        left: 20
    },
    link: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    linkText: {
        textAlign: "center",
        color: colors.blue,
        fontSize: 24,
        marginTop: 30,
    },
    videoContent: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    video: {
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        paddingLeft: 20,
        minHeight: 240,
        backgroundColor: colors.text,
        borderRadius: 12,
        overflow: "hidden",
    }
});
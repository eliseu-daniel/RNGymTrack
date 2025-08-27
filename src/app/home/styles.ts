import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.secondary,        
    },
    menuContainer:{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 30, // Menu por cima da Sidebar
    },
    sidebar:{
        position: 'absolute',
        width: '50%',
        height: '100%',
        backgroundColor: colors.primary,
        zIndex: 20, // Sidebar por cima de outros elementos
        padding: 20,
    },
    header:{
        height: 100,
        marginTop: 30,
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
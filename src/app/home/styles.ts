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
        marginTop: 70,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 36,
        color: colors.text,
        fontWeight: "bold",
        
    },
    content:{
        alignItems: "center",
        marginTop: 20,
        justifyContent: "center"
    },
    subtitle:{
        fontSize: 24,
        color: colors.text,
    }
});
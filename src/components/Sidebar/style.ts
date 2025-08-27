import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.primary,
        width: "50%",
    },
    header:{
        marginLeft: 20,
        marginTop: 20,
    },
    text:{
        color: colors.text,
        fontSize: 20,
        fontWeight: "bold",
    },
    menu:{
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 20,   
        marginLeft: 20,     
    },
    items:{
        color: colors.text,
        fontSize: 18, 
    },
    button: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
        backgroundColor: colors.secondary, // ver com chat como fazer uma borda piscante quando clico, igual o hover
    },

})
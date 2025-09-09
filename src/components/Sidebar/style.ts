import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.primary,
    },
    header:{
        marginTop: 70,
        marginLeft: 30,
    },
    text:{
        color: colors.text,
        fontSize: 28,
        fontWeight: "bold",
    },
    menu:{
        justifyContent: "center",
        marginTop: 20,   
        marginLeft: 20,  
          
    },
    items:{
        color: colors.text,
        fontSize: 24, 
    },
    button: {
        padding: 8,
        borderRadius: 8,
        justifyContent: 'center',
        
    },
    logout:{
        position: "absolute",
        bottom: 10,
        
    },
    sair:{
        color: colors.text,
        fontSize: 18,
    },

})
import { colors } from '@/styles/colors';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
        padding:20,
        fontFamily: "SourceSerif4-Regular"
    },
    title:{
        textAlign: "center",
        fontSize: 36,
        color: "#FFFFFF",
        marginBottom: 40,
    },
    text: {
        fontSize: 20,
        color: colors.text,
        textAlign: "left",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        width: "100%",
        alignSelf: "center",
        borderColor: colors.text,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 18,
        color: colors.text,
    },
    button: {
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    btnText:{
        fontSize: 16,
        fontWeight: 'bold',
    }
}
);
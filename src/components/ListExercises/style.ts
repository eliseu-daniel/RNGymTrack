import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    ColumTable: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
        alignItems: "center",
        
    },TableContentText: {
        color: colors.text,
        fontSize: 16,
    },
    checkBox: {
        width: 20,
        height: 20,
        tintColor: colors.text,
    },
});
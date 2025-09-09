import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    row:{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: colors.borderTable,
        borderTopColor: colors.borderTable,
        alignItems: "center"
    },
    cell: {
        flex: 1,
        padding: 12,
        textAlign: "center",
        minHeight: 40,
        fontSize: 24
    },
});
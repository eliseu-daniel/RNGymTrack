import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    headerTableText: {
        color: colors.text,
        fontSize:18,
    },
    headerTable: {
        flexDirection: "row",
        justifyContent: "space-around",
        color: colors.text,
        marginTop: 10,
        marginLeft: 10,
    },
});
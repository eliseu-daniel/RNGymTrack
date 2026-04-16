import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 18,
    },

    content: {
        width: "90%",
        maxWidth: 360,
        minHeight: 480,
        height: "82%",
        backgroundColor: colors.primary,
        borderRadius: 14,
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 14,
    },

    button: {
        width: 42,
        height: 30,
        borderRadius: 6,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 0,
        paddingHorizontal: 0,
        marginBottom: 2,
    },

    btnText: {
        fontSize: 20,
        lineHeight: 22,
        fontWeight: "400",
        color: colors.text,
    },

    title: {
        alignItems: "center",
        justifyContent: "center",
        // marginTop: -24,
        // marginBottom: 22,
    },

    text: {
        fontSize: 30,
        color: colors.text,
    },

    formArea: {
        flex: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingTop: 102,
        paddingBottom: 16,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    selectWrapper: {
        position: "absolute",
        top: 18,
        left: 10,
        right: 10,
        zIndex: 20,
    },

    selectButton: {
        minHeight: 40,
        backgroundColor: "#D9D9D9",
        borderRadius: 10,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    selectButtonOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },

    selectButtonText: {
        flex: 1,
        textAlign: "center",
        fontSize: 18,
        color: colors.dark,
    },

    selectArrow: {
        fontSize: 18,
        color: colors.dark,
        marginLeft: 8,
    },

    selectDropdown: {
        backgroundColor: "#D9D9D9",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        maxHeight: 185,
        paddingVertical: 8,
    },

    selectScroll: {
        maxHeight: 175,
    },

    optionItem: {
        paddingVertical: 6,
        paddingHorizontal: 12,
    },

    optionText: {
        textAlign: "center",
        fontSize: 18,
        color: colors.dark,
    },

    label: {
        color: colors.text,
        fontSize: 16,
        marginBottom: 6,
    },

    textArea: {
        height: 145,
        backgroundColor: "#D9D9D9",
        padding: 10,
        fontSize: 16,
        color: colors.dark,
        marginBottom: 18,
    },

    submitButton: {
        width: "100%",
        minHeight: 48,
        borderRadius: 6,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },

    submitButtonText: {
        fontSize: 18,
        fontWeight: "400",
        color: colors.text,
    },
});
import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    menuContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 30, // Menu por cima da Sidebar
    },
    sidebar: {
        position: 'absolute',
        width: '50%',
        height: '100%',
        backgroundColor: colors.primary,
        zIndex: 20, // Sidebar por cima de outros elementos
        padding: 20,
    },
    header: {
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
    content: {
        alignItems: "center",
        marginTop: 20,
        justifyContent: "center"
    },
    subtitle: {
        fontSize: 24,
        color: colors.text,
    },
    notificationButton: {
        position: "absolute",
        right: 20,
        top: -10,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    notificationBadge: {
        position: "absolute",
        top: -10,
        right: 0,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
        borderWidth: 1,
        borderColor: "#fff",
    },

    notificationBadgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },

    notificationDropdown: {
        position: "absolute",
        top: 100,
        right: 18,
        width: 290,
        maxHeight: 320,
        backgroundColor: colors.primary,
        borderRadius: 10,
        zIndex: 50,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },

    notificationHeader: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.15)",
    },

    notificationTitle: {
        color: colors.text,
        fontSize: 16,
        fontWeight: "bold",
    },

    notificationList: {
        maxHeight: 260,
    },

    notificationListContent: {
        paddingBottom: 6,
    },

    notificationItem: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.12)",
        backgroundColor: colors.primary,
    },

    notificationItemUnread: {
        backgroundColor: "#6aa9a9",
    },

    notificationItemTitle: {
        color: colors.text,
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 4,
    },

    notificationItemMessage: {
        color: colors.text,
        fontSize: 12,
        marginBottom: 6,
    },

    notificationItemDate: {
        color: "rgba(255,255,255,0.75)",
        fontSize: 10,
    },

    notificationEmpty: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },

    notificationEmptyText: {
        color: colors.text,
        fontSize: 13,
    },
});
import Menu from "@/components/Menu/Menu";
import Sidebar from "@/components/Sidebar/Sidebar";
import { http } from "@/service/HttpService";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

type NotificationItem = {
    id: string;
    type: string;
    title: string;
    message: string;
    created_at?: string | null;
    read?: boolean;
};

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
    const [notifications, setNotifications] = React.useState<NotificationItem[]>([]);
    const [loadingNotifications, setLoadingNotifications] = React.useState(false);

    const user = http.getPatient();

    const unreadCount = notifications.filter((item) => !item.read).length;

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchNotifications = React.useCallback(async () => {
        try {
            setLoadingNotifications(true);

            const [dietResponse, workoutResponse] = await Promise.allSettled([
                http.request("/patients/notifications/diet-items"),
                http.request("/patients/notifications/workout-items"),
            ]);

            const dietItems =
                dietResponse.status === "fulfilled"
                    ? Array.isArray(dietResponse.value)
                        ? dietResponse.value.map((item) => ({
                              ...item,
                              id: String(item.id ?? item.diet_item_id ?? ""),
                              type: item.type ?? "diet",
                              title: item.title ?? "Nova atualização na dieta",
                              message:
                                  item.message ?? "Seu plano alimentar foi atualizado.",
                              created_at: item.created_at ?? null,
                              read: !!item.read,
                          }))
                        : []
                    : [];

            const workoutItems =
                workoutResponse.status === "fulfilled"
                    ? Array.isArray(workoutResponse.value)
                        ? workoutResponse.value.map((item) => ({
                              ...item,
                              id: String(item.id ?? item.workout_item_id ?? ""),
                              type: item.type ?? "workout",
                              title: item.title ?? "Novo treino atualizado",
                              message: item.message ?? "Seu treino foi atualizado.",
                              created_at: item.created_at ?? null,
                              read: !!item.read,
                          }))
                        : []
                    : [];

            const allNotifications = [...dietItems, ...workoutItems].sort((a, b) => {
                const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
                const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
                return dateB - dateA;
            });

            setNotifications(allNotifications);
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
            setNotifications([]);
        } finally {
            setLoadingNotifications(false);
        }
    }, []);

    React.useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const toggleNotifications = async () => {
        const nextState = !isNotificationOpen;
        setIsNotificationOpen(nextState);

        if (nextState) {
            await fetchNotifications();
        }
    };

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((item) => (item.id === id ? { ...item, read: true } : item))
        );
    };

    const formatDate = (date?: string | null) => {
        if (!date) return "-";
        const parsed = new Date(date);
        if (Number.isNaN(parsed.getTime())) return "-";
        return parsed.toLocaleString("pt-BR");
    };

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <Menu toggleSidebar={toggleSidebar} />
            </View>

            {isSidebarOpen && (
                <View style={styles.sidebar}>
                    <Sidebar />
                </View>
            )}

            <View style={styles.header}>
                <Text style={styles.title}>Synchro Fit</Text>
                <Pressable onPress={toggleNotifications} style={styles.notificationButton}>
                    <Ionicons name="notifications-outline" size={26} color="#FFFFFF" />

                    {unreadCount > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationBadgeText}>
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>

            {isNotificationOpen && (
                <View style={styles.notificationDropdown}>
                    <View style={styles.notificationHeader}>
                        <Text style={styles.notificationTitle}>Notificações</Text>
                    </View>

                    {loadingNotifications ? (
                        <View style={styles.notificationEmpty}>
                            <Text style={styles.notificationEmptyText}>Carregando...</Text>
                        </View>
                    ) : notifications.length === 0 ? (
                        <View style={styles.notificationEmpty}>
                            <Text style={styles.notificationEmptyText}>
                                Nenhuma notificação.
                            </Text>
                        </View>
                    ) : (
                        <ScrollView
                            style={styles.notificationList}
                            contentContainerStyle={styles.notificationListContent}
                            nestedScrollEnabled
                            showsVerticalScrollIndicator
                        >
                            {notifications.map((item) => (
                                <Pressable
                                    key={item.id}
                                    onPress={() => markAsRead(item.id)}
                                    style={[
                                        styles.notificationItem,
                                        !item.read && styles.notificationItemUnread,
                                    ]}
                                >
                                    <Text style={styles.notificationItemTitle}>{item.title}</Text>
                                    <Text style={styles.notificationItemMessage}>{item.message}</Text>
                                    <Text style={styles.notificationItemDate}>
                                        {formatDate(item.created_at)}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    )}
                </View>
            )}

            <View style={styles.content}>
                <Text style={styles.subtitle}>Bem-vindo, {user?.name}.</Text>
            </View>
        </View>
    );
}
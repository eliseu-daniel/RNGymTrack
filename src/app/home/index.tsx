import Menu from "@/components/Menu/Menu";
import Sidebar from "@/components/Sidebar/Sidebar";
import http from "@/service/HttpService";
import NotificationService, {NotificationItem,} from "@/service/NotificationService";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "@/styles/pages/home/styles";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(
    [],
  );
  const [loadingNotifications, setLoadingNotifications] = React.useState(false);

  const user = http.getPatient();

  const unreadCount = NotificationService.getUnreadCount(notifications);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchNotifications = React.useCallback(async () => {
    try {
      setLoadingNotifications(true);
      const allNotifications = await NotificationService.getAllNotifications();
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

  const markAsRead = async (id: string, alreadyRead?: boolean) => {
    if (alreadyRead) return;

    try {
      await NotificationService.markAsRead(id);
      setNotifications((prev) =>
        NotificationService.updateReadStatus(prev, id),
      );
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error);
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications
      .filter((item) => !item.read)
      .map((item) => item.id);

    if (unreadIds.length === 0) return;

    try {
      await NotificationService.markAllAsRead();
      setNotifications((prev) => NotificationService.updateAllReadStatus(prev));
    } catch (error) {
      console.error("Erro ao marcar todas como lidas:", error);
    }
  };

  const formatDate = (date?: string | null) => {
    return NotificationService.formatDate(date);
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

        <Pressable
          onPress={toggleNotifications}
          style={styles.notificationButton}
        >
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

            {notifications.length > 0 && unreadCount > 0 && (
              <Pressable onPress={markAllAsRead}>
                <Text style={styles.markAllAsReadText}>
                  Marcar todas como lidas
                </Text>
              </Pressable>
            )}
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
                  onPress={() => markAsRead(item.id, item.read)}
                  style={[
                    styles.notificationItem,
                    !item.read && styles.notificationItemUnread,
                  ]}
                >
                  <Text style={styles.notificationItemTitle}>{item.title}</Text>

                  {!!item.message && (
                    <Text style={styles.notificationItemMessage}>
                      {item.message}
                    </Text>
                  )}

                  {!!item.comment && (
                    <Text style={styles.notificationItemComment}>
                      {item.comment}
                    </Text>
                  )}

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

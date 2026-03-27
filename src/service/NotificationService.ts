import http from "@/service/HttpService";

export type NotificationItem = {
  id: string;
  type: string;
  title: string;
  message?: string | null;
  comment?: string | null;
  patient_id: number;
  read?: boolean;
  educator_id?: number;
  created_at?: string | null;
};

class NotificationService {
  private normalizeItems(items: any[]): NotificationItem[] {
    return items.map((item) => ({
      id: String(item.id),
      type: String(item.type ?? ""),
      title: String(item.title ?? ""),
      message: item.message ?? null,
      comment: item.comment ?? null,
      patient_id: Number(item.patient_id),
      read: Boolean(item.read),
      educator_id:
        item.educator_id != null ? Number(item.educator_id) : undefined,
      created_at: item.created_at ?? null,
    }));
  }

  async getAllNotifications(): Promise<NotificationItem[]> {
    const dietResponse = await http.request("/patients/notifications/diet-items");
    const workoutResponse = await http.request("/patients/notifications/workout-items");

    const notifications = Array.isArray(dietResponse)
      ? this.normalizeItems(dietResponse)
      : [];

    const workoutNotifications = Array.isArray(workoutResponse)
      ? this.normalizeItems(workoutResponse)
      : [];

    return [...notifications, ...workoutNotifications].sort((a, b) => {
      const dateA = a.created_at
        ? new Date(a.created_at.replace(" ", "T")).getTime()
        : 0;
      const dateB = b.created_at
        ? new Date(b.created_at.replace(" ", "T")).getTime()
        : 0;
      return dateB - dateA;
    });
  }

  sortNotificationsByDate(notifications: NotificationItem[]): NotificationItem[] {
    return notifications.sort((a, b) => {
      const dateA = a.created_at
        ? new Date(a.created_at.replace(" ", "T")).getTime()
        : 0;
      const dateB = b.created_at
        ? new Date(b.created_at.replace(" ", "T")).getTime()
        : 0;
      return dateB - dateA;
    });
  }

  async markAsRead(id: string | number) {
    return await http.request(`/patients/notifications/${id}/read`, "POST");
  }

  async markManyAsRead(ids: Array<string | number>) {
    return await http.request("/patients/notifications/read", "POST", {
      body: JSON.stringify({
        ids: ids.map((id) => Number(id)),
      }),
    });
  }

  async markAllAsRead() {
    return await http.request("/patients/notifications/read", "POST", {
      body: JSON.stringify({
        all: true,
      }),
    });
  }

  updateReadStatus(
    notifications: NotificationItem[],
    id: string,
  ): NotificationItem[] {
    return notifications.map((item) =>
      item.id === id ? { ...item, read: true } : item,
    );
  }

  updateManyReadStatus(
    notifications: NotificationItem[],
    ids: string[],
  ): NotificationItem[] {
    return notifications.map((item) =>
      ids.includes(item.id) ? { ...item, read: true } : item,
    );
  }

  updateAllReadStatus(notifications: NotificationItem[]): NotificationItem[] {
    return notifications.map((item) => ({
      ...item,
      read: true,
    }));
  }

  getUnreadCount(notifications: NotificationItem[]): number {
    return notifications.filter((item) => !item.read).length;
  }

  formatDate(date?: string | null): string {
    if (!date) return "-";

    const parsed = new Date(date.replace(" ", "T"));

    if (Number.isNaN(parsed.getTime())) return "-";

    return parsed.toLocaleString("pt-BR");
  }
}

export default new NotificationService();

import { NotificationsRepository } from '@app/repositories/notifications'
import { Notification } from '@app/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = []

  async findById(id: string): Promise<Notification | null> {
    const notification = this.notifications.find((item) => item.id === id)

    if (!notification) {
      return null
    }

    return notification
  }

  async create(notification: Notification) {
    this.notifications.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex(
      (item) => item.id === notification.id,
    )

    if (index >= 0) {
      this.notifications[index] = notification
    }
  }
}

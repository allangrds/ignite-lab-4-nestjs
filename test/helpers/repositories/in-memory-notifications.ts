import { NotificationsRepository } from '@app/repositories/notifications'
import { Notification } from '@app/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = []

  async create(notification: Notification) {
    this.notifications.push(notification)
  }
}

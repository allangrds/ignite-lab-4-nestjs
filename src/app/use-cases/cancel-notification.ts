import { Injectable } from '@nestjs/common'

import { NotificationsRepository } from '../repositories/notifications'
import { NotificationNotFound } from './errors/notification-not-found'

interface CancelNotificationRequest {
  id: string
}

type CancelNotificationResponse = void

//frameworkd code, creating a dependency bad :(
@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: CancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const notification = await this.notificationRepository.findById(request.id)

    if (!notification) {
      throw new NotificationNotFound()
    }

    notification.cancel()

    await this.notificationRepository.save(notification)
  }
}

import { Injectable } from '@nestjs/common'

import { Content } from './../entities/content'
import { Notification } from '../entities/notification'
import { NotificationsRepository } from '../repositories/notifications'

interface SendNotificationRequest {
  recipientId: string
  content: string
  category: string
}

interface SendNotificationResponse {
  notification: Notification
}

//frameworkd code, creating a dependency bad :(
@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const notification = new Notification({
      recipientId: request.recipientId,
      content: new Content(request.content),
      category: request.category,
    })

    await this.notificationRepository.create(notification)

    return {
      notification,
    }
  }
}

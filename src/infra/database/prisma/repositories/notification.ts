import { PrismaNotificationMapper } from './../mappers/notification'
import { Injectable } from '@nestjs/common'

import { Notification } from '@app/entities/notification'
import { NotificationsRepository } from '@app/repositories/notifications'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(id: string): Promise<Notification | null> {
    throw new Error('Method not implemented.')
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prismaService.notification.create({
      data: raw,
    })
  }

  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { NotificationsRepository } from '../../app/repositories/notifications'
import { PrismaNotificationRepository } from './prisma/repositories/notification'

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}

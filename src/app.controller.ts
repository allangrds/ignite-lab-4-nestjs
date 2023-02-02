import { CreateNotificationBody } from './create-notification-body'
import { PrismaService } from './prisma.service'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { randomUUID } from 'node:crypto'

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany()
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const resource = await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content: body.content,
        category: body.category,
        recipientId: body.recipientId,
      },
    })

    return {
      status: 'success',
      statusCode: 201,
      id: resource.id,
      message: 'Notification created',
    }
  }
}

import { CancelNotification } from './cancel-notification'
import { InMemoryNotificationsRepository } from '@test/helpers/repositories/in-memory-notifications'
import { Content } from '@app/entities/content'
import { Notification } from '@app/entities/notification'

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const notification = new Notification({
      category: 'social',
      content: new Content('This is a notification'),
      recipientId: 'example-recipient-id',
    })

    await notificationsRepository.create(notification)
    await cancelNotification.execute({
      id: notification.id,
    })

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to cancel a non existing notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    expect(() =>
      cancelNotification.execute({
        id: 'fake',
      }),
    ).rejects.toThrow('Notification not found')
  })
})

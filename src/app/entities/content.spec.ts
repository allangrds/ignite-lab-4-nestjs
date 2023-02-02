import { Content } from './content'

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Você recebeu uma solicitação de amizade')

    expect(content).toBeTruthy()
  })

  it('should be not be able to create a notification content with less than 5 characters', () => {
    const content = () => new Content('Você')

    expect(content).toThrowError(
      'Content length must be between 5 and 240 characters.',
    )
  })

  it('should be not be able to create a notification content with greather than 240 characters', () => {
    const content = () => new Content('a'.repeat(241))

    expect(content).toThrowError(
      'Content length must be between 5 and 240 characters.',
    )
  })
})

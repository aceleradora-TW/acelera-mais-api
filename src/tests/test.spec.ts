import { User } from '@models/User'

test('ola mundo', () => {
  const user = new User()
  user.name = 'test'
  expect(user.name).toBe('test')
})

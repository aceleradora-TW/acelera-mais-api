import { User } from '@models/entity/User'

test('ola mundo', () => {
  const user = new User()
  user.firstName = 'test'
  expect(user.firstName).toBe('test')
})

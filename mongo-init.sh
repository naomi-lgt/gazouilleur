db.createCollection('users')
db.createCollection('tweets')

db.users.insertMany(
  {
    nickname: 'test1',
    username: 'test1',
    password: '1234'
  },
  {
    nickname: 'test2',
    username: 'test2',
    password: '1234'
  },
  {
    nickname: 'test3',
    username: 'test3',
    password: '1234'
  },
)

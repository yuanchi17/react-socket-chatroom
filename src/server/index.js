// https://socket.io/docs/v4/server-initialization/#with-an-http-server
import { createServer } from 'http'
import { Server } from 'socket.io'

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

// chatroom server
io.on('connection', socket => {
  let isAdded = false
  console.log(`socket.io connect, id: ${socket.id}`)

  socket.on('user-login', user => {
    if (isAdded) return
    // 需更新成員名單
    socket.userName = user.name
    socket.broadcast.emit('new-user-join', user)
    isAdded = true
  })

  socket.on('add-old-user', ({ oldUser, newUserId }) => {
    // to individual socketid (private message)
    socket.to(newUserId).emit('add-old-user', oldUser)
  })

  socket.on('send-message', ({ msg, user }) => {
    socket.broadcast.emit('send-message', { msg, user })
  })

  socket.on('disconnect', () => {
    console.log(`socket.io disconnect, id: ${socket.id}, name: ${socket.userName}`)
    socket.broadcast.emit('del-user', { id: socket.id, name: socket.userName })
  })
})

httpServer.listen(4000, () => {
  console.log('httpServer listening on PORT: 4000')
})

import Peer from 'simple-peer'
import io from 'socket.io-client'

export const strict = false

export const DEFAULT_PARAMS = {
  SIG_URL: 'https://178.128.119.82:8000',
  RTC_CONFIG: {
    iceServers: [
      {
        urls: 'turn:178.128.119.82:3478',
        username: 'khang',
        credential: '123456'
      },
      {
        urls: 'stun:178.128.119.82:3478',
        username: 'khang',
        credential: '123456'
      }
    ]
  },
  MEDIA_OPTS: {audio: true, video: true},
  OFFER_OPTS: {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  },
}

export function User(username, localStream, onStream) {
  this.signalingServer = io(DEFAULT_PARAMS.SIG_URL, {
    secure: true,
    path: '/ws'
  })
  this.signalingServer.on('connection', () => {
    this.signalingServer.emit('login', username)
  })
  this.signalingServer.on('initiate', data => {
    this.initConnection(true, data.from)
  })
  this.signalingServer.on('signal', data => {
    if (this.connections.has(data.from)) {
      this.connections.get(data.from).connection.signal(data.content)
    }
  })

  this.username = username
  this.localStream = localStream
  this.connections = new Map()
  this.initConnection = (isCalled, toUser) => {
    let connection
    if (isCalled) {
      connection = new Peer({stream: this.localStream})
    } else {
      connection = new Peer({
        initiator: true,
        stream: this.localStream
      })

      this.signalingServer.emit('initiate', {
        from: this.username,
        to: toUser,
        content: ''
      })
    }

    const peerConnection = new Connection(connection,
      this.username, toUser,
      this.signalingServer, onStream)
    this.connections.set(toUser, peerConnection)
  }
  this.callUser = (toUser) => this.initConnection(false, toUser)
  this.sendData = (data, toUser) => {
    if (this.connections.has(toUser)) {
      this.connections.get(toUser).connection.send(data)
    }
  }
}

export function Connection(connection, fromUser, toUser, signalingServer, onStream) {
  this.connection = connection
  this.from = fromUser
  this.to = toUser
  this.status = 'unconnected'
  this.remoteStream = undefined
  this.signalingServer = signalingServer

  this.connection.on('signal', data => {
    this.signalingServer.emit('signal', {
      from: this.from,
      to: this.to,
      content: data
    })
  })

  this.connection.on('connect', () => {
    this.status = 'connected'
    console.log(`${this.from} connected to ${this.to}`)
  })

  this.connection.on('error', error => {
    throw error
  })

  this.connection.on('data', data => {
    console.log(`${this.from}: ${data.toString()}`)
  })

  this.connection.on('stream', stream => {
    this.remoteStream = stream
    onStream(stream)
  })
}

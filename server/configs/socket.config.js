import { Server } from 'socket.io'
import { createServer } from 'http'
import express from 'express'
import ENV_CONFIG from './env.config'

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: [ENV_CONFIG.URL_WEBSITE],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200,
  },
})

export { io, server, app }

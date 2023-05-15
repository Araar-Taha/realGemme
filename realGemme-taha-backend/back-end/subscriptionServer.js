const { createServer } =  require('http')
const { PubSub, SubscriptionManager } = require('graphql-subscriptions')
const { SubscriptionServer } = require('subscriptions-transport-ws')

const setupFunctions = require('./setupFunctions')

const EventEmitter = require('events')
EventEmitter.defaultMaxListeners = 5000 // TODO Use redis transport

export const pubsub = new PubSub()

export const SUBSCRIPTIONS_ENDPOINT = `${process.env.WS_PROTOCOL}://${process.env.HOST}:${process.env.WS_PORT}`

export default ({ schema }) => {
  const WS_PORT = process.env.WS_PORT

  const subscriptionManager = new SubscriptionManager({
    schema,
    pubsub,
    setupFunctions
  })

  const websocketServer = createServer((request, response) => {
    response.writeHead(404)
    response.end()
  })

  websocketServer.listen(WS_PORT, () => {
    console.log(`🌎 WS Server is now running on ${SUBSCRIPTIONS_ENDPOINT}`)
  })

  process.on('SIGINT', () => {
    console.log('Bye from WS 👋 SIGINT')
    websocketServer.close()
  })

  const subscriptionServer = new SubscriptionServer( // eslint-disable-line 
    {
      onConnect: async (connectionParams, ws) => {
        console.log('✅  SubscriptionServer onConnect 🌏!', ws._socket.remoteAddress, ws._socket.remotePort)
      },
      onSubscribe: async (message, params, wsRequest) => {
        console.log('✅  SubscriptionServer onSubscribe 😄')
        return Promise.resolve(params)
      },
      onUnsubscribe: () => {
        console.log('✅  SubscriptionServer onUnsubscribe 👋')
      },
      onDisconnect: (webSocket) => {
        console.log('✅  SubscriptionServer onDisconnect ❌')
      },
      subscriptionManager
    },
    {
      server: websocketServer,
      path: '/'
    }
  )
}
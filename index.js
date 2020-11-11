'use strict'

// Inputs
const roomAlias = process.env.m_room_alias
const username = process.env.m_username
const password = process.env.m_password

if (!roomAlias || !username || !password) {
    console.log('Credentials not set. Exiting.')
    process.exit(1)
}

// Import the Matrix JS SDK
const sdk = require('matrix-js-sdk')

const App = {

    client: null,

    bootstrap: async function bootstrap() {
        this.client = sdk.createClient({
            baseUrl: 'https://matrix.org'
            // We won't pass auth parameters here
        })

        try {
            await this.login()
            await this.client.startClient()
            console.log('Logged in')
            await this.sync()
            console.log('Sync started')
            await this.join()
            await this.send()
            await this.recv()
            await this.stop()
        } catch (err) {
            console.error(`${err.errcode} - ${err.httpStatus}`)
            if (this.client) this.client.stopClient()
            process.exit(1)
        }
    },

    login: function login() {
        // Instead, we will log in using password
        return this.client.login('m.login.password', {
            user: username,
            password: password
        })
    },

    sync: function () {
        return new Promise((resolve, reject) => {
            this.client.on('sync', (state, prevState, res) => {
                if (state === 'PREPARED') {
                    resolve()
                } else {
                    reject(res)
                }
            })
        })
    },

    join: function join() {
        // Use client.joinRoom(roomAlias, opts)
        return this.client.joinRoom(roomAlias)
    },

    send: function sendGreeting() {
        // Use client.sendMessage(roomAlias, content)
        return this.client.sendMessage(roomAlias, {
            body: 'OHAI!',
            msgtype: 'm.room.message'
        })
    },

    recv: function recvGreeting() {
        // Use client.on('Room.timeline, (e, room, start) => {})
        return new Promise((resolve, reject) => {
            this.client.on("Room.timeline", (e, room, toStartOfTimeline) => {
                const event = e.event
                if (e.getType() === "m.room.message" && event.content.body.toLowerCase().startsWith('hello')) {
                    console.log(`Received *hello* from ${event.sender}`)
                    resolve()
                } else {
                    console.log(`[${e.getType()}] ${event.sender}: ${event.content.body}`)
                }
            })
        })
    },

    stop: function stop() {
        this.client.stopClient()
        console.log("I'm done. Bye.")
        process.exit(0)
    }

}

// Launch
App.bootstrap()
<template>
    <div class="root">
        <div class="card col-lg-6 offset-lg-3">
            <div v-if="!ready" id="set-user">
                <h3>Enter your username</h3>
                <form @submit.prevent="setUser">
                    <div class="form-group row">
                        <input v-model="currentUser" type="text" class="form-control col-9" id="message-input" placeholder="Enter username" autocomplete="off">
                        <input type="submit" value="Set username" class="btn btn-sm btn-info ml-1">
                    </div>
                </form>
            </div>
            <div v-else id="chat-window">
                <div class="card-header bg-info">
                    Chat client application
                    <span class="text-white">{{currentUser}}</span>
                    <span v-for="(user, index) in userTyping" :key="index" class="text-white align-right">{{user}}</span>
                </div>
                <div class="card-body">
                    <div v-for="(message, index) in messages" :key="index" :class="{'self-msg':message.user === 1}" style="line-height: 43px;">
                        <span v-if="message.user === 1" class="bg-success text-white">{{message.messageBody}}</span>
                        <span v-else class="bg-primary text-white">
                            <span class="lead">{{message.user}}:</span> {{message.messageBody}}</span>
                    </div>
                    <form @submit.prevent="send">
                        <div class="form-group">
                            <input v-model="newMessage" type="text" class="form-control" id="message-input" placeholder="Type here" autocomplete="off">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';

export default {
    data() {
        return {
            msg: 'vue app created',
            messages: [
                { user: 'Chat bot', messageBody: 'welcome message from chat bot' },
            ],
            newMessage: "",
            currentUser: "user",
            typing: false,
            userTyping: [],
            ready: false,
            socket : io('localhost:3000')
        }
    },
    watch: {
        newMessage(value) {
            value ? this.socket.emit('typing', { user: this.currentUser }) : this.socket.emit('stopTyping', { user: this.currentUser });
        }
    },
    methods: {
        send() {
            if (this.newMessage) {
                this.socket.emit('newMessage', { user: this.currentUser, messageBody: this.newMessage });
                this.newMessage = "";
            }
        },
        setUser(){
            this.ready = true;
        }
    },
    mounted() {
        this.currentUser += (Math.round(Math.random() * 10000));
        this.socket.emit('userConnected', this.currentUser);

        this.socket.on('newMessage', (data) => {
            if (data.user == this.currentUser) {
                data.user = 1
            }
            this.messages.push(data);
        });

        this.socket.on('newUser', (data) => {
        });

        this.socket.on('userTyping', data => {
            let index = this.userTyping.indexOf(data.user);
            if (index === -1) {
                this.userTyping.push(data.user);
            }
        });

        this.socket.on('userStopTyping', data => {
            let index = this.userTyping.indexOf(data.user);
            if (index !== -1) {
                this.userTyping.splice(index, 1);
            }
        });
    }
}
</script>

<style>

</style>

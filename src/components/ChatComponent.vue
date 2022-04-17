<template>
    <div class="chat">
    <h1>Chat App</h1>
        <div class="input-group" v-if="!joined">
            <input type="text" v-model="currentUser"/>
            <button @click="join">JOIN</button>
        </div>
        <div class="input-group" v-if="joined">
            <input type="text" v-model="text" @keyup.enter="sendMessage()"/>
        </div>
        <div v-for="msg in messages" :key="msg.id">
            <p v-if="msg.user != currentUser"><strong>{{ msg.user }} : </strong> <em>{{ msg.textMsg }}</em></p>
            <p v-else><strong>Me : </strong> <em>{{ msg.textMsg }}</em></p>
        </div>
    </div>
</template>
<script>
import { ref } from "vue"
import io from "socket.io-client"
export default {
    setup(){
        const joined = ref(false)
        const currentUser = ref("")
        let socketInstance;
        
        let text = ref("")
        const messages = ref([])
        const join = () => {
            joined.value = true
            socketInstance = io("http://localhost:5000")   
            socketInstance.on("msg", (data) => { 
                messages.value.unshift(data)
            })
        }
        const sendMessage = () => {
            addMessage()
            text.value = ""
        }
        const addMessage = () => {
            
            const message = {
                id: new Date().getTime(),
                textMsg: text.value,
                user: currentUser.value
            }
            messages.value.unshift(message)
            socketInstance.emit('msg', message)
        }
        return { joined , join , currentUser, text, sendMessage, messages}
    }
}
</script>
<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>User name</label>
     <input v-model="username" required type="text" placeholder="Username"/>
     <label>Password</label>
     <input required v-model="password" type="password" placeholder="Password"/>
     <hr/>
     <button type="submit">Login</button>
   </form>
 </div>
</template>

<script>
import io from 'socket.io-client'; //TODO: MOVE TO NEW FILE

// Auth Module made in VueX

export default {
  data() {
    return {
      username: '',
      password: '',
      socket : io('localhost:3000') //TODO: MOVE TO NEW FILE
    }
  },
  methods: {
     login: function () {
        // Dispatch vuex action to socket
        // VueX - modules for each component
        // On success: redirect,
        // VueX service auth with promise
        
    }
  },
  mounted() {
      
  }
}
</script>
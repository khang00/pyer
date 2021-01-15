<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="2">
        <v-btn @click="login()">Login</v-btn>
      </v-col>
      <v-col align-self="center" cols="6">
        <v-text-field v-model="username" label="Username" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-container v-if="user !== undefined">
      <v-row align="center" justify="center">
        <video :src-object.prop.camel="localStream" autoplay></video>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="4">
          <v-btn @click="callUser()">Call To User</v-btn>
        </v-col>
        <v-col cols="8">
          <v-text-field v-model="calleeUsername" label="Username to be Called" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <StreamWindow :stream="test"></StreamWindow>
        <StreamWindow v-for="(remoteStream, index) in remoteStreams" :key="index"
                      :stream="remoteStream"></StreamWindow>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import StreamWindow from "~/components/StreamWindow";
import {DEFAULT_PARAMS, User} from "~/plugins/User";

export default {
  name: "index",
  data: () => {
    return {
      username: '',
      calleeUsername: '',
      localStream: '',
      user: undefined,
      connections: undefined,
      test: undefined
    }
  },
  components: {
    'stream-window': StreamWindow
  },
  computed: {
    remoteStreams() {
      const remoteStreams = []

      if (this.connections !== undefined) {
        for (let connection of this.connections.values()) {
          remoteStreams.push(connection.remoteStream)
        }
      }

      return remoteStreams
    }
  },
  methods: {
    async login() {
      this.localStream = await navigator.mediaDevices.getUserMedia(DEFAULT_PARAMS.MEDIA_OPTS)
      this.user = new User(this.username, this.localStream)
    },
    async callUser() {
      await this.user.callUser(this.calleeUsername)
      this.connections = this.user.connections
      this.test = this.user.connections.values()[0]
    }
  }
}
</script>

<style scoped>

</style>

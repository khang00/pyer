<template>
  <v-container>
    <v-row v-if="user === undefined" align="center" justify="center">
      <v-col cols="2">
        <v-btn @click="login()">Login</v-btn>
      </v-col>
      <v-col align-self="center" cols="6">
        <v-text-field v-model="username" label="Username" outlined></v-text-field>
      </v-col>
    </v-row>
    <v-container v-if="user !== undefined">
      <v-row align="center" justify="center">
        <v-col cols="2">
          <v-btn @click="callUser()">Call To User</v-btn>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="calleeUsername" label="Username to be Called" outlined></v-text-field>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <video :src-object.prop.camel="localStream" autoplay></video>
      </v-row>
      <v-row>
        <v-col v-for="(remoteStream, index) in remoteStreams" :key="index" cols="3" justify="space-around">
          <StreamWindow :stream="remoteStream"></StreamWindow>
        </v-col>
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
      remoteStreams: [],
      user: undefined,
    }
  },
  components: {
    'stream-window': StreamWindow
  },
  methods: {
    async login() {
      this.localStream = await navigator.mediaDevices.getUserMedia(DEFAULT_PARAMS.MEDIA_OPTS)
      this.user = new User(this.username, this.localStream, this.onStream)
    },
    async callUser() {
      await this.user.callUser(this.calleeUsername)
    },
    onStream(stream) {
      this.remoteStreams.push(stream)
    }
  }
}
</script>

<style scoped>

</style>

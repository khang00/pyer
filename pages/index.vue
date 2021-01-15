<template>
  <v-container>
    <video :src-object.prop.camel="localStream" autoplay></video>
    <label>
      <input v-model="username" type="text">
    </label>
    <v-button @click="call()">Call</v-button>

  </v-container>
</template>

<script>
import StreamWindow from "~/components/StreamWindow";
import {DEFAULT_PARAMS} from "~/plugins/User";

export default {
  name: "index",
  data: () => {
    return {
      username: '',
      calleeUsername: '',
      localStream: '',
    }
  },
  components: {
    'stream-window': StreamWindow
  },
  methods: {
    async call() {
      this.localStream = await navigator.mediaDevices.getUserMedia(DEFAULT_PARAMS.MEDIA_OPTS)
    }
  }
}
</script>

<style scoped>

</style>

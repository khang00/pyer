<template>
  <v-container v-if="stream !== undefined">
    <video width="250" height="200" :src-object.prop.camel="stream" autoplay></video>
  </v-container>
</template>

<script>
export default {
  name: "StreamWindow.vue",
  props: ['stream'],
}
</script>

<style scoped>

</style>

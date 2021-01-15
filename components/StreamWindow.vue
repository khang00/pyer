<template>
  <v-container v-if="stream !== undefined">
    <video :src-object.prop.camel="stream" autoplay></video>
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

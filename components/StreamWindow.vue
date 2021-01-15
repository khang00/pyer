<template>
  <v-container>
    <video :src-object.prop.camel="stream"></video>
  </v-container>
</template>

<script>
export default {
  name: "StreamWindow.vue",
  props: ['stream']
}
</script>

<style scoped>

</style>

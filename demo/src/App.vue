<template>
  <div id="app">
    <layout>
      <router-view></router-view>
    </layout>
    <!-- <Preview class="code-preview"></Preview> -->
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import Layout from './Layout.vue'
const Preview = defineAsyncComponent(() => import('./Preview/index.vue'))

export default {
  name: 'App',
  components: {
    Layout,
    Preview
  }
}
</script>

<style lang='less'>
* {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
}
#app {
  height: 100%;
}
.code-preview {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>

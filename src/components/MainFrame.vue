<template>
  <el-container>
    <NavHeader />
    <el-main>
      <CVLayer />
    </el-main>
  </el-container>
</template>

<script>
import NavHeader from './NavHeader.vue'
import CVLayer from './CVLayer.vue'

export default {
  name: 'MainFrame',
  components: {
    NavHeader,
    CVLayer
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped>

</style>


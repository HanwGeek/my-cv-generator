<template>
  <el-header>
    <div id='title'>{{title}}</div>
    <div id='ava-link'>
      <a id='avatar' href='https://hanwgeek.github.io/'>
        <img :src='avatar'>
      </a>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'NavHeader',
  data() {
    return {
      title: 'My CV Generator(暂不支持中文)',
      avatar: require("../assets/avatar.jpg")
    }
  }
}
</script>

<style scoped>
.el-header {
  position: fixed;
  width: 100%;
  height: 40px;
  top: 0;
  left: 0;
  color: #333;
  text-align: center;
  line-height: 60px;  
  z-index: 100;
  background-color: #FFF;
  box-shadow: 0 0 1px rgba(0,0,0,0.25);
}

#title {
  font-size: 24px;
  float: left;
  vertical-align: center;
}

#ava-link img {
  position: fixed;
  top: 10px;
  right: 15px;
  height: 40px;
  border-radius: 50%; 
}
</style>



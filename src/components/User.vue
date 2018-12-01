<template>
  <div id="user">
    <center>
      <el-card>
        <div id="title">{{title}}</div>
        <div id="cv">
          <img :src='cv'>
        </div>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button size="small" type="primary" @click="registerDialShow = true" round>Sign Up</el-button>
            <el-dialog
              title="Sign Up"
              :visible.sync="registerDialShow"
              width="500px">
              <el-form label-width="80px" size="small">
                <el-form-item label="UserName:">
                  <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                  <el-input v-model="password"></el-input>
                </el-form-item>
                <el-form-item label="Name">
                  <el-input v-model="name"></el-input>
                </el-form-item>            
                <el-form-item label="Gender">
                  <el-radio v-model="gender" label="Male">Male</el-radio>
                  <el-radio v-model="gender" label="Female">Female</el-radio>
                </el-form-item>               
                <el-form-item label="Phone:">
                  <el-input v-model="name"></el-input>
                </el-form-item>               
                <el-form-item label="Github:">
                  <el-input v-model="name"></el-input>
                </el-form-item>               
              </el-form>
              <el-row type="flex" justify="center">
                <el-col :span="12">
                  <el-button size="small" @click="registerDialShow = false" round>Cancel</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button size="small" type="primary" @click="register" round>OK</el-button>
                </el-col>
              </el-row>
            </el-dialog>
          </el-col>
          <el-col :span="12">
            <el-button size="small" type="primary" @click="loginDialShow = true" round>Sign Up</el-button>
            <el-dialog
              title="Log In"
              :visible.sync="loginDialShow"
              width="500px">
              <el-form label-width="80px" size="small">
                <el-form-item label="UserName:">
                  <el-input v-model="username" width="100px"></el-input>
                </el-form-item>
                <el-form-item label="Password">
                  <el-input v-model="password"></el-input>
                </el-form-item>
              </el-form>
              <el-row type="flex" justify="center">
                <el-col :span="12">
                  <el-button size="small" @click="loginDialShow = false" round>Cancel</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button size="small" type="primary" @click="login" round>OK</el-button>
                </el-col>
              </el-row>
            </el-dialog>
          </el-col>
        </el-row>
      </el-card>

    </center>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      title: 'Welcome to My CV Generator!',
      cv: require("../assets/cv.png"),
      registerDialShow: false,
      loginDialShow: false,
      username: null,
      password: null,
      name: null,
      gender: null,
      phone: null,
      github: null,
    }
  },
  methods: {
    register() {
      this.registerDialShow = false;
    },
    login() {
      this.loginDialShow = false;
    }
  }
}
</script>

<style>
.el-card {
  width: 600px;
  height: 500px;
}

.el-button {
  width: 100px;
}

.el-form-item {
  width: 300px;
}

.el-input {
  width: 200px;
}

#title {
  font-size: 20px;
}
#cv {
  height: 400px;
}
#cv img{
  position: relative;
  top: 40px;
  height: 300px;
}
</style>


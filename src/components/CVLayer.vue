<template>
  <div id="cv-layer">
    <center>
      <!-- 简历主界面 -->
      <el-card>
        <!-- 个人信息 -->
        <el-form label-width="80px" size="small">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <br>
          <el-row>
            <el-col :span="8" :offset="3">
              <el-form-item label="Name:">
              <el-input 
                v-model="cv.name"
                class="input">
              </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1" :offset="2">
              <el-form-item label="Gender:">
                <el-radio v-model="cv.gender" label="Male">Male</el-radio>
                <el-radio v-model="cv.gender" label="Female">Female</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" :offset="3">
            <el-form-item label="Phone:">
              <el-input 
                v-model="cv.phone"
                class="input">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col :span="1" :offset="2">
            <el-form-item label="GitHub:">
              <el-input 
                v-model="cv.github_url"
                class="input">
              </el-input>
            </el-form-item>
            </el-col>
          </el-row>
          <!-- 修改线条颜色 -->
          <el-row>
            修改线条颜色:
            <el-color-picker v-model="lineColor" size="mini"></el-color-picker>
          </el-row>
          <!-- 教育经历 -->        
          <el-row>  
            <el-col :span="4">
              <span class="subtitle">Education:</span>
            </el-col>
            <el-col :span="32">
              <el-input
                v-model="eduName"
                placeholder="填写教育经历"
                size="small">
              </el-input>
              <el-date-picker 
                v-model="eduStart"  
                type="month"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd"
                size="small">
              </el-date-picker>
              <el-date-picker 
                v-model="eduEnd"  
                type="month"
                placeholder="选择结束时间"
                value-format="yyyy-MM-dd"
                size="small">
              </el-date-picker>
              <el-button 
                icon="el-icon-circle-plus" 
                circle size="small"
                @click="addEdu"
                :disabled="eduCount> 2 ? true : false">
              </el-button>
            </el-col>
          </el-row>
          <hr class="separator" :style="{'background-color':lineColor}"/>
          <el-table class="tb-edit" :data="edus">
            <el-table-column
              prop="name"
              label="Name">
            </el-table-column>
            <el-table-column
              prop="start"
              label="Start Time">
            </el-table-column>
            <el-table-column
              prop="end"
              label="End Time">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                  <el-button size="small" type="danger" @click="deleteEdu(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 荣誉奖项 -->
          <el-row>
            <el-col :span="6">
              <span class="subtitle">Honor:</span>
            </el-col>
            <el-col :span="32">
              <el-input
                v-model="honorName"
                placeholder="填写荣誉奖项"
                size="small">
              </el-input>
              <el-date-picker 
                v-model="honorTime"  
                placeholder="选择获得时间"
                value-format="yyyy-MM-dd"
                size="small">
              </el-date-picker>
              <el-button 
                icon="el-icon-circle-plus" 
                circle size="small"
                @click="addHonor"
                :disabled="honorCount>2 ? true : false">
              </el-button>
            </el-col>
          </el-row>
          <el-row>
          <hr class="separator" :style="{'background-color':lineColor}"/>
          <el-table :data="honors">
            <el-table-column
              prop="name"
              label="Name">
            </el-table-column>
            <el-table-column
              prop="time"
              label="Time">
            </el-table-column>
             <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="deleteHonor(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
          </el-row>
          <el-row>
          <!-- 技能特长 -->
            <el-col :span="4">
              <span class="subtitle">Skill:</span>
            </el-col>
            <el-col :span="4">
              <el-input
                v-model="skillName"
                placeholder="填写技能特长"
                size="small">
              </el-input>
            </el-col>
            <el-col :offset="3" :span="5">
              <el-slider 
                v-model="skillProf"
                :step="20"
                show-stops>
              </el-slider>
            </el-col>
            <el-col :span="4">
              <el-button 
                icon="el-icon-circle-plus" 
                circle size="small"
                @click="addSkill"
                :disabled="skillCount>2?true:false">
              </el-button>
            </el-col>
          </el-row>
          <hr class="separator" :style="{'background-color':lineColor}"/>
          <el-table :data="skills">
            <el-table-column
              prop="name"
              label="Name">
            </el-table-column>
            <el-table-column
              prop="prof"
              label="Proficiency">
              <template slot-scope="scope">
                <el-progress :percentage="scope.row.prof"></el-progress>
              </template>
            </el-table-column>
             <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="danger" @click="deleteSkill(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-card>
      <br>
      <PDFGen 
        :imageUrl='this.imageUrl'
        :cv='this.cv'
        :edus='this.edus'
        :honors='this.honors'
        :skills='this.skills'
        :lineColor='this.lineColor'
      />
    </center>
  </div>
</template>

<script>
import "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";
import PDFGen from './PDFGen'
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: 'CVLayer',
  components: {
    PDFGen
  },
  data() {
    return {
      // 初始化所需变量
      imageUrl: "",
      eduCount: 0,
      honorCount: 0,
      skillCount: 0,
      eduName: null,
      eduStart: null,
      eduEnd: null,
      honorName: null,
      honorTime: null,
      skillName: null,
      skillProf: null,
      edus: [],
      honors: [],
      skills: [],
      lineColor: "#409EFF",
      cv: {
        name: null,
        gender: null,
        phone: null,
        github_url: null,
      }
    };
  },
  mounted () {
    // 用户登录信息初始化
    var userInfo = this.$route.params;
    this.cv.name = userInfo.name;
    this.cv.gender = userInfo.gender;
    this.cv.phone = userInfo.phone;
    this.cv.github_url = userInfo.github;
  },
  methods: {
    addEdu() {
      // 添加教育信息
      // 验证信息是否填满
      if (this.eduName == null || this.eduStart == null || this.eduEnd == null) {
        this.$message.error("Pleas fill all of the blank!");
        return;
      }
      this.edus.push({
        name: this.eduName,
        start: this.eduStart,
        end: this.eduEnd        
      });
      this.eduCount = this.edus.length;
      // 清空缓存
      this.eduName = null;
      this.eduStart = null;
      this.eduEnd = null;
    },
    addHonor() {
      // 添加荣誉信息
      // 验证信息是否填满
      if (this.honorName == null || this.honorTime == null) {
        this.$message.error("Pleas fill all of the blank!");
        return;        
      }
      this.honors.push({
        name: this.honorName,
        time: this.honorTime
      });
      this.honorCount = this.honors.length;
      // 清空缓存
      this.honorName = null;
      this.honorTime = null;
    },
    addSkill() {
      // 添加技能信息
      // 验证信息是否填满
      if (this.skillName == null) {
        this.$message.error("Pleas fill all of the blank!");
        return;        
      }
      this.skills.push({
        name: this.skillName,
        prof: this.skillProf
      });
      this.skillCount = this.skills.length;
      // 清空缓存
      this.skillName = null;

    },
    deleteEdu(index, r) {
      // 删除指定教育信息
      this.edus.splice(index, 1);
      this.eduCount = this.edus.length;
    },
    deleteHonor(index, r) {
      // 删除指定荣誉信息行
      this.honors.splice(index, 1);
      this.honorCount = this.honors.length;
    },
    deleteSkill(index, r) {
      // 删除指定技能信息行
      this.skills.splice(index, 1);
      this.skillCount = this.skills.length;
    },
    handleAvatarSuccess(res, file) {
      // 加载所上传的头像
      var reader = new FileReader();
      reader.readAsDataURL(file.raw); // Base64编码转换
      reader.onload = () => {
        this.imageUrl = reader.result;
      }
    },
    beforeAvatarUpload(file) {
      // 检测头像是否符合条件
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('The format of image can only be JPG!');
      }
      if (!isLt2M) {
        this.$message.error('The size of image cannot be over 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>
.el-card {
  height: 1188px;
  width: 840px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
}

.avatar-uploader-icon:hover {
  border-color: #409EFF;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-form-item {
  width: 300px;
}

.el-input {
  width: 200px;
}

.el-slider {
  width: 200px;
}

.separator {
  height: 6px;
  /* background-color: #409EFF; */
}

.subtitle {
  font-size: 22px;
  float: left;
}
</style>
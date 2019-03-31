<template>
  <div id="cv-layer">
    <center>
      <el-card>
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
            :disabled="eduCount>2?true:false">
          </el-button>
          <span class="subtitle">Education:</span>
          <hr class="separator"/>
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
          <span class="subtitle">Honor:</span>
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
            :disabled="honorCount>2?true:false">
          </el-button>
          <hr class="separator"/>
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
            <el-col :span="5">
              <span class="subtitle">Skill:</span>
            </el-col>
            <el-col :span="7">
          <el-input
            v-model="skillName"
            placeholder="填写技能特长"
            size="small">
          </el-input>
            </el-col>
            <el-col :span="2">
          <el-slider
            v-model="skillProf"
            :step="20"
            show-stops>
          </el-slider>
            </el-col>
          <el-button 
            icon="el-icon-circle-plus" 
            circle size="small"
            @click="addSkill"
            :disabled="skillCount>2?true:false">
          </el-button>
          <hr class="separator"/>
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
      <el-button type="primary" round @click="generatePDFMake">
        Generate
      </el-button>
    </center>
  </div>
</template>

<script>
import "pdfmake/build/pdfmake";
import "pdfmake/build/vfs_fonts";

export default {
  data() {
    return {
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
      cv: {
        name: null,
        gender: null,
        phone: null,
        github_url: null,
      }
    };
  },
  mounted () {
    var userInfo = this.$route.params;
    this.cv.name = userInfo.name;
    this.cv.gender = userInfo.gender;
    this.cv.phone = userInfo.phone;
    this.cv.github_url = userInfo.github;
  },
  methods: {
    generatePDFMake () {
      var cvStyle = {
        info: {
          fontSize: 20,
          width: '50%',
          alignment: 'center'
        },
        eduInfo: {
          fontSize: 20,
          width: '30%',
          alignment: 'center'
        },
        honorInfo: {
          fontSize: 20,
          width: '50%',
          alignment: 'center'
        },
        skillInfo: {
          fontSize: 20,
          width: '50%',
          alignment: 'center'
        }
      };
      
      var edus = [];
      var honors = [];
      var skills = [];

      for (var i = 0; i < this.edus.length; i++) {
        var _edu = {};
        _edu.columns = [];
        _edu.columnGap = 10;
        var edu = this.edus[i];
        _edu.columns.push({
          text: edu['name'],
          style: 'eduInfo'
        });
        _edu.columns.push({
          text: edu['start'],
          style: 'eduInfo'
        });
        // _edu.columns.push({
        //   text: '---',
        //   fontSize: 22,
        //   width: '10%'
        // })
        _edu.columns.push({
          text: edu['end'],
          style: 'eduInfo'
        });
        edus.push(_edu);
        edus.push({
          text: '\n',
          fontSize: 20,
        })
      }

      for (var i = 0; i < this.honors.length; i++) {
        var _honor = {};
        _honor.columns = [];
        _honor.columnGap = 10;
        var honor = this.honors[i];
        _honor.columns.push({
          text: honor['name'],
          style: 'honorInfo'
        });
        _honor.columns.push({
          text: honor['time'],
          style: 'honorInfo'
        });
        honors.push(_honor);
        honors.push({
          text: '\n',
          fontSize: 20,
        })
      }

      for (var i = 0; i < this.skills.length; i++) {
        var _skill = {};
        _skill.columns = [];
        _skill.columnGap = 10;
        var skill = this.skills[i];
        _skill.columns.push({
          text: skill['name'],
          style: 'skillInfo'
        });
        _skill.columns.push({
          canvas: [{
              type: 'line',
              x1: 0, y1: 12,
              x2: skill['prof'] * 2, y2: 12,
              lineWidth: 6,
              lineCap: 'round',
              lineColor: '#409EFF'
          }]  
        });
        skills.push(_skill);
        skills.push({
          text: '\n',
          fontSize: 20,
        })
      }
      skills.pop();

      var cvContent = [
        {
          image: this.imageUrl,
          width: 100,
          height: 100,
          alignment: 'center'
        },
        {
          text: '\n',
          fontSize: 20,
        },    
        {
          columns: [
            {
              text: this.cv.name,
              style: 'info'
            },
            {
              text: this.cv.gender,
              style: 'info'
            }
          ],
          columnGap: 10
        },
        {
          columns: [
            {
              text: this.cv.phone,
              style: 'info'
            },
            {
              text: this.cv.github_url,
              style: 'info'
            }
          ],
          columnGap: 10
        },
        {
          text: '\nEducation',
          fontSize: 22,
          alignment: 'left'
        },
        {
          canvas:[
            {
              type: 'line',
              x1: 0, y1: 5,
              x2: 510, y2: 5,
              lineWidth: 6,
              lineCap: 'round',
              lineColor: '#409EFF'
            }
          ]
        },
        {
          text: '\n',
          fontSize: 20,
        },        
        edus,
        {
          text: 'Honor',
          fontSize: 22,
          alignment: 'left'
        },
        {
          canvas:[
            {
              type: 'line',
              x1: 0, y1: 5,
              x2: 510, y2: 5,
              lineWidth: 6,
              lineCap: 'round',
              lineColor: '#409EFF'
            }
          ]
        },
        {
          text: '\n',
          fontSize: 20,
        },
        honors,
        {
          text: 'Skill',
          fontSize: 22,
          alignment: 'left'
        },
        {
          canvas:[
            {
              type: 'line',
              x1: 0, y1: 5,
              x2: 510, y2: 5,
              lineWidth: 6,
              lineCap: 'round',
              lineColor: '#409EFF'
            }
          ]
        },
        {
          text: '\n',
          fontSize: 20
        },
        skills
      ];
      var cv = {
        pageSize: 'A4',
        content: cvContent,
        styles: cvStyle
      }
      pdfMake.createPdf(cv).open();
    },
    addEdu() {
      this.edus.push({
        name: this.eduName,
        start: this.eduStart,
        end: this.eduEnd        
      });
      this.eduCount = this.edus.length;
    },
    addHonor() {
      this.honors.push({
        name: this.honorName,
        time: this.honorTime
      });
      this.honorCount = this.honors.length;
    },
    addSkill() {
      this.skills.push({
        name: this.skillName,
        prof: this.skillProf
      });
      this.skillCount = this.skills.length;
    },
    deleteEdu(index, r) {
      this.edus.splice(index, 1);
      this.eduCount = this.edus.length;
    },
    deleteHonor(index, r) {
      this.honors.splice(index, 1);
      this.honorCount = this.honors.length;
    },
    deleteSkill(index, r) {
      this.skills.splice(index, 1);
      this.skillCount = this.skills.length;
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = () => {
        this.imageUrl = reader.result;
      }
    },
    beforeAvatarUpload(file) {
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
/* .tb-edit .el-input {
  display: none;
} */

/* .tb-edit .current-row .el-input {
    display: block
} */

/* .tb-edit .current-row .el-input+span {
    display: none
} */

.separator {
  height: 8px;
  background-color: #409EFF;
}

.subtitle {
  font-size: 22px;
  float: left;
}
</style>



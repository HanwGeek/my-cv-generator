<template>
  <div>
    <el-button type="primary" round @click="generatePDFMake">
      Generate
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'PDFGen',
  props:['imageUrl', 'cv', 'edus', 'honors', 'skills', 'lineColor'],
  data () {
    return {
    }
  },
  methods: {
    generatePDFMake () {
      // 根据所填信息生成PDF版简历
      // 简历模板风格初始化
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
      
      // 初始化信息列表
      var edus = [];
      var honors = [];
      var skills = [];

      // 插入所添加的教育信息
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

      // 插入所添加的荣誉信息
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

      // 插入所添加的技能信息
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
              lineColor: this.lineColor
          }]  
        });
        skills.push(_skill);
        skills.push({
          text: '\n',
          fontSize: 20,
        })
      }
      skills.pop();

      // 开始渲染
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
              lineColor: this.lineColor
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
              lineColor: this.lineColor
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
              lineColor: this.lineColor
            }
          ]
        },
        {
          text: '\n',
          fontSize: 20
        },
        skills
      ];
      
      // 整合简历
      var cv = {
        pageSize: 'A4',
        content: cvContent,
        styles: cvStyle
      }

      // 生成简历
      pdfMake.createPdf(cv).open();
    },
  }
}
</script>


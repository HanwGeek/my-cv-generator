# my-cv-generator

> A Curriculum Vitae web generator with Vue.js.

## 安装步骤

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## 简介

前端采用Vue.js + Element UI + pdfmake组件编写。由于pdfmake字体库原因，暂不支持中文PDF渲染。

1. 网页访问初始界面

![start.png](https://github.com/HanwGeek/my-cv-generator/blob/master/img/start.png?raw=true)

2. 用户注册，将数据提交到服务器数据库中。

   ![register.png](https://github.com/HanwGeek/my-cv-generator/blob/master/img/register.png?raw=true)

3. 用户登录

      ![login.png](https://github.com/HanwGeek/my-cv-generator/blob/master/img/login.png?raw=true)

4. 简历信息填写界面。其中基本信息由注册时给出，从服务器数据库读取。

   ![baseinfo.png](https://github.com/HanwGeek/my-cv-generator/blob/master/img/baseinfo.png?raw=true)

5. 填写教育经历。包括学校，起止日期。

   ![eduinfo.png](https://github.com/HanwGeek/my-cv-generator/blob/master/img/eduinfo.png?raw=true)

6. 写荣誉奖项。包括奖项名和获得日期。

   ![honorinfo.png](https://github.com/HanwGeek/my-cv-generator/blob/master/img/honorinfo.png?raw=true)

7. 填写擅长技能。包括技能名和熟练度。

   ![skillinfo.png](https://github.com/HanwGeek/my-cv-generator/blob/master/img/skillinfo.png?raw=true)

8. 点击Genrate后可生成PDF简历，如下图所示。

   ![pdfres.png](https://github.com/HanwGeek/my-cv-generator/blob/master/img/pdfres.png?raw=true)
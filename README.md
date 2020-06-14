# Fake OJ 前端

## 简介

java web 大作业 , 取OJ形而不取其意， 仿欧拉计划, 答案判题

使用流行技术栈, springboot+vue+element-ui， 前后端分离

后端: <https://github.com/Ghost-LZW/fake-oj-be>

<hr>

使用vue-cil构建， 基于vue.js和element-ui

vue-router作为路由转发，实现懒加载

vuex和session做数据存储

演示地址: [fakeoj.soullan.com](http://fakeoj.soullan.com)

## 技术栈

* ElementUI

* axios

* vuex

* vue-router

## 项目结构

```text
├─public / 静态文件
│  └─image
├─src
│  ├─assets / 静态文件
│  ├─components / 组件
│  │ └─Problem
│  ├─pages / 具体roter-view页面
│  │  ├─Problem
│  │  └─Status
│  ├─router / 路由
│  ├─utils / 配置 工具
│  ├─App.vue / app界面
│  ├─main.js / main
│  └─store.js / vuex
└─pakage.json / 依赖
```

## 项目预览

![Show Project](./image/show.gif)
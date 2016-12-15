# vue-vuex-router

> A Project template for Vue 2.x + Vuex + vue-router

这是一个基于Vue(2.0)+ Vuex + vue-router(2.0)的模板。提供了:
* vue-router的基本用法
* Vuex的简单用法:module action state
* 利用Vuex管理异步请求数据,这里用到了Github API;
# 说明
在`vuex`这个分支中,为了学习Vuex,将所有的State都放到了Store中。包括了每个组件用到的异步请求数据。
但实际上,这种做法并不提倡。
对于只在当前组件有效的数据,应该使用local state。
# demo
[demo](http://www.iamsuperman.cn/vue-vuex-router-template/#/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8880
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

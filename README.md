# 运行项目
clone项目到本地，进入项目文件夹，安装依赖
```javascript
git clone https://github.com/superman66/vue2.x-douban.git
cd vue2.x-douban
npm install
```
然后运行
```javascript
npm run dev
```
最后打开浏览器，输入`localhost:8880`即可访问。效果图如下：

![text](../master/static/vue-douban-shrink.gif)
# 路由
应用包括下面4个路由
* `/movies` 首页，包含正在上映榜单和即将上映榜单的电影信息，首页只显示各个榜单的前8条数据；
* `/movie-list` 榜单列表页面，显示榜单列表信息;
* `/movie/subject/:id` 电影详情页面；
* `/movie/search` 电影搜索列表页面。

# 项目结构
```javascript
.
├── README.md
├── build // vue-cli 自带的配置文件
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config  // vue-cli 自带的配置文件
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── git.sh
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── list.scss
│   │   ├── logo.png
│   │   ├── search-btn.png
│   │   └── style.scss
│   ├── components
│   │   ├── Hello.vue
│   │   ├── Spinner.vue
│   │   └── header.vue
│   ├── main.js // 入口文件
│   ├── router.js // 路由
│   ├── store
│   │   ├── api.js  // 抽取访问api的方法
│   │   ├── modules
│   │   │   └── movie.js
│   │   ├── store.js
│   │   └── types.js
│   └── views
│       ├── index.vue
│       ├── movie
│       │   ├── movie-detail.vue
│       │   ├── movie-list.vue
│       │   ├── movies.vue
│       │   └── search-list.vue
│       └── vuex-demo.vue
├── static
└── tree.md
```

# 第三方库
* HTTP库采用了[axios](https://github.com/mzabriskie/axios)。
* 列表下拉加载更多数据使用了[vue-infinite-scroll](https://github.com/ElemeFE/vue-infinite-scroll)

# 豆瓣API
该应用使用了下面4个api：
* `/v2/movie/search?q={text}` 电影搜索api；
* `/v2/movie/in_theaters` 正在上映的电影；
* `/v2/movie/coming_soon` 即将上映的电影；
* `/v2/movie/subject/:id` 单个电影条目信息。

>更多关于豆瓣的api可以前往[豆瓣api官网](https://developers.douban.com/wiki/?title=guide)查看。

需要注意的是，由于豆瓣api的跨域问题，并不能直接通过ajax请求访问。不过vue-cli提供了代理的配置。
我们需要在`/config/index.js`中配置代理：
```javascript
dev: {
  env: require('./dev.env'),
  port: 8880,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable: {
    '/api': {
      target: 'http://api.douban.com/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  cssSourceMap: false
}
```
在`proxyTable`这个属性中，配置target属性为我们要代理的目标地址。这里我们写成`http://api.douban.com/v2`，这样我们就可以在应用中调用`/api/movie/in_theaters`来访问`http://api.douban.com/v2/movie/in_theaters`，从而解决跨域的问题。
>关于vue-cli更多关于跨域的设置可以看[官网文档](http://vuejs-templates.github.io/webpack/)

# 关于vuex
如果你想了解vuex的用法，可以切换到`vuex`分支，在该分支下，所有的state都采用vuex来管理。

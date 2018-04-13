# Change Log
* 2017-3-15：新增 node 服务转发 api 请求
* 2017-3-17：增加在线[访问地址](http://www.iamsuperman.cn/vue2.x-douban/dist/#/)，node 服务转发 api 请求部署到 heroku
# 运行项目
clone项目到本地，进入项目文件夹，安装依赖
```javascript
git clone https://github.com/superman66/vue2.x-douban.git
cd vue2.x-douban
npm install
```
然后运行项目
```javascript
npm run dev
```
接着运行 node,启动服务， **注意：这一步的 node 转发服务一定要启动，要不然无法正常访问豆瓣 API**
```javascript
cd node-proxy
node index.js

//启动成功后，将看到输出
// HTTP Server is running in http://127.0.0.1:8081
```

最后打开浏览器，输入`localhost:8880`即可访问。效果图如下：

![text](../master/static/vue-douban-shrink.gif)


**如果遇到本地运行时，豆瓣的图片部分不可见，请参见该 issue：[为什么图片加载会有问题？](https://github.com/superman66/vue2.x-douban/issues/17)**

**戳我查看 [demo](http://superman66.github.io/vue2.x-douban/dist/#/)**

注意：由于heroku在国外，而且我用的是免费版，当长时间没有连接的话，node服务会被休眠。如果处于休眠状态下，用户访问速度会比较慢，还有可能出现接口请求出现错误。遇到这种情况，刷新重试即可。
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
├── node-proxy  // node 转发API请求，解决跨域问题
│   └── index.js
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


## Node.js 转发API请求
由于有同学在问，项目执行`npm run build`打包之后，豆瓣 API 代理配置不起作用，无法访问豆瓣API的问题。
所以新增了Node.js http服务，用于转发API请求，解决跨域问题。
**安装依赖**

Node.js转发用到了 `express`和`superagent`. [superanget](https://github.com/visionmedia/superagent)是一个 Node.js HTTP client。
```
npm i express superagent -S
```

**定义接口**
根据前端所需，定义了如下三个接口：
```javascript
app.get('/movie/:type', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})

app.get('/movie/subject/:id', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})

app.get('/movie/search', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})
```

**CORS设置**
>跨源资源共享 ( [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) )机制让Web应用服务器能支持跨站访问控制，从而使得安全地进行跨站数据传输成为可能。

主要是通过设置`Access-Control-Allow-Origin: *`
```javascript
app.all('*', function (req, res, next) {
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});
```
**端口监听**
```javascript
app.listen(8081, function () {
  console.log('HTTP Server is running in http://127.0.0.1:8081')
})
```
**启动**

```
cd node-proxy
node index.js
```
具体见`node-proxy/index.js`

**更多关于 Node.js 转发 api 请求，请戳完整项目：[node-proxy-api](https://github.com/superman66/node-proxy-api)**
# 关于vuex
如果你想了解vuex的用法，可以切换到`vuex`分支，在该分支下，所有的state都采用vuex来管理。

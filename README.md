# vapp

![Alt](https://repobeats.axiom.co/api/embed/a77b84fdc050129395772d84e20fcc4353476a13.svg "Repobeats analytics image")

[后端接口参考](https://github.com/vbeats/vcloud)

```bash
yarn install

yarn dev:weapp

yarn build:weapp
```

## todo

- [ ]  丰富页面骨架

## FAQ

1. `taro` `vue3` `typescript` `vuex` `nutui` `小程序云开发`
2. `cloud`目录 --> 微信小程序云开发相关函数, 云函数执行超时时间最好配置`6s`以上
3. 注意修改`project.config.json` 和 `config`目录下 相关的配置信息
4. `auth` 云函数中某些敏感数据`RSA`加密传输

## 自定义组件

1. `login`组件内部会监听`store`状态决定是否需要显示, 通过`store.dispatch('toggle_login')`显示隐藏
2. `navigation`组件, 标签默认插槽为导航栏title

## 小程序端 与 后端服务接口通信

1. `用户认证`相关请求由云函数完成, 云函数直接获取 `openid` `unionid`传递给后端
2. 也可以不用云函数, `login`后获取`code`, 由后端通过`code2session`获取`openid`等信息

## Demo

![demo](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/wechat/33.png)
![demo](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/wechat/44.png)

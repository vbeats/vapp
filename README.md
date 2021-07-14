# vapp

Sponsor [![paypal.me/bootvue](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/icon/paypal.svg)](https://www.paypal.me/bootvue)
☕☕☕

[后端接口参考](https://github.com/vbeats/vcloud)

## todo

- [ ]  第三方UI组件都不好使, 自己写吧. NutUI taro端适配的不好

## FAQ

1. `taro` `vue3` `typescript` `vuex` 小程序云开发
2. `cloud`目录 --> 微信小程序云开发相关函数
3. 注意修改`project.config.json` 和 `config`目录下 相关的配置信息
4. `auth` 云函数中某些敏感数据配置也要修改
5. `auth` 云函数操作集成了用户风险验证, 需要在小程序后台开通对应的功能, 线上环境`isTest`要改为`false`

## 自定义组件

1. `login`组件内部会监听`store`状态决定是否需要显示, 通过`store.dispatch('toggle_login')`显示隐藏
2. `navigation`组件, 标签默认插槽为导航栏title

## 小程序端 与 后端服务接口通信方案

1. 云函数接管 (不好, 除非项目规模很小)

    ```bash
        - 耦合性高, 高度依赖腾讯相关服务
        - 云函数内获取openid userInfo等相关逻辑
        - 第三方接口 ?  云函数http请求 || 后端服务处理
        - 与后端服务通信 token维护? 云函数维护token  cloud数据库存储access_token等相关数据
          cloud请求后端服务器时从数据库查询最新的token  定时触发刷新token的云函数
          小程序端不保存任何token信息
    ```

2. 直接与后端服务通信 √

    ```bash
      - 耦合性低, 后端服务灵活部署
      - 云函数处理一些wechat相关的逻辑, 比如: 获取openid, 用户信息等, 用户认证接口服务 
      - 云函数内传递openid不建议, 应该通过code与userinfo encryptData方式与后端通信更加安全, 前端传递的任何数据都不可信
      - 系统业务逻辑上的 access_token 与 refresh_token 依然由小程序端维护
      - 除了用户认证相关的接口外, 其它业务接口由小程序端直接 与 后端接口通信
    ```

## Demo

![demo](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/wechat/33.png)
![demo](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/wechat/44.png)

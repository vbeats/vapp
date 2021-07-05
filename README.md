# vapp

Sponsor [![paypal.me/bootvue](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/icon/paypal.svg)](https://www.paypal.me/bootvue)
☕☕☕

## todo

- [ ] NutUI 问题跟进

## 说明

```bash
1. taro vue3 typescript vuex 小程序云开发
2. cloud目录 --> 小程序云开发相关资源 
3. 注意修改project.config.json 和 config目录下 相关的配置信息
4. cloud云函数中某些敏感数据配置也要修改
```

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
      - 系统业务逻辑上的 access_token 与 refresh_token 依然由小程序端维护
      - 除了用户认证相关的接口外, 其它业务接口由小程序端直接 与 后端接口通信
    ```

## Demo

![demo](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/wechat/1.png)

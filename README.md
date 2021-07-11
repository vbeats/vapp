# vapp

Sponsor [![paypal.me/bootvue](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/icon/paypal.svg)](https://www.paypal.me/bootvue)
☕☕☕

小程序端适配 uni cloud

```bash

一点建议:

uni-app 自己搞了一套uni-cloud云开发相关的业务组件, 挺鸡肋

优点: 省钱, 省钱, 省钱, 生态相对丰富一些, 跨平台 app开发支持更完善
缺点:
        微信云开发一些优秀 方便的特性没了, 虽然也能通过http方式处理.
        uni-cloud功能上依然没有抹平不同云厂商间的差异,
        与uni-app高度耦合, uni-admin等等乱七八糟, 让人看都不想看.
        typescript支持惨不忍睹, vue3 还在路上.
        各种api设计的乱七八糟, 要用async await异步写法, 大多数老api都要自己封装Promise,
        有的新api又不需要, 让人瞎猜

taro 倒是没自己搞一套, 但是已经抛弃了它
优点: typescript vue3 支持都不错, 直接依赖原生的微信云开发
缺点:
        生态及其不完善, UI组件一塌糊涂


总结:
    如果预算不多, uni-app可以做优先考虑,
    业务不复杂场景下 , uni-cloud 可以大规模的应用, 甚至app都可以向uni-app靠拢.
    如果只打算用uni-app做小程序相关的业务, 可以考虑如下的方案:
        小规模应用uni-cloud云函数, 不使用云数据库
        小程序与后端api交互, 由后端服务维护数据

```

## FAQ

1. uni-id `config.json` 修改uni-config-center公共配置里`appid` `appsecret`等配置
2. 小程序端 token 有效期 3 天, 每次 onShow 时触发定时器检查 token, 如果过期了, 重新 login-->code--->获取 token
3. `token` `token_expire` `userinfo`
4. 如果不采用uni-cloud相关组件, 可以对接自有后端服务, 需要改写`code`-->`openid` , `login` `checkToken`等相关逻辑
5. 使用前先关联云空间, 初始化云函数及云数据库


## Demo

![demo](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/wechat/11.png)
![demo](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/wechat/22.png)
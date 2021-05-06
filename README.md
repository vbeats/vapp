# vapp

[后端接口参考](https://github.com/vbeats/vcloud)

## 前后端认证

- `onShow`定时检测token 5分钟一次

- 未登录认证过 不处理

- `access_token`&`refresh_token`有效时间>5分钟的 不处理

- access`_token`快过期或已过期  `refresh_token`有效时间>5分钟的 ---> `refresh_token`重新获取新的`access_token`&`refresh_token`

- `access_token`&`refresh_token`都已经快过期或已过期的(超过20d未使用) 
	
	重新走`login`-->`getUserInfo`-->`auth认证`获取`access_token`&`refresh_token`
	

`access_token`: 7200s 

`refresh_token`: 20d 

## getUserInfo

需要用户授权 后端验签  手机号相关数据解密同理

## FAQ

- 注意: `getUserInfo` 等返回加密数据的操作必须在`login`获取了`code`之后进行  否则`code`对应的`session_key`无法解密数据

![demo](https://cdn.jsdelivr.net/gh/boot-vue/pics@main/wechat/2.png)

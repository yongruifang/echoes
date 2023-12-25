# 增加弹出层组件

# 开发登录注册
- 如何检测登陆状态? how to check login status
    - 初步方案， 通过cookie来检查
    - pinia存放用户信息
- 注册一个用户，和后端联合起来吧。

- make HTTP requests with Fetch
1. baseURL
2. router
3. 最终暴露一个方法
- 回车提交

# vite中如何使用环境变量？

- new Q: pinia 的问题，setToken之后, 在vue devtool中看不到, 在localStorage中也没有看到
```js
在 Setup Store 中：
ref() 就是 state 属性
computed() 就是 getters
function() 就是 actions  (方才我用的是Lambda函数，pinia不认)
'```
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

# 添加留言的API


# 如何计算 屏幕与容器边缘的距离
- 如果有api可以直接获取元素底部到屏幕底部的距离？
    - 有吗？没有
- 浏览器提供了什么工具？
    - window.innerHeight: 返回视口的高度
    - Element.getBoundingClientRect: 计算元素边缘到视口之间的距离

# 无限滚动的补充
- [ ] NoMoreData + 转圈圈
- [ ] 添加ScrollToTop的需求。

# 修饰卡片

# 对卡片进行修改
- 表单
- 更新信息然后回馈给服务器
- 成功之后更新pinia的存储值

[MongoDB启动异常 报错 及 正确的关闭方法](https://blog.csdn.net/Algorithmguy/article/details/81977483)

- z-index问题。
想一想，为什么只能在先设置为fixed的nav-bar里面设置z-index才能生效？


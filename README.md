# 首页

## 1.头部

头部通过模块化实现了，每个页面都有渲染

html代码

> 只需要在body标签内部引入一句

```
<header class=header></header>
```

***js代码

> 通过jquery的load方法请求头部数据，以后只需要在每个html文件中引入<header class=header></header>即可

```
在index.js文件的148行

/*头部html*/
let header = function () {
    /*底部footer渲染*/
    let $header = $('.header')
    $header.load('./header.html')
}
```

## 2.一些头部跳转

### 主页logo

![image-20210224215142263](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\1.png)

点击回到主页

### 登录/注册

![image-20210225084337794](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\2.png)

点击跳转登录主页页

### 输入框

由于技术不够，所以就简单化直接点击跳转官网

![image-20210225084353396](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\3.png)

点击换一批数据

### 购物车

点击跳转购物车页面

## 3.轮播

轮播的基础功能实现完成

## 4.新商品栏

![image-20210224215713312](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\4.png)

点击跳转对应的详情页功能完成

## 5.产品栏

![image-20210224215929306](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\5.png)

由于数据量太大，所以只写了个女装的列表页json数据，点击后跳转到列表页

## 6.销售排行榜

![image-20210224220039626](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\6.png)

点击跳转对应的详情页功能完成

## 7.底部

底部也通过模块化实现了，每个页面都有渲染

html代码

> 只需要在body标签内部最后面引入一句

```
<footer class=footer></footer>
```

***js代码

> 通过jquery的load方法请求头部数据，以后只需要在每个html文件中引入<header class=header></header>即可

```
在index.js文件的154行

/*底部html*/
    let footer = function () {
        /*底部footer渲染*/
        let $footer = $('.footer')
        $footer.load('./footer.html')
    }
```



以上就是主页的大致基础功能



# 登陆注册页

这里是通过浏览器的local Storage来实现模拟数据库的账户验证

## 1.验证码登录

![image-20210224220552896](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\7.png)

这里是发送了一个ajax请求，把请求到的“字符串”通过正则来判断和验证。

***详情代码请见login.js文件的62行

发送完后有一个验证码等待时间（这里的时间是必须输入内容后才触发）

![image-20210224232934596](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\8.png)



![image-20210224232953766](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\9.png)



## 2.密码登录

![image-20210224232613981](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\10.png)

这里是通过本地的local Storage来判断是否有账户，没有就注册等等...

## 3.注册

![image-20210224233051544](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\11.png)

这里就简单的写了一些正则判断，然后都封装到函数方法里了

***详情见login.js文件里的335行和369行



# 详情页

![image-20210224233813533](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\12.png)

***具体js代码请见details.js文件

# 列表页

在主页的这里点击进入，由于数据量较多，所以只写了女装的列表页

![image-20210224234018155](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\13.png)

列表页单击任意商品进入详情页

![image-20210224234721575](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\14.png)

这里由于最近在写千锋官网上的小米项目，所以没有弄懒加载操作。

# 购物车页面

本项目的两个注意点;

1.首先商品件数：个人对这个理解的是选中几件就是对应的件数，所以没有根据“数量”来做关联

![image-20210225000543779](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\15.png)

2.然后就是，如果单选框没有选中的话，就不可以进行加减操作

![image-20210225000452815](F:\前锋web前端培训\SZ-GP-5第二阶段练习\gitTest\project_instruction_images\16.png)

最后就是购物车的基础功能，大致功能基本实现了


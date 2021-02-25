define(function () {
    let account = []//account[0]存放总价，account[1]单选选中的总数量
    async function shoppingCar() {
        let $Shopping_wrap = $('.Shopping_wrap')
            ,goods = []//本地存储数据
            ,userAuthentication = [] //获取用户账户
        goods = JSON.parse(localStorage.getItem('goods'))
        userAuthentication = JSON.parse(localStorage.getItem('userAuthentication'))

        if ( userAuthentication === null) {
            content();//进入页面，如果没有数据，则显示content方法
            $('.Shopping_show').find('span').text("——— 还没登陆呢，请先登陆吧！———");
            return;
        }
        //解决用户没有数据 bug
        if (goods === null) {
            content();//进入页面，如果没有数据，则显示content方法
            return;
        }
        await $.get({
            url: "./data/details.json"
            , success: function (json) {
                $.each(json, function (index, item) {
                    for (let i = 0, len = goods.length; i < len; i++) {
                        if (item.id === goods[i].id) {
                            let price = +item.new.substr(1);
                            $(`<div class="product" data-id="${item.id}">
                                <div class="list">
                                    <input type="checkbox" checked class="checkIpt">
                                    <label class="this_label" for="ipt"></label >
                                    <a href="./details.html?${item.id}" target="_blank"><img src="${item.url[0]}" alt="">
                                    <div class="info">${item.title}</div></a>
                                    <div class="attribute">
                                        <div class="size">尺寸：${item.size[0]}</div>
                                        <div class="color">颜色规格：${item.color[0]}</div>
                                        <div class="size">配送方式：快递配送</div>
                                    </div>
                                    <div class="price">
                                        <p class="old">${item.old}</p>
                                        <p class="new">${item.new}</p>
                                    </div>
                                    <div class="number">
                                        <span class="del">-</span>
                                        <input type="text" class="ipt" value="${goods[i].num}">
                                        <span class="add">+</span>
                                    </div>
                                    <div class="money">
                                        <span>￥ ${price * goods[i].num}</span>
                                    </div>
                                    <div class="delete">删除</div>
                                </div>
                                </div>`).appendTo($Shopping_wrap);
                        }
                    }
                })
            }
            , error: function (msg) {
                console.log("数据加载失败》》》" + msg)
            }
        })

        // 如果尺码有undefined，删除当前元素
        let $size = $('.attribute>.size')
        $.each($size, function (index, item) {
            if ($(item).text().indexOf("undefined") !== -1) {
                $(item).remove()
            }
        })
        // 如果规格有undefined，删除当前元素
        let $color = $('.attribute>.color')
        $.each($color, function (index, item) {
            if ($(item).text().indexOf("undefined") !== -1) {
                $(item).remove()
            }
        })

        /*全选按钮*/
        let $checkIpt = $('.checkIpt')//获取 list 的多选框
            ,$all_1 = $('#all1')
            ,$all_2 = $('#all2')
            ,$shoppingCar_del = $("#shoppingCar_del")
        $all_1.click(function () {
            allClick($all_2, $checkIpt)
        })
        $all_2.click(function () {
            allClick($all_1, $checkIpt)
        })
        /*删除全部*/
        $shoppingCar_del.click(function () {
            $.each($checkIpt, function (index, item) {
                let id = $(this).parent().parent().attr("data-id")
                if ( $(item).prop('checked') ) {
                    $.each(goods, function (i, ele) {
                        if (ele.id === id) {
                            $(item).parent().parent().remove()//删除当前整个父元素
                            goods.splice(i, 1)
                            account[1]-- //商品数量减1
                            // 如果没有数据，则显示content方法
                            if (goods.length === 0) content()
                            return false
                        }
                    })
                }
            })
            localStorage.setItem('goods', JSON.stringify(goods))
            $long.text(account[1]) //显示商品数量
            calculate()//显示所有商品总价
        })


        let $product = $('.product')//商品总数
            ,$long = $('.right>.num>i')//商品数量
            ,$account = $('.right>.sum>i')//显示所有商品总价
        account[1] = $product.length //单选选中的总数量
        /*点击减少商品数量 按钮*/
        let $del = $('.number>.del')
        $del.click(function () {
            //获取自定义属性id
            let id = $(this).parent().parent().parent().attr('data-id')
            //获取当前的input框内容
                ,$ipt = $(this).next('.ipt')
                ,txtVal = +$ipt.val()
            //商品单价      删除 ￥ 后再转成数字类型
                ,$principal = +$(this).parent().prev('.price').children(".new").text().substr(1)
            //商品总价
                ,$spanTxt = $(this).parent().next('.money').children('span')
                ,sum = +$account.text()
                ,_this = this
            $.each(goods, function (index, item) {
                if (item.id === id) {
                    item.num--
                    if (item.num <= 0) { // 当 num <= 0 删除当前商品
                        $(_this).parent().parent().parent().remove()
                        goods.splice(index, 1)
                        account[1]-- //商品数量减1
                        $long.text(account[1]) //显示商品数量
                        // 如果没有数据，则显示content方法
                        if (goods.length === 0) content()
                        return false;
                    }
                    txtVal--;
                    $ipt.val(txtVal)
                    $spanTxt.text(`￥ ${$principal * txtVal}`)
                    return false
                }
            })
            localStorage.setItem('goods', JSON.stringify(goods))
            $account.text(sum - $principal);//显示所有商品总价
        })
        /*点击增加商品数量 按钮*/
        let $add = $('.number>.add')
        $add.click(function () {
            //获取自定义属性id
            let id = $(this).parent().parent().parent().attr('data-id')
            //获取当前的input框内容
                ,$ipt = $(this).prev('.ipt')
                ,txtVal = +$ipt.val()
            //商品单价      删除 ￥ 后再转成数字类型
                ,$principal = +$(this).parent().prev('.price').children(".new").text().substr(1)
            //商品总价
                ,$spanTxt = $(this).parent().next('.money').children('span')
                ,sum = +$account.text()
            $.each(goods, function (index, item) {
                if (item.id === id) {
                    item.num++
                    txtVal++
                    $ipt.val(txtVal)
                    $spanTxt.text(`￥ ${$principal * txtVal}`)
                    $account.text(sum + $principal);//显示所有商品总价
                    return false
                }
            })
            localStorage.setItem('goods', JSON.stringify(goods))
        })

        /*单选判断*/
        $(".Shopping_wrap").on("click", ".checkIpt", function () {
            //创建不可点击遮罩层
            $(`<div class="product_show"></div>`).appendTo($(this).parent().parent())
            //获取当前点击金额
            let price = +$(this).siblings(".money").text().trim().substr(1)
                ,totalPrice = +$account.text();//获取总价
            // 判断商品数量是否递加或递减
            account[0] = price
            if ($(this).prop('checked')) {
                checkBox()  //当前单选框判断
                account[1]++
                $account.text(totalPrice+account[0]) //显示总价
                //取消“不可点击”遮罩层
                $(this).parent().parent().children(".product_show").remove()
            } else {
                checkBox()  //当前单选框判断
                account[1]--
                $account.text(totalPrice-account[0])
            }
            /*商品数量判断*/
            $long.text(account[1])
        })

        /*删除按钮*/
        let $delete = $('.delete')
        $delete.click(function () {
            //获取自定义属性id
            let id = $(this).parent().parent().attr('data-id')
                ,_this = this
            //获取当前点击金额
                ,price = +$(this).prev(".money").text().trim().substr(1)
                ,ipt = $(this).siblings(".checkIpt")
                ,sum = +$account.text()
            $.each(goods, function (index, item) {
                if (item.id === id) {
                    $(_this).parent().parent().remove()
                    goods.splice(index, 1)
                    checkBox()
                    if (ipt.prop('checked')) { //商品数量减1
                        account[1]--;
                        $account.text(sum - price);//显示所有商品总价
                    }
                    $long.text(account[1]); //显示商品数量
                    // 如果没有数据，则显示content方法
                    if (goods.length === 0) {}content();
                    return false
                }
            })
            localStorage.setItem('goods', JSON.stringify(goods))
        })

        //进入页面默认 显示商品数量
        $long.text($product.length)

        calculate() //进入页面显示 总价

        //解决cooks里goods数组为空时bug
        content()//进入页面，如果没有数据，则显示content方法
    }

    /*全选判断*/
    function allClick(allBox, checkIpt) {
        let $product = $('.product')//商品总数
            ,$long = $('.right>.num>i')//商品数量
            ,$account = $('.right>.sum>i')//显示所有商品总价
        account[1] = $product.length //商品总数存入数组
        if (allBox.prop('checked')) {
            allBox.prop('checked', false)
            $.each(checkIpt, function (index, item) {
                $(item).prop('checked', false)
            })
            account[1] = 0
            $long.text(account[1]) // 清除商品数量
            $account.text(0) // 总价为0
            /*创建不可点击遮罩层*/
            $(`<div class="product_show"></div>`).appendTo($product)
        } else {
            allBox.prop('checked', true)
            $.each(checkIpt, function (index, item) {
                $(item).prop('checked', true)
            })
            $long.text(account[1]) //显示商品数量
            calculate()//显示总价
            /*清除不可点击遮罩层*/
            $($product).children(".product_show").remove()
        }
    }

    /*单选判断*/
    function checkBox() {
        let $all_1 = $('#all1')
            ,$all_2 = $('#all2')
            ,$checkIpt = $('.checkIpt')
        $.each($checkIpt, function (index, item) {
            if (!$(item).prop('checked')) {//未选中
                $all_1.prop('checked', false)
                $all_2.prop('checked', false)
                return false
            }
            $all_1.prop('checked', true)
            $all_2.prop('checked', true)
        })
    }

    /*总价判断*/
    function calculate(flag) {
        let $account = $('.right>.sum>i')//显示总价
            ,$unitPrice = $('.money>span')//计算单价
            ,sum = 0,num = 0
        if (flag) {
            $.each($unitPrice, function (index, item) {
                num = +$(item).text().substr(1)
                sum += num
            })
            account[0] = sum
            $account.text(account[0])
            return
        }
        $.each($unitPrice, function (index, item) {
            num = +$(item).text().substr(1)
            sum += num
        })
        account[0] = sum
        //进入页面默认 显示商品总价
        $account.text(account[0])
        return account[0]
    }

    //判断购物车内容是否为空，空就显示 "购物车中暂无商品"
    function content() {
        let $Shopping_show = $('.Shopping_show')// 需要显示的div
        let $Shopping_wrap = $('.Shopping_wrap')// 内容
        let $all_1 = $('#all1')
        let $all_2 = $('#all2')
        if ($Shopping_wrap.children().length === 0) {
            $Shopping_show.css("display", "inline-block");
            $all_1.prop('checked', false);
            $all_2.prop('checked', false);
        }
    }

    return {
        shoppingCar: shoppingCar
    }
})
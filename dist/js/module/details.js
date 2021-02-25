define( function () {
    // console.log("details加载成功")

    /*details数据渲染*/
    function details() {
        let id = location.search
        id = id.slice(1)
        // console.log(id);
        $.ajax({
            url: './data/details.json',
            type: 'get',
            success:  function (result) {
                // console.log(result);
                // console.log(result[0].id);
                for (let i = 0; i < result.length; i++) {
                    if (result[i].id === id) {
                        $(`
                        <div class="Img">
                            <div class="img">
                                <img class="detail_img" src="${result[i].url[0]}" alt="网络错误，图片未能加载">
                                <div class="mask"></div>
                                <img class="details_img" src="${result[i].url[0]}" alt="网络错误，图片未能加载">
                            </div>
                            <div class="detail_box">
                                <div class="prev"></div>
                                <div class="detail_box_content">
                                    <div>
                                    <img src="./image/shopList/img%20(1).jpg" alt="">
                                    <img src="./image/shopList/img%20(358).jpg" alt="">
                                    </div>
                                </div>
                                <div class="next"></div>
                            </div>
                        </div>
                        <div class="introduce">
                            <div class="title">
                                <span>${result[i].title}</span>
                            </div>
                            <div class="price">
                                <span class="page">价格</span>
                                <span class="new">${result[i].new}</span>
                                <span class="old">${result[i].old}</span>
                            </div>
                            <div class="all">
                                <span class="all_title">活动</span>
                                <span class="inner">两件及以上10%OFF</span>
                                <span class="right">更多</span>
                                <div class="sale">
                                    <ul>
                                        两件及以上10%OFF
                                        <li><a href="./list.html">2021-01-29至2021-02-04期间特惠</a></li>
                                        <li><a href="./list.html">仅限部分商品</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="Size">
                                <div class="size">
                                    <div class="size_title">尺码</div>
                                    <ul></ul>
                                </div>
                                <div class="color">
                                    <div class="size_title">颜色</div>
                                    <ul></ul>
                                </div>
                            </div>
                            <div class="mode">
                                <div class="size_title">配送方式</div>
                                <ul>
                                    <li><a href="#">快递寄送</a></li>
                                </ul>
                            </div>
                            <div class="number">
                                <div class="size_title">数量</div>
                                <div class="right">
                                    <span class="del">-</span>
                                    <input type="text" class="ipt" value="1">
                                    <span class="add">+</span>
                                    <i>件</i>
                                </div>
                            </div>
                            <div class="btn">
                                <a href="./shoppingCar.html" class="active" data-id="${result[i].id}">立即购买</a>
                                <a href="#" class="active" data-id="${result[i].id}">加入购物车</a>
                            </div>
                        </div>
                            `).appendTo('#details')
                        dataRendering(id)
                        // console.log(result[i].size);
                        if (result[i].size.length === 0) {//如果没有内容，就不需要渲染尺码数据
                            $('.Size').remove()
                            break
                        }
                        for (let j = 0; j < result[i].size.length; j++) {
                            // console.log(result[i].size[j]);
                            $(`<li><a href="#">${result[i].size[j]}</a></li>`).appendTo('#details .size ul');
                        }
                        if (result[i].color.length === 0) {//如果没有内容，就不需要渲染颜色数据
                            $('.color').remove()
                            break
                        }
                        for (let k = 0; k < result[i].color.length; k++) {
                            $(`<li><a href="#">${result[i].color[k]}</a></li>`).appendTo('#details .color ul');
                        }
                    }
                }
            },
            error: function (msg) {
                console.log(msg);
            }
        })
    }

    /*商品的cook存储*/
    function shopping() {
        let $details = $("#details")
        /*加入购物车按钮*/
        $details.on("click", ".btn .active", function () {
            //获取自定义属性id
            let id = $(this).attr('data-id')
            //将获取到的数量 转成数字类型
            let num = +$('.number .ipt').val()
            //创建商品 数据数组，用来存放json对象
            let goodArr = []
            if (localStorage.getItem('goods')) {
                //将获取到的key转成json对象
                goodArr = JSON.parse(localStorage.getItem('goods'))
            }
            let flag = false
            $.each(goodArr, function (index, item) {
                if (item.id === id) { //判断 商品id 和 本地json对象 item.id 是否相等
                    //相等 num 就 +1
                    item.num += num
                    flag = true
                }
            })
            // 如果没有id相等，那么就创建一个json对象
            if (!flag) {
                goodArr.push({"id": id, "num": num})
            }
            // 更新本地存储，将goods转成 json字符串
            localStorage.setItem('goods', JSON.stringify(goodArr))
            alert("添加到购物车成功！")
        })
        /*减少商品按钮*/
        $details.on("click", ".right .del", function () {
            let $iptVal = $("#details .ipt")
            let text = +$iptVal.val()
            text--
            if (text <= 0) {
                $(this).css("backgroundColor","#eee")
                return
            }
            $iptVal.val(text)
        })
        /*添加商品按钮*/
        $details.on("click", ".right .add", function () {
            let $iptVal = $("#details .ipt")
            let text = +$iptVal.val()
            text++
            if (text > 0) {
                $(".right .del").css("backgroundColor","white")
            }
            $iptVal.val(text)
        })
    }

    /*img_div数据渲染*/
    function dataRendering(id) {
        /*数据渲染*/
        let rendering = $('.detail_box_content>div')
        let maxImg = $('.details_img')//大图
        let minImg = $('.detail_img')//小图
        let str = ""
        $.get({
            url: "./data/details.json"
            ,success: function (arr) {
                for (let i = 0, len = arr.length; i < len; i++){
                    if (arr[i].id === id) {
                        // console.log(arr[i].url)
                        minImg.attr('src', arr[i].url[0])
                        maxImg.attr('src', arr[i].url[0])
                        for (let n = 0, l = arr[i].url.length; n < l; n++) {
                            str += `<img src=${arr[i].url[n]} alt="网络错误，图片未加载">`
                        }
                        rendering.html(str)
                    }
                }
                magnifier()
            }
            ,error:function (msg) {
                console.log("数据加载失败》》》"+msg)
            }
        })
    }

    /*放大镜*/
    function magnifier() {
        /*放大镜*/
        let minBox = $('.img')
        let $mask = $('.mask')//遮罩层
        let maxImg = $('.details_img')//大图
        minBox.mousemove(function (ev) {
            let e = window.event || ev
            e.preventDefault()
            let maskLeft = e.pageX - minBox.offset().left - ($mask.width() / 2)
            let maskTop = e.pageY - minBox.offset().top - ($mask.height() / 2)
            //临界值判断
            if (maskLeft <= 0) {
                maskLeft = 0
            }
            if (maskLeft >= minBox.width() - $mask.width()) {
                maskLeft = minBox.width() - $mask.width()
            }
            if (maskTop <= 0) {
                maskTop = 0
            }
            if (maskTop >= minBox.height() - $mask.height()) {
                maskTop = minBox.height() - $mask.height()
            }
            //比例计算
            let scaleX = maskLeft / (maxImg.width() - minBox.width() * 1.5)
            let scaleY = maskTop / (maxImg.height() - minBox.height() * 1.5)
            let left = -((maxImg.width() - minBox.width()) * scaleX)
            let top = -((maxImg.height() - minBox.height()) * scaleY)
            $mask.css("left", maskLeft + "px")
            $mask.css("top", maskTop + "px")

            maxImg.css("left", left + "px")
            maxImg.css("top", top + "px")
        })

        /*获取元素*/
        let $imgs = $('.detail_box_content>div img')
        let minImg = $('.detail_img')//小图
        let src = ""
        let currentImgIndex = 0
        /*点击图片切换*/
        $.each($imgs, function (index, item) {
            $(item).click(function () {
                currentImgIndex = $(this).index()
                replaceIndex(currentImgIndex)
            })
        })

        /*点击按钮切换图片*/
        let $detail_box_content = $('.detail_box_content')
        let $prev = $('.prev')
        let $next = $('.next')
        let imageScroll = ($imgs.width() + 10) // 10是外边距

        $prev.click(function () {
            currentImgIndex = (currentImgIndex + $imgs.length - 1) % $imgs.length
            replaceIndex(currentImgIndex)
            /* (currentImgIndex-4)是因为 detail_box_content下的div 展示只有5张，又要预留一张，所以要减4 */
            $detail_box_content.stop().animate({'scrollLeft': (currentImgIndex-4) * imageScroll})
        })

        $next.click(function () {
            currentImgIndex = (currentImgIndex + 1) % $imgs.length
            replaceIndex(currentImgIndex)
            /*小于5，滚动条不动*/
            if ($imgs.length <= 5) return
            $detail_box_content.stop().animate({'scrollLeft': (currentImgIndex-4) * imageScroll})
        })

         //更换图片索引方法
        function replaceIndex(Index) {
            $imgs.eq(Index).css('border', '1px solid #7f0019').siblings().css('border', 0)
            src = $imgs.eq(Index).attr('src')
            /*一张图片的偏移*/
            minImg.stop().animate({'left': -518, 'dispaly': 'none'}, function () {
                minImg.css({'display': 'block', 'left': 0, 'opacity': 0})
                minImg.stop().animate({'opacity': 1}, 300)
                minImg.attr('src', src)
                maxImg.attr('src', src)
            })
        }
    }

    return {
        details: details
        , shopping: shopping
    }
})
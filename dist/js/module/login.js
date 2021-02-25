define(function () {
    let verificationCode = function () {
        /*表单验证*/
        let $iptPhone = $('.ipt')//手机号
            ,$yz = $('#yz')//遮罩层验证码
            ,yz = $('.yz')//手机号下面的验证码
            ,$sendYZ = $('.sendYz')//发送验证码按钮
            ,$go = $('#go')//登录按钮
            ,$back = $('.back')//返回按钮
            ,$tips1 = $('.tips1')
            ,$tips2 = $('.tips2')
            ,$mask = $('.login_mask')//遮罩层
            ,$close = $('.close')//关闭遮罩层按钮
            ,arr = [] //用于判断表单验证的数组
            ,verifyCode = {str: "", imgUrl: ""}//验证码接口验证对象
            ,$loginNav = $('.loginNav>div')/*选项卡切换*/
            ,$loginNavBar = $('.loginNavBar>div')

            ,userAuthentication = []//本地账户密码cookies数据
            ,num = null,timer = null //定义请求后的倒计时 时间
/*选项卡切换*/
        $loginNav.each(function (index, item) {
            $(item).click(function () {
                //切换时清空当前输入框内容
                back()
                $(this).addClass("loginNav_show").siblings().removeClass()
                $loginNavBar.eq(index).css("display", "block").siblings().css("display", "none")
                /*防止切换有提示*/
                $tips1.css('display', 'none')
                $tips2.css('display', 'none')
            })
        })
/*验证码登录  手机号验证*/
        ;+function () {
            $iptPhone.focus(function () { $tips1.css('display', 'none') })
            $iptPhone.blur(function () {
                if (!$(this).val()) return
                let reg = /^1[^0]\d{9}/
                test(reg,$tips1,this)
            })
/*验证码关闭按钮*/
            $close.click(function () {
                clearInterval(timer)
                num = 3
                $mask.css("display", "none")
                //如果内容为空，就不用倒计时
                if (!$yz.val()) return
                yz.focus() //调用聚焦事件，清空错误提示信息
                timer = setInterval(()=>{
                    codeWaitTime()
                },1000)
                //5秒后清除定时器
                setTimeout(()=>{
                    clearInterval(timer)
                },5000)
            })
/*图片点击发送请求*/
            $('.login_img').click(function () {
                code()//请求验证码
            })
/*验证码按钮请求*/
            $sendYZ.click(function () {
                $yz.val("")//清空上一次遮罩层的验证码
                code()//请求验证码
                $mask.css("display", "inline-block")
            })
/*验证码 验证*/
            yz.focus(function () { $tips2.css("display", "none") })
            yz.blur(function () {
                //防止空校验跳转
                if (!$(this).val()) return
                let _this = $(this)
                login_authentication(_this)
            })
            $yz.focus(function () { $tips2.css("display", "none") })
            $yz.blur(function () {
                let _this = $(this)
                let result = login_authentication(_this)
                //解决空数组bug
                if (result === undefined) {
                    console.log("验证错误")
                    return
                } else if (!result.length) {
                    yz.val("")
                    //把接口的值赋值给验证框
                    let txt = $yz.val()
                    yz.val(txt)
                }
            })
        }()
/*密码登录  手机号验证*/
        let $ipt_Phone = $('#iptPhone')
            ,$password = $('.password')
        ;+function () {
            $ipt_Phone.focus(function () { $tips1.css('display', 'none') })
            $ipt_Phone.blur(function () {
                if (!$(this).val()) return
                let reg = /^1[^0]\d{9}/
                test(reg,$tips1,this)
            })
            $password.focus(function () { $tips2.css('display', 'none') })
            $password.blur(function () {
                if (!$(this).val()) return
                let reg = /^[a-zA-Z]\w{5,20}/
                let passVal = $(this).val().replace(/\s+/g, '')//去掉电话空格
                if (reg.test(passVal)) {
                    arr.length = 0
                    $tips2.css('display', 'none')
                    verification(+$ipt_Phone.val(),$(this).val())//传入手机号和密码
                } else {
                    $tips2.css('display', 'inline-block')
                    $tips2.text("密码只能是字母开头，最少6位，且和数字组成")
                    arr.push(1)
                }
            })
        }()
/*注册页*/
        let $registerPhone = $('.registerPhone')//手机号
            ,$registerYZ = $('.registerYZ')//验证码
            ,$newPass = $('.newPass')//新密码
            ,$confirmPass = $('.confirmPass')//确认密码
            ,$registerSendYz = $('.registerSendYz')//发送验证码
            ,$register = $('#register')//注册
        ;+function(){
            //手机号
            $registerPhone.focus(function () { $tips1.css('display', 'none') })
            $registerPhone.blur(function () {
                if (!$(this).val()) return
                registered(+$registerPhone.val())//传入手机号
            })
            //验证码
            $registerSendYz.click(function () {
                let img = $(`<img src="" alt="网络错误" class="registerImg">`)
                    $(this).after(img)
                code(true)
                $(this).remove()
            })
            //图片点击换图
            $('.verificationCode').on("click",".registerImg",function () {
                code(true)
            })
            //验证码输入框
            $registerYZ.focus(function () {
                $tips2.css("display","none")
            })
            $registerYZ.blur(function () {
                let _this = $(this)
                login_authentication(_this)
            })
            //新密码
            $newPass.focus(function () { $tips2.css('display', 'none') })
            $newPass.blur(function () {
                if (!$(this).val()) {
                    $('.tips3').css('display', 'inline-block')
                    $(".tips3").text("密码不能为空！")
                    return
                }
                let reg = /^[a-zA-Z]\w{5,20}/g
                let passVal = $(this).val().replace(/\s+/g, '')//去掉电话空格
                if (reg.test(passVal)) {
                    arr.length = 0
                    $('.tips3').css('display', 'none')
                } else {
                    $('.tips3').css('display', 'inline-block')
                    $(".tips3").text("密码只能是字母开头，最少6位，且和数字组成")
                    arr.push(1)
                }
            })
            //确认密码
            $confirmPass.focus(function () { $tips2.css('display', 'none') })
            $confirmPass.blur(function () {
                if (!$(this).val()) return
                let prevVal =  $newPass.val()
                    ,currentVal = $(this).val()
                if (prevVal === currentVal) {
                    arr.length = 0
                    $('.tips4').css('display', 'none')
                } else {
                    $('.tips4').css('display', 'inline-block')
                    $(".tips4").text("两次密码不同！")
                    arr.push(1)
                }
            })
            //注册按钮
            $register.click(function () {
                let phoneVal = +$registerPhone.val()
                    ,confirmPass = $confirmPass.val()
                    ,time = $('.birthdayIpt').val()
                    ,man = $('#man').val()
                    ,woman = $('#woman').val()
                    ,flag = registered(phoneVal)
                /*if (localStorage.getItem("userAuthentication")) {
                    userAuthentication = JSON.parse(localStorage.getItem('userAuthentication'))
                }
                $.each(userAuthentication, function (index, item) {
                    if (item.phone === phoneVal) {
                        console.log("不可注册")
                        flag = true
                    } else {
                        if (!$registerPhone.val()) {
                            $tips1.css("display", "inline-block")
                            $tips1.text("此处不能为空！")
                            return
                        }
                        console.log(index);
                        flag = false
                    }
                })*/
                if (flag) {
                    if (!$registerPhone.val()) return
                    if (!$newPass.val()) {
                        $('.tips3').css('display', 'inline-block')
                        $(".tips3").text("此处不能为空！")
                        return
                    }
                    if (!confirmPass) {
                        $('.tips4').css('display', 'inline-block')
                        $(".tips4").text("两次密码不同！")
                        return
                    }
                    userAuthentication.push({"phone": phoneVal,"pass": confirmPass,"birthday":time,"man":man,"woman":woman})
                    localStorage.setItem('userAuthentication', JSON.stringify(userAuthentication))
                    alert("注册成功！")
                }
                // console.log(phoneVal,newPass,time,man,woman);
            })
        }()

/*验证码登录页 登录按钮*/
        $go.click(function () {
            login( $iptPhone,$yz,$tips1,$tips2 )
        })
/*验证码登录页 登录按钮*/
        let $passGO = $('#pass_Go')
        $passGO.click(function () {
            login( $ipt_Phone,$password,$tips1,$tips2 )
        })
/*点击返回主页*/
        $back.click(function () {
            back()
            location.href = "index.html"
        })

/* 封装好的函数 ↓↓↓ */
//验证码请求
        function code(flag) {
            $.ajax({
                url: "https://www.mxnzp.com/api/verifycode/code?"
                // url: "https://www.mxnzp.com/api/verifycode/code?len=5&type=0&app_id=cgdhozkmnhjnpdsm&app_secret=cVBDWnBaalM2ajZaajNEVFgvRExPQT09"
                , type: "get"
                , data: {len: 5, type: 0, app_id: "qichmpihqowxmlie", app_secret: "ZHhQb1FIVDU0MDQ5YW5RRHFBWlAzQT09"}
                , dataType: "json"
                , timeout: 5000
                , success: function (json) {
                    verifyCode.str = json.data.verifyCode//验证文本
                    verifyCode.imgUrl = json.data.verifyCodeImgUrl
                    if (flag) {
                        $(".registerImg").attr("src", verifyCode.imgUrl);
                    } else {
                        $('.login_img').attr("src", verifyCode.imgUrl);
                    }
                }
                , error: function (err) {
                    console.log(err.status);
                }
            })
        }
/*验证码登录页 验证*/
        function login_authentication( _this ) {
            if ( !_this.val() ) {
                return
            }
            let reg = new RegExp('\\b' + verifyCode.str + '\\b', 'im')
            if (_this.val().search(reg) !== -1) {
                arr.length = 0
                $tips2.css('display', 'none')
            } else {
                $tips2.css('display', 'inline-block')
                $tips2.text("验证码错误")
                arr.push(1)
            }
            return arr
        }
/*验证码发送后的请求时间*/
        function codeWaitTime() {
            if (num < 0) {
                $sendYZ.text("发送验证码")
                $sendYZ.attr("disabled",false)
                return
            }
            $sendYZ.text(num+"秒后再发送")
            $sendYZ.attr("disabled",true)
            num--
        }
/*登录按钮*/
        function login(value,key,tips1,tips2) {
            if (!value.val()) {
                tips1.css('display', 'inline-block')
                tips1.text("请先输入手机号")
                return
            } else {
                if (!key.val()) {
                    tips2.css('display', 'inline-block')
                    tips2.text("这个地方不可以为空")
                    arr.push(1)
                    console.log(arr);
                    return
                }
            }
            //获取表单内容
            if (arr.length === 0) {
                location.href = "index.html?user" + value.val()
                //点击清空内容
                value.val("")
                key.val("")
            }
        }
/*返回按钮*/
        function back() {
            if ($iptPhone.val() || $yz.val() || $ipt_Phone.val() ||
            $password.val() || $registerPhone.val() || $registerYZ.val() ||
            $newPass.val() || $confirmPass.val()) {
                //点击清空内容
                $iptPhone.val("")
                $yz.val("")
                $ipt_Phone.val("")
                $password.val("")
                $registerPhone.val("")
                $registerYZ.val("")
                $newPass.val("")
                $confirmPass.val("")
            }
        }
/*账号密码验证*/
        function verification(phone,pass) {
            if (localStorage.getItem("userAuthentication")) {
                userAuthentication = JSON.parse(localStorage.getItem('userAuthentication'))
                $.each(userAuthentication, function (index, item) {
                    if (item.phone === phone) {
                        arr.length = 0;
                        $tips1.css("display", "none")
                        if (pass) {
                            if (item.pass === pass) {
                                $tips2.css("display", "none")
                                arr.length = 0
                            } else {
                                $tips2.css("display", "inline-block")
                                $tips2.text("密码错误")
                                arr.push(1)
                            }
                        }
                        return false
                    } else {
                        $tips1.css("display", "inline-block")
                        $tips1.text("该账号还未注册，请先注册！")
                    }
                })
                if (phone.toString().length > 11) {
                    $tips1.css("display", "inline-block")
                    $tips1.text("手机号只能是11位！")
                }
            } else {
                $tips1.css("display","inline-block")
                $tips1.text("该账号还未注册，请先注册")
                arr.push(1)
            }
        }
/*注册账号密码*/
        function registered(phone) {
            let reg = /^1[^0]\d{9}/
                ,flag = false
            if (!reg.test(phone)) {
                $tips1.css("display","inline-block")
                $tips1.text("手机号格式有误！")
                arr.push(1)
                return
            }
            if ( localStorage.getItem('userAuthentication')  ) {
                userAuthentication = JSON.parse(localStorage.getItem('userAuthentication'))
                $.each(userAuthentication, function (index, item) {
                    if (item.phone === phone) {
                        arr.push(1)
                        $tips1.css("display","inline-block")
                        $tips1.text("该账号已存在")
                        flag = false
                        return false
                    } else {
                        if (phone.toString().length>11) {
                            $tips1.css("display","inline-block")
                            $tips1.text("手机号只能是11位！")
                            return false
                        }
                        $tips1.css("display","inline-block")
                        $tips1.text("该账号可以注册")
                        flag = true
                        arr.length = 0
                    }
                })
            } else {
                $tips1.css("display","inline-block")
                $tips1.text("一个账号都没有，可以放心注册呢~")
                flag = true
                arr.push(1)
            }
            return flag
        }

        function test(reg,tips,_this){
            let phoneVal = +$(_this).val().replace(/\s+/g, '')//去掉电话空格
            if (reg.test(phoneVal)) {
                arr.length = 0
                tips.css('display', 'none')
                verification(+$(_this).val())
            } else {
                tips.css('display', 'inline-block')
                tips.text("手机号格式有误")
                arr.push(1)
            }
        }
    }


    return {
        verificationCode: verificationCode
    }
})
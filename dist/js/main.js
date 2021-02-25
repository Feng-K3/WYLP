require.config({
    baseUrl: './js',//公共路径
    paths: {//集中引入所有模块
        'dataBase': 'module/dataBase'
        , 'index': 'module/index'
        , 'login': 'module/login'
        , 'list' : 'module/list'
        , 'details': 'module/details'
        , 'shoppingCar': 'module/shoppingCar'
        , 'jquery': ['https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery'
            , './lib/jquery-2.2.4.min']//提供一个备用资源
    }
})

require(["jquery", "index", "login","details","list","shoppingCar"],
    function ($, index, login,details,list,
              shop) {
        console.log("__      __ _     __   __    ___  \n" +
                    "\\ \\    / /| |    \\ \\ / /   | _ \\ \n" +
                    " \\ \\/\\/ / | |__   \\ V /    |  _/ \n" +
                    "  \\_/\\_/  |____|  _|_|_   _|_|_  \n" +
                        "_|\"\"\"\"\"|_|\"\"\"\"\"|_| \"\"\" |_| \"\"\" | \n" +
                        "\"`-0-0-'\"`-0-0-'\"`-0-0-'\"`-0-0-' \n")
    index.banner()
        index.list()
        index.data()
        index.header()
        index.footer()

    login.verificationCode()

    details.details()
        details.shopping()

    list.list()
        list.clickCar()

    shop.shoppingCar()
})


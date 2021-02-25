define(function () {
    /*新商品*/
    let newShopObj = {
        newShop: [
            {
                id: "1"
                , imgUrl: "./image/home/img%20(71).jpg"
                , text: "含耗牛绒羊毛 宽版毛衣"
                , price: "￥ 249"
                , linePrice: "￥498"
                , sales: "月销量57"
            }
            , {
                id: "2"
                , imgUrl: "./image/home/img%20(32).jpg"
                , text: "香味蜡烛·迷你 木质香"
                , price: "￥ 32"
                , linePrice: ""
                , sales: "月销量32"
            }
            , {
                id: "3"
                , imgUrl: "./image/home/img%20(57).jpg"
                , text: "轻量羽绒便携式 风帽夹克衫"
                , price: "￥ 418"
                , linePrice: "￥598"
                , sales: "月销量27"
            }
            , {
                id: "4"
                , imgUrl: "./image/home/img18%20(2).jpg"
                , text: "羽绒 不易沾水风帽夹克"
                , price: "￥ 749"
                , linePrice: "￥1498"
                , sales: "月销量111"
            }
            , {
                id: "5"
                , imgUrl: "./image/home/img51%20(1).jpg"
                , text: "新疆棉 轻量法兰绒 衬衫"
                , price: "￥ 99"
                , linePrice: "￥198"
                , sales: "月销量164"
            }
            , {
                id: "6"
                , imgUrl: "./image/home/img%20(60).jpg"
                , text: "羊毛混双面 高领毛衣"
                , price: "￥ 299"
                , linePrice: "￥598"
                , sales: "月销量27"
            }
            , {
                id: "7"
                , imgUrl: "./image/home/img%20(66).jpg"
                , text: "羊毛混双面 开衫"
                , price: "￥ 299"
                , linePrice: "￥598"
                , sales: "月销量14"
            }
            , {
                id: "8"
                , imgUrl: "./image/home/img%20(26).jpg"
                , text: "粗细不均棉纱毛圈 拉链连帽衫"
                , price: "￥ 149"
                , linePrice: "￥298"
                , sales: "月销量36"
            }
        ]
        , salesRanking: [ //销售排名
            {
                id: "9"
                , imgUrl: "./image/home/img%20(79).jpg"
                , text: "黄麻简易收纳 A4"
                , price: "￥ 18"
                , linePrice: ""
                , sales: "月销量1164"
            }
            , {
                id: "10"
                , imgUrl: "./image/home/img%20(33).jpg"
                , text: "扫除用品系列地毯除尘滚轮替换纸"
                , price: "￥ 18"
                , linePrice: ""
                , sales: "月销量944"
            }
            , {
                id: "11"
                , imgUrl: "./image/home/img%20(81).jpg"
                , text: "黄麻简易收纳 A6"
                , price: "￥ 14"
                , linePrice: ""
                , sales: "月销量746"
            }
            , {
                id: "12"
                , imgUrl: "./image/home/img%20(77).jpg"
                , text: "山泉水"
                , price: "￥ 3"
                , linePrice: ""
                , sales: "月销量705"
            }
            , {
                id: "13"
                , imgUrl: "./image/home/img%20(75).jpg"
                , text: "迷你脆脆面 焦香酱油味"
                , price: "￥ 3"
                , linePrice: ""
                , sales: "月销量389"
            }
            , {
                id: "14"
                , imgUrl: "./image/home/img8%20(1).jpg"
                , text: "优质纸月周记笔记本/2020年12月开始"
                , price: "￥ 30 ~ 45"
                , linePrice: "￥90"
                , sales: "月销量119"
            }
            , {
                id: "15"
                , imgUrl: "./image/home/img%20(45).jpg"
                , text: "凝胶中性墨水圆珠笔芯(浅)"
                , price: "￥ 4"
                , linePrice: ""
                , sales: "月销量324"
            }
            , {
                id: "16"
                , imgUrl: "./image/home/img%20(50).jpg"
                , text: "凝胶中性墨水圆珠笔芯(深)"
                , price: "￥ 4"
                , linePrice: ""
                , sales: "月销量285"
            }
        ]
    }
    /*产品*/
    let goods = [
        {
            imgUrl: "./image/home/img%20(83).jpg"
            , text: "女装"
        }
        , {
            imgUrl: "./image/home/img%20(13).jpg"
            , text: "男装"
        }
        , {
            imgUrl: "./image/home/img%20(9).jpg"
            , text: "内衣"
        }
        , {
            imgUrl: "./image/home/img%20(86).jpg"
            , text: "鞋包"
        }
        , {
            imgUrl: "./image/home/img%20(5).jpg"
            , text: "服饰杂货"
        }
        , {
            imgUrl: "./image/home/img%20(92).jpg"
            , text: "童装"
        }
        , {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "MUJI LABO"
        }
        , {
            imgUrl: "./image/home/img%20(7).jpg"
            , text: "卫生&美容用品"
        }, {
            imgUrl: "./image/home/img%20(6).jpg"
            , text: "纺织品"
        }
        , {
            imgUrl: "./image/home/img8%20(1).jpg"
            , text: "文具"
        }, {
            imgUrl: "./image/home/img%20(2).jpg"
            , text: "居家用品"
        }
        , {
            imgUrl: "./image/home/img%20(4).jpg"
            , text: "家具"
        }, {
            imgUrl: "./image/home/img%20(2).jpg"
            , text: "电子产品"
        }, {
            imgUrl: "./image/home/img%20(2).png"
            , text: "户外用品"
        }
        , {
            imgUrl: "./image/home/img%20(11).jpg"
            , text: "MUJI IDEE"
        }, {
            imgUrl: "./image/home/img%20(91).jpg"
            , text: "MUJI BOOKS"
        }, {
            imgUrl: "./image/home/img%20(16).jpg"
            , text: "点心"
        }
        , {
            imgUrl: "./image/home/img%20(14).jpg"
            , text: "饮料·冷食"
        }, {
            imgUrl: "./image/home/img%20(3).jpg"
            , text: "调味加工"
        }
    ]

    return {
        "newShopObj": newShopObj
        , "goods": goods
    }
})

Vue.directive('focus', {
    // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
new Vue({
    el:'#jinglian',
    data: {
        config: {
            //单位：元
            gameCoinPerYuan: 1400000,
            price: {
                //单位：游戏币
                huanXian: 125000,
                tianGang:1158000,
                diSha:1158000
            },
            //幻仙精炼成功率
            baseRate: {
                0:0.5,
                1:0.3,
                2:0.3,
                3:0.3,
                4:0.3,
                5:0.3,
                6:0.3,
                7:0.3,
                8:0.25,
                9:0.20,
                10:0.15,
                11:0.1,
            },
            //乾坤，地煞精炼成功率
            fuzhushiRate: {
                tianGang:0.35,//失败掉到0
                diSha:0.15//失败掉1级
            }
        }
    },
    computed: {
        suggestions: function () {
            let resultArray = []
            let huanXianPerTime = 1
            let min = function(a, b, c) {
                a=a()
                b=b()
                c=c()
                let minab = a.cost < b.cost ? a : b
                return minab.cost < c.cost ? minab : c
            }
            for (i=0; i<=11; i++) {
                let preLevelObj =  [...resultArray].pop() || 0
                let preLevelPrice = preLevelObj ? preLevelObj.cost : 0
                let price = {
                    huanXianOnly: ()=> {
                        console.log(this, this.config)
                        let rate = this.config.baseRate[i]
                        let preLevelCost = preLevelPrice
                        let currentCost = huanXianPerTime * this.config.price.huanXian
                        let costPerTime = preLevelPrice + currentCost
                        return {
                            cost: costPerTime / rate,
                            name: '幻仙',
                            level: i,
                        }
                    },
                    addTianGang: ()=> {
                        let rate = this.config.baseRate[i] + this.config.fuzhushiRate.tianGang
                        let preLevelCost = preLevelPrice
                        let currentCost = huanXianPerTime * this.config.price.huanXian + this.config.price.tianGang
                        let costPerTime = preLevelPrice + currentCost
                        return {
                            cost: costPerTime / rate,
                            name: '天罡',
                            level: i,
                        }
                    },
                    addDiSha: ()=> {
                        let rate = this.config.baseRate[i] + this.config.fuzhushiRate.diSha
                        let preLevelCost = preLevelPrice
                        let currentCost = huanXianPerTime * this.config.price.huanXian + this.config.price.diSha
                        //地煞石，精炼失败，只会降1级，还有剩余价值
                        let leftPrice = 0
                        if (resultArray.length > 1) {
                            let prePrePrice = resultArray[resultArray.length - 2].cost
                            leftPrice = prePrePrice * (1/rate - 1)
                        }
                        let costPerTime = preLevelPrice + currentCost
                        console.log(i, costPerTime / rate - leftPrice)
                        return {
                            cost: costPerTime / rate - leftPrice,
                            name: '地煞',
                            level: i,
                        }
                    }
                }
                debugger
                resultArray.push(min(price.huanXianOnly, price.addTianGang, price.addDiSha))
            }
            return resultArray
        }
    },
    created() {
        // window.alert('hellooworld')
    }
})
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
            gameCoinPerYuan: 1418000,
            price: {
                //单位：游戏币
                huanXian: 131000,
                tianGang: 1250000,
                diSha: 1250000
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
            //天罡，地煞精炼成功率
            fuzhushiRate: {
                tianGang:0.15,//失败掉到0
                diSha:0.035//失败掉1级
            },
            hiddenDetail: false
        },
        suggestions:[]
    },
    watch: {
        config: {
            deep: true,
            handler() {
                this.saveData()
            }
        }
    },
    mounted: function () {
        debugger
        this.readData()
        this.updateSuggestions()
    },
    methods: {
        updateSuggestions() {
            let resultArray = []
            let huanXianPerTime = 1
            let min = function(a, b, c) {
                // a=a()
                // b=b()
                // c=c()
                let minab = a.cost < b.cost ? a : b
                let ret = minab.cost < c.cost ? minab : c
                console.log(a.level, a, b, c, ret)
                return ret
            }
            const configPrice = {
                huanXian:parseInt(this.config.price.huanXian),
                tianGang:parseInt(this.config.price.tianGang),
                diSha:parseInt(this.config.price.diSha)
            }
            for (i=0; i<=11; i++) {
                let preLevelObj =  [...resultArray].pop() || {
                    cost: 0,
                    huanXian: 0,
                    tianGang: 0,
                    diSha: 0,
                    rate: 0
                }
                if (i===3) {
                    debugger
                }
                let preLevelPrice = preLevelObj.cost
                const price = {}
                {
                    let rate = this.config.baseRate[i]
                    let preLevelCost = preLevelPrice
                    let currentCost = huanXianPerTime * configPrice.huanXian
                    let costPerTime = preLevelCost + currentCost
                    // console.log('精炼',i,'升',i+1,' 辅助：幻仙',' 成功率', rate,'，单次成本',preLevelCost,'+',currentCost,'合计',costPerTime,' 成功成本',costPerTime / rate)
                    price.huanXianOnly = {
                        cost: costPerTime / rate,
                        name: '幻仙',
                        level: i,
                        huanXian: (preLevelObj.huanXian + 1) / rate,
                        tianGang: preLevelObj.tianGang / rate,
                        diSha: preLevelObj.diSha / rate,
                        rate: rate
                    }
                }
                {
                    let rate = this.config.baseRate[i] + this.config.fuzhushiRate.tianGang
                    let preLevelCost = preLevelPrice
                    let currentCost = huanXianPerTime * configPrice.huanXian + configPrice.tianGang
                    let costPerTime = preLevelCost + currentCost
                    // console.log('精炼',i,'升',i+1,' 辅助：天罡',' 成功率', rate,'，单次成本',preLevelCost,'+',currentCost,'合计',costPerTime,' 成功成本',costPerTime / rate)

                    price.addTianGang = {
                        cost: costPerTime / rate,
                        name: '天罡',
                        level: i,
                        huanXian: (preLevelObj.huanXian + 1) / rate,
                        tianGang: (preLevelObj.tianGang + 1) / rate,
                        diSha: preLevelObj.diSha / rate,
                        rate: rate
                    }
                }
                {
                    let rate = this.config.baseRate[i] + this.config.fuzhushiRate.diSha
                    let preLevelCost = preLevelPrice
                    let currentCost = huanXianPerTime * configPrice.huanXian + configPrice.diSha
                    //地煞石，精炼失败，只会降1级，还有剩余价值
                    let left = {
                        cost: 0,
                        huanXian: 0,
                        tianGang: 0,
                        diSha: 0
                    }
                    let leftNum = (1/rate - 1)
                    if (resultArray.length > 1) {
                        let prePreObj = resultArray[resultArray.length - 2]
                        left.cost = prePreObj.cost * (1/rate - 1)
                        left.huanXian = prePreObj.huanXian * (1/rate - 1)
                        left.tianGang = prePreObj.tianGang * (1/rate - 1)
                        left.diSha = prePreObj.diSha * (1/rate - 1)
                    }
                    // console.log('精炼',i,'升',i+1,' 辅助：地煞',' 剩余价值：',left.cost)
                    let costPerTime = preLevelCost + currentCost
                    // console.log('精炼',i,'升',i+1,' 辅助：地煞',' 成功率', rate,'，单次成本',preLevelCost,'+',currentCost,'合计',costPerTime,' 成功成本',costPerTime / rate - left.cost)
                    price.addDiSha = {
                        cost: costPerTime / rate - left.cost,
                        name: '地煞',
                        level: i,
                        huanXian: (preLevelObj.huanXian + 1) / rate - left.huanXian,
                        tianGang: (preLevelObj.tianGang) / rate - left.tianGang,
                        diSha: (preLevelObj.diSha + 1) / rate - left.diSha,
                        rate: rate
                    }
                }
                let minObj = min(price.huanXianOnly, price.addTianGang, price.addDiSha)
                resultArray.push(minObj)
            }
            console.log('+++++++++++++++++++++++++')
            console.log(resultArray)
            console.log('+++++++++++++++++++++++++')
            resultArray.forEach((item)=> {
                console.log(`精炼：${item.level}上${item.level + 1}，用：${item.name}，成本：${item.cost/this.config.gameCoinPerYuan}，概率：${item.rate}`)
            })
            this.suggestions = resultArray
        },
        round(val) {
            return Number(val.toString().match(/^\d+(?:\.\d{0,2})?/));
        },
        saveData() {
            localStorage.setItem('config', JSON.stringify(this.config))
        },
        readData() {
            if (localStorage.getItem('config')) {
                this.config = JSON.parse(localStorage.getItem('config'))
            }
        }
    },
    created() {
        // window.alert('hellooworld')
    }
})
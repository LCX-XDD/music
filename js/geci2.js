let lrc = `
[00:00.000]作词 : 郑钧
[00:01.000]作曲 : 郑钧
[00:21.250]把青春献给身后那座辉煌的都市
[00:31.630]为了这个美梦 我们付出着代价
[00:41.240]把爱情留给我身边最真心的姑娘
[00:52.600]你陪我歌唱 你陪我流浪
[00:57.060]陪我两败俱伤
[01:05.000]一直到现在 才突然明白
[01:14.710]我梦寐以求 是真爱和自由
[01:24.520]想带上你私奔 奔向最遥远城镇
[01:35.370]想带上你私奔 去做最幸福的人
[02:07.050]在熟悉的异乡 我将自己一年年流放
[02:17.250]穿过鲜花 走过荆棘
[02:22.230]只为自由之地
[02:29.130]在欲望的城市 你就是我最后的信仰
[02:38.750]洁白如一道喜乐的光芒将我心照亮
[02:48.500]不要再悲伤 我看到了希望
[03:00.280]你是否还有勇气 随着我离去
[03:10.230]想带上你私奔 奔向最遥远城镇
[03:21.150]想带上你私奔 去做最幸福的人
[03:55.490]不要再悲伤 我看到了希望
[04:05.360]你是否还有勇气 随着我离去
[04:14.700]想带上你私奔 奔向最遥远城镇
[04:25.720]想带上你私奔 去做最幸福的人
[04:44.020]带上你私奔
[04:53.150]带上你私奔
`

var audio = $('.audio')
var lrcList = $('.lrc')
const containerHeight = 12 * 7 * 2.5
const lineHeight = 12 * 2.5
var res = A(lrc)
const maxOffset = lineHeight * res.length - containerHeight / 2 - lineHeight / 2

function $(selector) {
    return document.querySelector(selector)
}

// 格式化歌词文本
function A(lrc) {
    var lines = lrc.split('\n');
    const res = []
    lines.forEach(item => {
        if (item) {
            const parts = item.split(']')
            const line = {
                time: parseSeconds(parts[0].slice(1)),
                word: parts[1]
            }
            res.push(line)
        }
    })
    return res
}

// 将时间字符串转换为数字
function parseSeconds(time) {
    const arr = time.split(':')
    return parseInt(arr[0]) * 60 + parseFloat(arr[1])
}

// 查找当前播放音乐的歌词索引
function findIndex() {
    let curTime = audio.currentTime
    for (let i = 0; i < res.length; i++) {
        if (curTime < res[i].time) {
            return i - 1
        }
    }
    return res.length - 1
}

// 设置偏移
function setOffset() {
    let index = findIndex()
    let offset = lineHeight * index - containerHeight / 2 + lineHeight / 2
    if (offset > maxOffset) {
        offset = maxOffset
    }
    let li = $('.active')
    if (li) {
        li.classList.remove('active')
    }
    lrcList.style.transform = `translateY(${-offset}px)`
    lrcList.children[index].classList.add('active')
}

// 初始化界面
function init() {
    const lrcItems = res.map(item => {
        return `<li>${item.word}</li>`
    })
    lrcList.innerHTML = lrcItems.join('')
}
init()

audio.addEventListener('timeupdate', setOffset)
let lrc = `
[00:00.000]作词 : G.E.M.邓紫棋
[00:00.190]作曲 : G.E.M.邓紫棋
[00:00.390]编曲 : Lupo Groinig
[00:00.590]制作人 : Lupo Groinig
[00:00.790]阳光下的泡沫 是彩色的
[00:08.290]就像被骗的我 是幸福的
[00:15.370]追究什么对错 你的谎言
[00:22.320]基于你还爱我
[00:28.320]美丽的泡沫 虽然一刹花火
[00:35.660]你所有承诺 虽然都太脆弱
[00:42.670]但爱像泡沫 如果能够看破
[00:49.670]有什么难过
[00:57.780]早该知道泡沫 一触就破
[01:04.760]就像已伤的心 不胜折磨
[01:11.890]也不是谁的错 谎言再多
[01:18.860]基于你还爱我
[01:25.110]美丽的泡沫 虽然一刹花火
[01:32.000]你所有承诺 虽然都太脆弱
[01:39.160]爱本是泡沫 如果能够看破
[01:46.240]有什么难过
[01:53.370]再美的花朵 盛开过就凋落
[02:00.390]再亮眼的星 一闪过就坠落
[02:07.390]爱本是泡沫 如果能够看破
[02:14.370]有什么难过
[02:21.580]为什么难过 有什么难过
[02:35.650]为什么难过
[02:46.230]全都是泡沫 只一刹的花火
[02:53.230]你所有承诺 全部都太脆弱
[03:00.340]而你的轮廓 怪我没有看破
[03:07.340]才如此难过
[03:14.470]相爱的把握 要如何再搜索
[03:21.500]相拥着寂寞 难道就不寂寞
[03:28.710]爱本是泡沫 怪我没有看破
[03:35.650]才如此难过
[03:43.730]在雨下的泡沫 一触就破
[03:50.700]当初炽热的心 早已沉没
[03:57.730]说什么你爱我 如果骗我
[04:04.760]我宁愿你沉默
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
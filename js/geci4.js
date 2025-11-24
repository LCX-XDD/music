let lrc = `
[00:00.000]作词 : DJ阿智
[00:01.000]作曲 : DJ阿智
[00:02.000]编曲 : DJ阿智
[00:05.606]大香蕉一条大香蕉
[00:09.404]你的感觉真的很奇妙
[00:13.187]飘呀飘摇啊摇
[00:16.994]你的感觉神魂颠倒
[00:20.604]大香蕉一条大香蕉
[00:24.346]你的感觉真的很奇妙
[00:28.109]飘呀飘摇啊摇
[00:31.878]你的感觉神魂颠倒
[00:37.555]我想要种一棵香蕉树
[00:40.867]上面挂满我的所有祝福
[00:45.049]如果你感觉生活苦
[00:48.409]带你去海边看日出
[00:52.577]没有什么会放不下
[00:56.312]心打开天不会黑
[01:00.037]如果你感觉快乐了
[01:03.776]把阴霾全部给我擦擦擦
[01:07.549]大香蕉一条大香蕉
[01:11.297]你的感觉真的很奇妙
[01:14.985]飘呀飘摇啊摇
[01:18.833]你的感觉神魂颠倒
[01:22.488]大香蕉一条大香蕉
[01:26.229]你的感觉真的很奇妙
[01:30.039]飘呀飘摇啊摇
[01:33.781]你的感觉神魂颠倒
[01:37.538]我想要种一棵香蕉树
[01:40.941]上面挂满我的所有祝福
[01:45.028]如果你感觉生活苦
[01:48.396]带你去海边看日出
[01:52.563]没有什么会放不下
[01:56.323]心打开天不会黑
[02:00.047]如果你感觉快乐了
[02:03.785]把阴霾全部给我擦擦擦
[02:07.596]大香蕉一条大香蕉
[02:11.275]你的感觉真的很奇妙
[02:14.992]飘呀飘摇啊摇
[02:18.825]你的感觉神魂颠倒
[02:22.534]大香蕉一条大香蕉
[02:26.278]你的感觉真的很奇妙
[02:29.987]飘呀飘摇啊摇
[02:33.768]你的感觉神魂颠倒
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
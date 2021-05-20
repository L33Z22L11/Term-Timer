onload = change("高二理科");

oncontextmenu = onkeydown = onselectstart
// = function () { return false; }

function change(i) {
    end = 0;
    progress = 0;
    tell = "电脑时间存在误差，仅供参考，请以实际铃声为准。";
    output("tell", tell)
    type = i;
    console.log(type);
    output("type", type);
    setTimeout(examTimer, 100);
}

function setFontSize(size) {
    document.getElementsByClassName("container")[0].style.fontSize = size;
}

function adjustContrast(delta) {
    eleContainer = document.getElementsByClassName("container")[0];
    contrast = Number(eleContainer.style.opacity) + delta;
    if (contrast < 0.5) { contrast = 0.5; }
    if (contrast > 1) { contrast = 1; }
    eleContainer.style.opacity = String(contrast);
    console.log(contrast);
    if (contrast == 0.75) { contrast = "默认"; }
    else { contrast = Math.round(contrast * 100); }
    output("contrast", contrast);
}

function fullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        document.getElementById("fullscreen").innerHTML = "退出";
    }
    else {
        document.exitFullscreen();
        document.getElementById("fullscreen").innerHTML = "全屏";
    }
}

function $(nextSubject, nextStart, nextEnd) {
    if (now > end) {
        subject = nextSubject;
        start = new Date(nextStart);
        end = new Date(nextEnd);
    }
}

function preZero(num, digit) {
    return ("0".repeat(digit) + num).slice(-digit);
}

function getClock(time) {
    return time.getHours() + ":" + preZero(time.getMinutes(), 2);
}

function minTimer(i) {
    return Math.round(i / 60000) + '<span class="small">min</span>';
}

function output(id, value) {
    document.getElementById(id).innerHTML = value;
}

function examTimer() {
    now = new Date();
    switch (type) {
        case "高二理科":
            $("数学", "2021-04-29T14:00", "2021-04-29T16:00");
            $("物理", "2021-04-29T16:30", "2021-04-29T18:10");
            $("语文", "2021-04-30T07:40", "2021-04-30T10:10");
            $("生物", "2021-04-30T10:40", "2021-04-30T12:10");
            $("英语", "2021-04-30T14:00", "2021-04-30T16:00");
            $("化学", "2021-04-30T16:30", "2021-04-30T18:10");
            break;
        case "高二文科":
            $("数学", "2021-04-29T14:00", "2021-04-29T16:00");
            $("历史", "2021-04-29T16:30", "2021-04-29T18:10");
            $("语文", "2021-04-30T07:40", "2021-04-30T10:10");
            $("地理", "2021-04-30T10:40", "2021-04-30T12:20");
            $("英语", "2021-04-30T14:00", "2021-04-30T16:00");
            $("政治", "2021-04-30T16:30", "2021-04-30T18:10");
            break;
        case "高一":
            $("语文", "2021-04-29T07:50", "2021-04-29T09:50");
            $("英语", "2021-04-29T10:20", "2021-04-29T12:00");
            $("数学", "2021-04-29T14:00", "2021-04-29T15:40");
            $("生物", "2021-04-29T16:10", "2021-04-29T17:40");
            $("史地", "2021-04-30T07:50", "2021-04-30T09:50");
            $("化学", "2021-04-30T10:20", "2021-04-30T12:00");
            $("物理", "2021-04-30T14:00", "2021-04-30T15:40");
            $("政治", "2021-04-30T16:10", "2021-04-30T17:10");
            break;
        default:
            $("无科目", "2003-09-24", "2003-09-24");
    }
    duration = getClock(start) + "~" + getClock(end);
    clock = getClock(now);
    if (now < (start - 12E5)) {
        timer = minTimer(start - 12E5 - now);
        next = "距离入场";
        progress = 0;
    } else if (now < (start - 6E5)) {
        timer = minTimer(start - 6E5 - now);
        next = "距离发卡";
    } else if (now < (start - 3E5)) {
        timer = minTimer(start - 3E5 - now);
        next = "距离发卷";
    } else if (now < start) {
        timer = minTimer(start - now);
        next = "距离开考";
        progress = 0;
    } else if (now > end) {
        // tell = "假期愉快。我们都是上学人。"
        // + "<br>建议可向 QQ 2399052066 反馈"
        // + "<br>意见可向高二年级张主任反馈"
        // output("tell", tell);
        timer = "Nice";
        next = "已结束"
        progress = 100;
    } else {
        timer = minTimer(end - now);
        next = "距离结束";
        progress = (now - start) / (end - start) * 100;
    }
    document.getElementById("bar").style.width = progress + "%";
    // output("progress", Math.round(progress)+"%");
    output("subject", subject);
    output("duration", duration);
    output("clock", clock);
    output("timer", timer);
    output("next", next);
    setTimeout(examTimer, 5000);
}
window.onload = function () {
    // alert("");
    change(20);
    examTimer();
}

// document.oncontextmenu = window.onkeydown
//     = window.onkeyup = window.onkeypress
//     = function () { event.returnValue = false; }

function change(totype) {
    end = 0;
    type = totype;
    switch (type) {
        case 20: typename = "高二理科"; break;
        case 21: typename = "高二文科"; break;
        case 10: typename = "高一"; break;
        default: typename = "未选择";
    }
}

function fullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    }
    else { document.exitFullscreen(); }
}

function update(nextSubject, nextStart, nextEnd) {
    if (now > end) {
        subject = nextSubject;
        start = new Date(nextStart);
        end = new Date(nextEnd);
    }
}

function getMM(i) {
    i = i.getMinutes();
    if (i < 10) { i = "0" + i; }
    return i;
}

function minTimer(i) {
    return Math.round(i / 60000) + '<span class="half">min</span>';
}

function examTimer() {
    now = new Date();
    // console.log(typename);
    switch (type) {
        case 20:
            update("理科数学", "2021-04-29T14:00", "2021-04-29T16:00");
            update("物理", "2021-04-29T16:30", "2021-04-29T18:10");
            update("语文", "2021-04-30T07:40", "2021-04-30T10:10");
            update("生物", "2021-04-30T10:40", "2021-04-30T12:10");
            update("英语", "2021-04-30T14:00", "2021-04-30T16:00");
            update("化学", "2021-04-30T16:30", "2021-04-30T18:10");
            break;
        case 21:
            update("文科数学", "2021-04-29T14:00", "2021-04-29T16:00");
            update("历史", "2021-04-29T16:30", "2021-04-29T18:10");
            update("语文", "2021-04-30T07:40", "2021-04-30T10:10");
            update("地理", "2021-04-30T10:40", "2021-04-30T12:20");
            update("英语", "2021-04-30T14:00", "2021-04-30T16:00");
            update("政治", "2021-04-30T16:30", "2021-04-30T18:10");
            break;
        case 10:
            update("语文", "2021-04-29T07:50", "2021-04-29T09:50");
            update("英语", "2021-04-29T10:20", "2021-04-29T12:00");
            update("数学", "2021-04-29T14:00", "2021-04-29T15:40");
            update("生物", "2021-04-29T14:00", "2021-04-29T16:00");
            update("史地", "2021-04-30T07:50", "2021-04-30T09:50");
            update("化学", "2021-04-30T10:20", "2021-04-30T12:00");
            update("物理", "2021-04-30T14:00", "2021-04-30T16:00");
            update("政治", "2021-04-30T16:10", "2021-04-30T17:10");
            break;
        default:
            update("无科目", "2003-09-24", "2003-09-24");
    }
    duration = start.getHours() + ":" + getMM(start) +
        "~" + end.getHours() + ":" + getMM(end);
    time = now.getHours() + ":" + getMM(now);
    tell = "电脑时间存在误差，仅供参考，请以实际铃声为准。";
    if (now < (start - 12E5)) {
        timer = minTimer(start - 12E5 - now);
        next = "距离入场";
        progress = 0;
    } else if (now < (start - 6E5)) {
        timer = minTimer(start - 6E5 - now);
        next = "距离发答题卡";
    } else if (now < (start - 3E5)) {
        timer = minTimer(start - 3E5 - now);
        next = "距离发卷";
    } else if (now < start) {
        timer = minTimer(start - now);
        next = "距离开考";
        progress = 0;
    } else if (now > end) {
        tell = "假期愉快。我们都是上学人。<br>"
        // + "建议可向 QQ 2399052066 反馈<br>"
        // + "意见可向高二年级张主任反馈"
        timer = "Nice";
        next = "已结束"
        progress = 100;
    } else {
        timer = minTimer(end - now);
        next = "距离结束";
        progress = Math.round((now - start) / (end - now) * 100);
    }
    document.getElementById("bar").style.width = progress + "%";
    document.getElementById("typename").innerHTML = typename;
    // document.getElementById("progress").innerHTML = progress + "%";
    document.getElementById("subject").innerHTML = subject;
    document.getElementById("duration").innerHTML = duration;
    document.getElementById("time").innerHTML = time;
    document.getElementById("timer").innerHTML = timer;
    document.getElementById("next").innerHTML = next;
    document.getElementById("tell").innerHTML = tell;
    setTimeout(examTimer, 1000);
}
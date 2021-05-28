onload = function() {
    change("高二理科");
    String(location).indexOf("\?") == -1 ? updateClock() : check();
 }

oncontextmenu = onkeydown = onselectstart = function () { return false; }

function change(i) {
    now = new Date("2021-05-28T13:00");
    end = 0;
    progress = 0;
    order = 0;

    type = i;
    console.log(type);
    output("type", type);
}

function updateClock() {
    now = new Date();
    output("clock", getClock(now));
    examTimer();
    setTimeout(updateClock, 2000);
}

function check() {
    now.setSeconds(now.getSeconds() + 30);
    output("clock", getClock(now));
    examTimer();
    setTimeout(check, 50);
}

function $(nextSubject, nextStart, nextEnd) {
    if (now > end) {
        subject = nextSubject;
        start = new Date(nextStart);
        end = new Date(nextEnd);
    }
}

function add0Prefix(num, digit) {
    return ("0".repeat(digit) + num).slice(-digit);
}

function getClock(date) {
    return date.getHours() + ":" + add0Prefix(date.getMinutes(), 2);
}

function formatMin(i) {
    return Math.round(i / 60000) + '<span class="small">min</span>';
}

function output(id, value) {
    document.getElementById(id).innerHTML = value;
}

function examTimer() {
    tell = ["电脑时间存在误差，仅供参考，请以司号和广播通知为准。"];
    switch (type) {
        case "高二理科":
            $("英语", "2021-05-28T14:20", "2021-05-28T16:20");
            $("化学", "2021-05-28T16:50", "2021-05-28T18:30");
            $("语文", "2021-05-29T07:40", "2021-05-29T10:10");
            $("生物", "2021-05-29T10:40", "2021-05-29T12:10");
            $("数学", "2021-05-29T14:20", "2021-05-29T16:20");
            $("物理", "2021-05-29T16:50", "2021-05-29T18:30");
            break;
        case "高二文科":
            $("英语", "2021-05-28T14:20", "2021-05-28T16:20");
            $("地理", "2021-05-28T16:50", "2021-05-28T18:30");
            $("语文", "2021-05-29T07:40", "2021-05-29T10:10");
            $("政治", "2021-05-29T10:40", "2021-05-29T12:20");
            $("数学", "2021-05-29T14:00", "2021-05-29T16:00");
            $("历史", "2021-05-29T16:50", "2021-05-29T18:30");
            break;
        case "高一":
            tell = ["电脑时间存在误差，仅供参考，请以实际铃声为准。"];
//             $("未知", "2021-05-28T07:50", "2021-05-28T09:50");
//             $("未知", "2021-05-28T10:20", "2021-05-28T12:00");
            $("物理", "2021-05-28T14:20", "2021-05-28T16:00");
            $("化学", "2021-05-28T16:30", "2021-05-28T18:10");
            $("语文", "2021-05-29T07:50", "2021-05-29T09:50");
            $("英语", "2021-05-29T10:20", "2021-05-29T12:00");
            $("数学", "2021-05-29T14:20", "2021-05-29T16:00");
            $("生物", "2021-05-29T16:30", "2021-05-29T18:00");
            break;
    }
    duration = getClock(start) + "~" + getClock(end);

    if (now < (start - 18E5)) {
        tell = ["发千古之幽思，励宏图之大志。",
            "冲，宝中干饭人！",
            "今天咥碗臊子面，嘹咋咧！"];
        timer = "Soon";
        next = "考试加油";
        progress = 0;
    } else if (now < (start - 12E5)) {
        timer = formatMin(start - 12E5 - now);
        next = "距离入场";
        progress = (start - 12E5 - now) / 6E3;
    } else if (now < (start - 6E5)) {
        timer = formatMin(start - 6E5 - now);
        next = "距离发卡";
        progress = (start - 6E5 - now) / 6E3;
    } else if (now < (start - 3E5)) {
        timer = formatMin(start - 3E5 - now);
        next = "距离发卷";
        progress = (start - 3E5 - now) / 3E3;
    } else if (now < start) {
        timer = formatMin(start - now);
        next = "距离开考";
        progress = (start - now) / 3E3;
    } else if (now <= end) {
        timer = formatMin(end - now);
        next = "距离结束";
        progress = (now - start) / (end - start) * 100;
    } else {
        tell = ["本页面由纸鹿小站托管",
            "原服务器无法访问，我们已紧急迁移到新服务器",
            "目前我们可以维持服务器开支",
            "合作/技术交流/扩列 QQ 2399052066",
            "野生技协现已开放加入，群 894656456"];
        subject = "";
        duration = "";
        timer = "";
        next = "";
        progress = 100;
    }

    document.getElementById("bar").style.width = progress + "%";
    output("tell", tell[order]);
    order < tell.length - 1 ? order++ : order = 0;
    output("subject", subject);
    output("duration", duration);
    output("timer", timer);
    output("next", next)
}

/*

*/

function relVal(prop, delta, unit, minVal, maxVal) {
    eleMain = document.getElementsByClassName("container")[0];
    propVal = Number(eleMain.style[prop].replace(unit, "")) + delta;
    propVal = Math.max(propVal, minVal);
    propVal = Math.min(propVal, maxVal);
    eleMain.style[prop] = propVal + unit;
    output(prop, Math.round(propVal * 1E2) / 1E2);
}

function fullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        output("fullscreen", "退出");
    }
    else {
        document.exitFullscreen();
        output("fullscreen", "全屏");
    }
}

window.onload = function () {
    // alert("");
    end = 0;
    progress = 0;
    sMin = '<span class="half">min</span>';
    examTimer();
}

// document.oncontextmenu = window.onkeydown
//     = window.onkeyup = window.onkeypress
//     = function () { event.returnValue = false; }

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

function examTimer() {
    now = new Date();
    update("数学", "2021-04-29T14:00", "2021-04-29T16:00");
    update("历史", "2021-04-29T16:30", "2021-04-29T18:10");
    update("语文", "2021-04-30T07:40", "2021-04-30T10:10");
    update("地理", "2021-04-30T10:40", "2021-04-30T12:20");
    update("英语", "2021-04-30T14:00", "2021-04-30T16:00");
    update("政治", "2021-04-30T16:30", "2021-04-30T18:10");
    duration = start.getHours() + ":" + getMM(start) +
        "~" + end.getHours() + ":" + getMM(end);
    time = now.getHours() + ":" + getMM(now);
    if (now < (start - 12E5)) {
        timer = Math.round((start - 12E5 - now) / 60000) + sMin;
        notes = "距离入场";
        progress = 0;
    } else if (now < (start - 6E5)) {
        timer = Math.round((start - 6E5 - now) / 60000) + sMin;
        notes = "距离发答题卡";
    } else if (now < (start - 3E5)) {
        timer = Math.round((start - 3E5 - now) / 60000) + sMin;
        notes = "距离发卷";
    } else if (now < start) {
        timer = Math.round((start - now) / 60000) + sMin;
        notes = "距离开考";
        progress = 0;
    } else if (now > end) {
        document.getElementById("tell").innerHTML
            = "假期愉快。我们都是上学人。<br>"
            + "建议可向 QQ 2399052066 反馈<br>"
            + "意见可向高二年级张主任反馈"
        timer = "Nice";
        notes = "已结束"
        progress = 100;
    } else {
        timer = Math.round((end - now) / 60000);
        notes = "距离结束";
        progress = Math.round((now - start) / (end - now) * 100);
    }
    document.getElementById("bar").style.width = progress + "%";
    document.getElementById("progress").innerHTML = progress + "%";
    document.getElementById("subject").innerHTML = subject;
    document.getElementById("duration").innerHTML = duration;
    document.getElementById("time").innerHTML = time;
    document.getElementById("timer").innerHTML = timer;
    document.getElementById("notes").innerHTML = notes;
    setTimeout(examTimer, 3000);
}
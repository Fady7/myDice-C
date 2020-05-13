function init() {
    bideEvent();
}
init();

function bideEvent() {
    $(".item").on("mouseenter", function (e) {
        addId(e, "in", this);
        changeId(this);
    }).on("mouseleave", function (e) {
        addId(e, "out", this);
        $(this).on("animationend", function () {
            if ($(this).attr("id").indexOf("out") != -1) {
                $(this).attr("id", "");
                $(".wrapper").attr("id", "")
            }
        })
    })
}
function changeId(dom) {
    var id = $(dom).wrap().data("id");
    $(".wrapper").attr("id", id);
}
function addId(e, state, item) {
    var d = getDir(e, item);
    var str = "";
    switch (d) {
        case 0:
            str += "-top";
            break;
        case 1:
            str += "-right";
            break;
        case 2:
            str += "-bottom";
            break;
        case 3:
            str += "-left";
            break;
    }
    // console.log(state + str)
    $(item).attr("id", "");
    $(item).attr("id", state + str);
}

function getDir(e, item) {
    var w = item.offsetWidth;
    var x = e.clientX - item.offsetLeft - w / 2;
    var y = e.clientY - item.offsetTop - w / 2;
    var d = (Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
    // console.log(d)
    return d;
}
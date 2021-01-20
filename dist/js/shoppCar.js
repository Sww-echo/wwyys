"use strict";

$('.header').load('./header.html');
$.getScript('./js/header.js');
$('.footer').load('./footer.html'); // 头部吸顶

$(document).scroll(function () {
  if ($(window).scrollTop() > 180) {
    // console.log(111);
    $('.header').css({
      position: 'fixed',
      top: '-124px',
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      zIndex: 20
    }); // console.log($(window).scrollTop());
  } else {
    $('.header').css({
      position: 'static'
    });
  }
}); // 这里也是一样，拿到url里的code并存起来下面用

var code = location.href.split('?')[1].split('=')[1]; // 设置cookie

function setCookie(options) {
  options.days = options.days || 0;
  options.path = options.path || '';

  if (options.days === 0) {
    document.cookie = options.key + '=' + options.val + '; path=' + options.path;
  } else {
    var d = new Date();
    d.setDate(d.getDate() + options.days);
    document.cookie = options.key + '=' + options.val + '; expires=' + d + '; path=' + options.path;
  }
} // 获取cookie


function getCookie(key) {
  var arr = document.cookie.split('; ');

  for (var i = 0, len = arr.length; i < len; i++) {
    var arr2 = arr[i].split('=');

    if (arr2[0] === key) {
      return arr2[1];
    }
  }

  return null;
}

$.ajax({
  // 拿到详情页的数据
  type: 'get',
  url: './json/xiangqing.json',
  dataType: 'json',
  async: false,
  success: function success(data) {
    var str = '';
    var flag = true; // console.log(data);

    $.each(data.data, function (index, item) {
      // console.log(getCookie(item.id));
      if (getCookie(item.id)) {
        // 判断是否存在cookie
        flag = false;
        str += "<li class=\"clear\">\n          <section class=\"inp_img\">\n            <input type=\"checkbox\" /><img src=\"".concat(item.url, "\" alt=\"\" />\n          </section>\n          <h3>").concat(item.name, "</h3>\n          <span class=\"djpric\">\uFFE5").concat(item.nowPrice, "</span>\n          <section class=\"add_rem\">\n            <button>-</button><input code=\"").concat(item.id, "\" type=\"text\" name=\"\" id=\"\" /><button>\n              +\n            </button>\n          </section>\n          <span class=\"allpric\" code=\"").concat(item.id, "\">\uFFE5999</span>\n          <button class=\"remo\">\u5220\u9664</button>\n          </li>");
      }
    });

    if (flag) {
      str = "<h2>\u5565\u4E5F\u6CA1\u6709\uFF0C\u53BB\u901B\u901B\u5427\uFF01</h2>";
    }

    $('.main .shoppList').html(str); // console.log($('.shoppList .add_rem input'));
    // $('.shoppList .add_rem input').val('2')

    $.each($('.shoppList .add_rem input'), function (ind, ite) {
      // console.log(ite);
      $(ite).val(getCookie($(this).attr('code')));
    });
    $.each($('.shoppList li'), function (index, item) {
      // console.log($(item).children().eq(0));
      // 单价
      var price = Number($(item).children().eq(2).text().substr(1)); // 数量

      var num = Number($(item).children().eq(3).children().eq(1).val()); //  计算总价

      $(item).children().eq(4).text('￥' + price * num);
      console.log(price, num);
    });
  }
});
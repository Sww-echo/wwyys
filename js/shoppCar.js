$('.header').load('./header.html');
$.getScript('./js/header.js');
$('.footer').load('./footer.html');
// 头部吸顶
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
    });
    // console.log($(window).scrollTop());
  } else {
    $('.header').css({
      position: 'static'
    });
  }
});
var code = location.href.split('?')[1].split('=')[1];
// 设置cookie
function setCookie(options) {
  options.days = options.days || 0;
  options.path = options.path || '';
  if (options.days === 0) {
    document.cookie =
      options.key + '=' + options.val + '; path=' + options.path;
  } else {
    var d = new Date();
    d.setDate(d.getDate() + options.days);
    document.cookie =
      options.key +
      '=' +
      options.val +
      '; expires=' +
      d +
      '; path=' +
      options.path;
  }
}
// 获取cookie
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
  type: 'get',
  url: './json/xiangqing.json',
  dataType: 'json',
  async: false,
  success: function (data) {
    var str = '';
    var flag = true;
    // console.log(data);
    $.each(data.data, function (index, item) {
      // console.log(getCookie(item.id));
      if (getCookie(item.id)) {
        // console.log(item.id);
        flag = false;
        str += `<li class="clear">
          <section class="inp_img">
            <input type="checkbox" /><img src="${item.url}" alt="" />
          </section>
          <h3>${item.name}</h3>
          <span class="djpric">￥${item.nowPrice}</span>
          <section class="add_rem">
            <button>-</button><input code="${item.id}" type="text" name="" id="" /><button>
              +
            </button>
          </section>
          <span class="allpric" code="${item.id}">￥999</span>
          <button class="remo">删除</button>
          </li>`;
      }
    });
    if (flag) {
      str = `<h2>啥也没有，去逛逛吧！</h2>`;
    }
    $('.main .shoppList').html(str);
    // console.log($('.shoppList .add_rem input'));
    // $('.shoppList .add_rem input').val('2');
    /* $.each($('.shoppList .add_rem input'), function (ind, ite) {
      // console.log(ite);
      $(ite).val(getCookie($(this).attr('code')));
    });
    $.each($('.shoppList .allpric'), function (ind, ite) {
      $.each($('.shoppList .djpric'), function (i, it) {
        var price = $(it).text().substr(1);

        console.log(price);
        console.log(getCookie($(ite).attr('code')));
        $(ite).text('￥' + getCookie($(this).attr('code')) * price);
      });
    }); */
    $.each($('.shoppList .add_rem input'), function (ind, ite) {
      // console.log(ite);
      $(ite).val(getCookie($(this).attr('code')));
    });
    $.each($('.shoppList li'), function (index, item) {
      // console.log($(item).children().eq(0));
      // 单价
      var price = Number($(item).children().eq(2).text().substr(1));
      // 数量
      var num = Number($(item).children().eq(3).children().eq(1).val());
      //  计算总价
      $(item)
        .children()
        .eq(4)
        .text('￥' + price * num);
      console.log(price, num);
    });
  }
});

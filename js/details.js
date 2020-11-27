$('.header').load('./header.html');
$.getScript('./js/header.js');
$('.footer').load('./footer.html');
// 这里拿到首页点击传过来的url后面的code并存起来，下面要用
var code = location.href.split('?')[1].split('=')[1];
// console.log(code);
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
    $('.magnifying .shoppCar').css({
      top: 500
    });
    // console.log($(window).scrollTop());
  } else {
    $('.header').css({
      position: 'static'
    });
    $('.magnifying .shoppCar').css({
      top: 680
    });
  }
});
// 放大镜
$(function () {
  $.ajax({
    // 拿到详情页的数据
    type: 'get',
    url: './json/xiangqing.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      var str = '';
      // 这个是用来判断有没有数据的
      var flag = true;

      var boximg = null;
      $.each(data.data, function (index, item) {
        console.log(item.id);
        // 判断，通过code和拿到的数据匹配并渲染页面
        if (code === item.id) {
          str = `<div class="minBox">
                <img src="${item.url}" alt="" />
                <div class="mask"></div>
                </div>
                <div class="content">
                <img src="./img/fdjyc.png" alt="" />
                </div>
                <div class="maxBox">
                <img src="${item.url}" alt="" />
                </div>
                <div class="nav">`;
          $.each(item.imgs, function (ind, ite) {
            console.log(ite);
            str += `<section class=""><img src="${ite.url}" alt="" /></section>`;
          });
          flag = false;
          boximg = item.boximg;
        }
      });
      if (flag) {
        $('.shoppCar').css({ display: 'none' });
        str = '<h2>此商品没有数据 !-_-</h2>';
      } else {
        str += `</div><div class="boxImg container"><img src="${boximg}"></div>`;
      }
      // console.log(str);
      $('.main').html(str);
      // console.log();
      // 图片切换
      $('.main .nav img').on('mouseenter', function () {
        // console.log($(this));
        $('.main .minBox').children().attr('src', $(this).attr('src'));
        $('.main .maxBox').children().attr('src', $(this).attr('src'));
        $('.main .nav img').parent().removeClass('show');
        $(this).parent().toggleClass('show');
      });
      // 蒙版拖动
      // 蒙版
      var $mask = $('.details_main .magnifying .main .minBox .mask');
      $('.main .minBox').on('mouseenter', function () {
        $mask.css({
          display: 'block'
        });
        $('.main .maxBox').css({ display: 'block' });
      });
      $('.main .minBox').on('mousemove', function (e) {
        var left = e.pageX - $(this).offset().left - $mask.width() / 2;
        var top = e.pageY - $(this).offset().top - $mask.height() / 2;
        if (left <= 0) {
          left = 0;
        }
        if (left >= $(this).width() - $mask.width()) {
          left = $(this).width() - $mask.width();
        }
        if (top >= $(this).height() - $mask.height()) {
          top = $(this).height() - $mask.height();
        }
        if (top <= 0) {
          top = 0;
        }
        $mask.css({
          left: left,
          top: top
        });
        var multX = left / ($(this).width() - $mask.width());
        var multY = top / ($(this).height() - $mask.height());
        // console.log($('.main .maxBox img'));
        $('.main .maxBox img').css({
          left:
            -($('.main .maxBox img').width() - $('.main .maxBox').width()) *
            multX,
          top:
            -($('.main .maxBox img').height() - $('.main .maxBox').height()) *
            multY
        });
      });
      $('.main .minBox').on('mouseleave', function () {
        $mask.css({
          display: 'none'
        });
        $('.main .maxBox').css({ display: 'none' });
      });
      // 页面加载获取cookie
      $('.carnum .inp').val(getCookie(code));
      if (!getCookie(code)) {
        $('.carnum .inp').val(1);
      }
      // 点击数量减少
      $('.carnum .car_prev').on('click', function () {
        var carnum = Number($('.carnum .inp').val());
        if (carnum <= 1) {
          carnum = 1;
        } else {
          carnum--;
        }
        console.log(carnum);
        $('.carnum .inp').val(carnum);
      });
      // 点击数量增加
      $('.carnum .car_add').on('click', function () {
        var carnum = Number($('.carnum .inp').val());
        carnum++;
        $('.carnum .inp').val(carnum);
      });
      // 点击加入购物车存cookie
      $('.addcar .add_gwc').on('click', function () {
        var carnum = Number($('.carnum .inp').val());
        setCookie({
          key: code,
          val: carnum,
          day: 10
        });
        console.log(carnum);
      });
      // 点击立即购买跳转页面并传入商品code
      $('.shoppCar .addcar .mai').on('click', function () {
        $(this).attr('href', `shoppCar.html?code=${code}`);
      });
    }
  });
});

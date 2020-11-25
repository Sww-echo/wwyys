$('.header').load('./header.html');
$.getScript('./js/header.js');
$('.footer').load('./footer.html');
var code = location.href.split('?')[1].split('=')[1];
// console.log(code);
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
// 放大镜
$(function () {
  $.ajax({
    type: 'get',
    url: './json/xiangqing.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      var str = '';
      $.each(data.data, function (index, item) {
        // console.log(item);
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
        }
      });
      str += '</div>';
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
    }
  });
});

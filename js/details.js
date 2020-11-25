$('.header').load('./header.html');
$.getScript('./js/header.js');
$('.footer').load('./footer.html');
var code = location.href.split('?')[1].split('=')[1];
console.log(code);
$(document).scroll(function () {
  if ($(window).scrollTop() > 180) {
    console.log(111);
    $('.header').css({
      position: 'fixed',
      top: '-124px',
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      zIndex: 20
    });
    console.log($(window).scrollTop());
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
      console.log(str);
      $('.main').html(str);
      // console.log();
      $('.main .nav img').on('mouseenter', function () {
        console.log($(this));
        $('.main .minBox').children().attr('src', $(this).attr('src'));
        $('.main .maxBox').children().attr('src', $(this).attr('src'));
        $('.main .nav img').parent().removeClass('show');
        $(this).parent().toggleClass('show');
      });
    }
  });
});

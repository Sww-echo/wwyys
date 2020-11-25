$('.header').load('./header.html');
$.getScript('./js/header.js');
$('.footer').load('./footer.html');

$(function () {
  // 新品首发
  $.ajax({
    type: 'get',
    url: './json/newitem.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      var newStr = '';
      // console.log(data);
      $.each(data, function (index, item) {
        newStr += `<li  code = "${item.id}">
          <a href="#" class="li_top"
            ><img src="${item.showPicUrl}" alt=""
          /></a>
          <a href="#" class="li_buttom">
            <p>${item.name}</p>
            <span>￥${item.retailPrice}</span>
          </a>
          </li>`;
      });
      $('.newlist .newul').on('mouseenter', 'li', function () {
        // console.log($($(this).children()[0]).children());
        var _$this = $(this);
        $.each(data, function (index, item) {
          // console.log(_$this.attr('code'));
          if (Number(_$this.attr('code')) === item.id) {
            // console.log(item.showPicUrl);
            $(_$this.children()[0]).children().attr('src', item.scenePicUrl);
          }
        });
      });
      $('.newlist .newul').on('mouseleave', 'li', function () {
        // console.log($($(this).children()[0]).children());
        var _$this = $(this);
        $.each(data, function (index, item) {
          // console.log(_$this.attr('code'));
          if (Number(_$this.attr('code')) === item.id) {
            // console.log(item.showPicUrl);
            $(_$this.children()[0]).children().attr('src', item.showPicUrl);
          }
        });
      });
      $('.newlist .newul').html(newStr);
      // 左右点击
      $('.newlist .li_prev').on('click', function () {
        // $('.newlist').scrollLeft(2200);
        $('.newlist').animate({ scrollLeft: '0px' }, 750);
      });
      $('.newlist .li_next').on('click', function () {
        // $('.newlist').scrollLeft(2200);
        $('.newlist').animate({ scrollLeft: '2200px' }, 750);
      });
    }
  });

  // console.log($('.recom_main .rec_item'));
  // 新人推荐
  $.ajax({
    type: 'get',
    url: './json/popularItemList.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      var str = '';
      // console.log(data);
      $.each(data, function (index, item) {
        str += `              
            <div class="rec_tj">
            <div class="rec_smallimg">
              <img src="${item.showPicUrl}" alt="" />
            </div>
            <i class="xrtj">${item.promTag}</i>
            <p class="rec_p">${item.name}</p>
            <span class="rec_pric">￥${item.retailPrice}</span>
            </div>`;
      });
      // console.log($('.recom_main .recitem'));
      $('.recom_main .rec_item').html(str);
    }
  });
  // 居家生活
  $.ajax({
    type: 'get',
    url: './json/jujiashenghuo.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      var str = '';
      console.log(data);
      $.each(data, function (index, item) {
        str += `<li code="${item.id}">
        <a href="#" class="change_top"
          ><img src="${item.showPicUrl}" alt=""
        /></a>
        <a href="#" class="change_buttom">
          <p>${item.name}</p>
          <span>￥${item.retailPrice}</span>
        </a>
      </li>`;
      });
      console.log($('.change .change_item'));
      $('.change .change_item').html(str);
      $('.change .change_item').on('mouseenter', 'li', function () {
        // console.log($($(this).children()[0]).children());
        var _$this = $(this);
        $.each(data, function (index, item) {
          // console.log(_$this.attr('code'));
          if (Number(_$this.attr('code')) === item.id) {
            // console.log(item.showPicUrl);
            $(_$this.children()[0]).children().attr('src', item.scenePicUrl);
          }
        });
      });
      $('.change .change_item').on('mouseleave', 'li', function () {
        console.log($($(this).children()[0]).children());
        var _$this = $(this);
        console.log(_$this);
        $.each(data, function (index, item) {
          // console.log(_$this.attr('code'));
          if (Number(_$this.attr('code')) === item.id) {
            // console.log(item.showPicUrl);
            console.log(item.id);
            $(_$this.children()[0]).children().attr('src', item.showPicUrl);
          }
        });
      });
    }
  });
  $.ajax({
    type: 'get',
    url: './json/commentList.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      var str = '';
      var itemIndex = 0;
      console.log(data);
      $.each(data, function (index, item) {
        str += `<div class="saySide_item">
        <a href="#"><img src="${item.listPicUrl}" alt="" /></a>
        <section class="sayLiuyan">
          <p class="sayName clear">
            <span>${item.frontUserName}</span><span>2010/12/25</span>
          </p>
          <div class="sayhaha clear">
            <h4>${item.name}</h4>
            <span class="saypric">￥${item.retailPrice}</span>
          </div>

          <p class="sayAllyan">${item.content}</p>
        </section>
      </div>`;
      });
      str += str;
      $('.sayAll .saySide').html(str);
      console.log($('.sayAll .saySide').children().length);
      // 自动播放
      var timer;
      function move() {
        timer = setInterval(function () {
          if (itemIndex >= 20) {
            //临界值
            itemIndex = 0;
            $('.sayAll .saySideBox').scrollLeft(0); //滚动条回到前面的第一张图片位置
          }
          itemIndex++;
          $('.sayAll .saySideBox')
            .stop()
            .animate({ scrollLeft: 365 * itemIndex }, 1000);
          // console.log(itemIndex);
        }, 1750);
      }
      move();
      // 鼠标滑入关闭定时器
      $('.sayAll .saySideBox').on('mouseenter', function () {
        clearInterval(timer);
      });
      // 鼠标滑出关闭上一次定时器并开启下一个定时器
      $('.sayAll .saySideBox').on('mouseleave', function () {
        clearInterval(timer);
        move();
      });
      // 点击上一个
      $('.sayAll .sayprev').on('click', function () {
        clearInterval(timer);
        console.log(itemIndex);
        if (itemIndex <= 0) {
          itemIndex = 20;
          $('.sayAll .saySideBox').scrollLeft(7300);
          itemIndex--;
        } else {
          itemIndex--;
        }
        $('.sayAll .saySideBox')
          .stop()
          .animate({ scrollLeft: 365 * itemIndex }, 1000);
        move();
      });
      // 点击下一个
      $('.sayAll .saynext').on('click', function () {
        clearInterval(timer);
        console.log(itemIndex);
        if (itemIndex < 20) {
          itemIndex++;
        } else {
          itemIndex = 0;
          $('.sayAll .saySideBox').scrollLeft(0);
          itemIndex++;
        }
        $('.sayAll .saySideBox')
          .stop()
          .animate({ scrollLeft: 365 * itemIndex }, 1000);
        move();
      });
    }
  });
  // 头部吸顶
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

      // console.log($(window).scrollTop());
    } else {
      $('.header').css({
        position: 'static'
      });
    }
  });
});

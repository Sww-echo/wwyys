$('.header').load('./header.html');
$.getScript('./js/header.js');
$('.footer').load('./footer.html');

$(function () {
  // 新品首发
  $.ajax({
    // 拿到新品首发的数据，下面ajax一样拿到相应数据
    type: 'get',
    url: './json/newitem.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      var newStr = '';
      // console.log(data);
      $.each(data, function (index, item) {
        // 下面a标签里跳转到放大镜那个页面的时候传入了商品id
        // 点击a标签跳转页面，后面拼接了商品id，下面一样
        newStr += `<li  code = "${item.id}">
          <a href="./details.html?code=${item.id}" target="_blank" class="li_top"
            ><img src="${item.showPicUrl}" alt=""
          /></a>
          <a href="#" class="li_buttom">
            <p>${item.name}</p>
            <span>￥${item.retailPrice}</span>
          </a>
          </li>`;
      });
      $('.newlist .newul').on('mouseenter', 'li', function () {
        // 这是鼠标滑入滑出切换图片
        var _$this = $(this);
        $.each(data, function (index, item) {
          if (Number(_$this.attr('code')) === item.id) {
            $(_$this.children()[0]).children().attr('src', item.scenePicUrl);
          }
        });
      });
      $('.newlist .newul').on('mouseleave', 'li', function () {
        var _$this = $(this);
        $.each(data, function (index, item) {
          if (Number(_$this.attr('code')) === item.id) {
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
        // 下面a标签里跳转到放大镜那个页面的时候传入了商品id
        str += `              
            <div class="rec_tj">
            <a href="./details.html?code=${item.id}" target="_blank" class="rec_smallimg">
              <img src="${item.showPicUrl}" alt="" />
            </a>
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
        // 下面a标签里跳转到放大镜那个页面的时候传入了商品id
        str += `<li code="${item.id}">
        <a href="./details.html?code=${item.id}" target="_blank" class="change_top"
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
          // 这里遍历数据，通过li标签上的code属性匹配相应的数据然后渲染，下面滑出也是
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
  // 大家都在说--底部轮播/*  */
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
  // 我这个头部没有写任何数据传输
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
    if ($(window).scrollTop() > 400) {
      $('.arrival .arrival_left').css({
        position: 'fixed',
        top: 160,
        left: 40,
        zIndex: 21
      });
    } else {
      $('.arrival .arrival_left').css({
        position: 'absolute',
        left: -180,
        top: 50,
        zIndex: 21
      });
    }
  });
});

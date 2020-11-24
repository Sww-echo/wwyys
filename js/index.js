$('.header').load('./header.html');
$.getScript('./js/header.js');
$(function () {
  // 新品首发
  $.ajax({
    type: 'get',
    url: './json/newitem.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      var newStr = '';
      console.log(data);
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

  console.log($('.recom_main .rec_item'));
  // 新人推荐
  $.ajax({
    type: 'get',
    url: './json/popularItemList.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      var str = '';
      console.log(data);
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
      console.log($('.recom_main .recitem'));
      $('.recom_main .rec_item').html(str);
    }
  });
});

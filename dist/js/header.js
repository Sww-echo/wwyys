"use strict";

(function () {
  var topData = null;
  $.ajax({
    type: 'get',
    url: './json/wangyiTop.json',
    dataType: 'json',
    async: false,
    success: function success(data) {
      topData = data.data;
    },
    error: function error(err) {
      console.log(err);
    }
  });
  var cateList = topData.cateList; //  "首页"nav数据

  var cateStr = '<li><a href="javascript:;" class="shou">首页</a></li>';
  $.each(cateList, function (index, item) {
    cateStr += "<li><a href=\"javascript:;\" active=\"show\" code=\"".concat(item.id, "\">").concat(item.name, "</a></li>");
  });
  cateStr += "<li><a href=\"javascript:;\">\u4E3A\u4F60\u4E25\u9009</a></li><li><a href=\"javascript:;\">\u4F17\u7B79</a></li>";
  $('.ullist').html(cateStr);
  $('.ullist').on('mouseenter', 'li a[active=show]', function () {
    $('.showlist').css('display', 'block');

    var _$thiscode = Number($(this).attr('code'));

    $.each(cateList, function (index, item) {
      var showArr = [];

      if (_$thiscode === item.id) {
        // console.log(item.id);
        var showList = '';
        $.each(item.subCateGroupList, function (inde, ite) {
          showList += "<li code=\"".concat(ite.id, "\"><h3>").concat(ite.name, "</h3>"); // console.log(ite);

          var showListImg = '';
          showArr.push(ite.categoryList);
          $.each(ite.categoryList, function (ind, it) {
            showListImg += "\n            <section class=\"listimg\">\n              <a href=\"javascript:;\">\n              <img src=\"".concat(it.bannerUrl, "\" alt=\"\" /><span>").concat(it.name, "</span>\n              </a>\n            </section>");
          });
          showList += showListImg + '</li>'; // console.log(showList);

          $('.showlist ul').html(showList);
        });
      }
    });
    $('.ullist').on('mouseleave', 'li a', function () {
      $('.showlist').css('display', 'none'); // return false;
    });
    $('.head_logo').on('mouseenter', '.showlist', function () {
      $('.showlist').css('display', 'block');
      return false;
    });
    $('.head_logo').on('mouseleave', '.showlist', function () {
      $('.showlist').css('display', 'none');
      return false;
    });
  }); // $(window).scrollTop();
})();
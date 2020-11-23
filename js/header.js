(function () {
  var topData = null;
  $.ajax({
    type: 'get',
    url: './json/wangyiTop.json',
    dataType: 'json',
    async: false,
    success: function (data) {
      topData = data.data;
    },
    error: function (err) {
      console.log(err);
    }
  });
  var cateList = topData.cateList; //  "首页"nav数据
  var cateStr = '<li><a href="javascript:;" class="shou">首页</a></li>';
  $.each(cateList, function (index, item) {
    cateStr += `<li><a href="javascript:;" code="${item.id}">${item.name}</a></li>`;
  });
  cateStr += `<li><a href="javascript:;">为你严选</a></li><li><a href="javascript:;">众筹</a></li>`;
  $('.ullist').html(cateStr);
  $('.ullist').on('mouseenter', 'li a', function () {
    var _$thiscode = Number($(this).attr('code'));
    $.each(cateList, function (index, item) {
      var showArr = [];
      if (_$thiscode === item.id) {
        // console.log(item.id);
        var showList = '';
        $.each(item.subCateGroupList, function (inde, ite) {
          showList += `<li code="${ite.id}">
            <h3>${ite.name}</h3>`;
          // console.log(ite);
          var showListImg = '';
          showArr.push(ite.categoryList);
          $.each(ite.categoryList, function (ind, it) {
            showListImg += `
            <section class="listimg">
            <a href="javascript:;">
            <img src="${it.bannerUrl}" alt="" /><span>${it.name}</span>
            </a>
            </section>`;
          });
          showList += showListImg + '</li>';
          console.log(showList);
          $('.showlist ul').html(showList);
        });
      }
    });
  });
})();

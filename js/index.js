var wepay = {
    wepayLoaidng: function() {
        setTimeout(function(){
            $("#wepayLoaidng").addClass('hide');
        }, 2000)
    },
    //左侧下拉菜单
    pullDownMenu : function(){
        $('.wepay-menu-submenu-title').on('click',function(){ 
            var wepayMenuSubmenu = $(this).parent('.wepay-menu-submenu');
            if(wepayMenuSubmenu.hasClass('wepay-menu-submenu-open')){ 
                wepayMenuSubmenu.removeClass('wepay-menu-submenu-open');
            }else{ 
                wepayMenuSubmenu.addClass('wepay-menu-submenu-open');
            }
        })
    },
    //左导航小图标
    showNav : function(){
        var navIco = $("#nav")
        $("#ico_nav").on('click',function(){
            wepay.crtlNav(navIco);
        })
        $(window).on('resize',function(){
            if($(window).width() >= 992){
                 navIco.show();
                 wepay.toTop();
            }
            else if($(window).width() < 992){
                navIco.hide()
            }
        })
    },
    crtlNav : function(selector){
        if($(window).width() < 992){
            if(selector.is(":hidden")){
                selector.show()
                
            }
            else{
                selector.hide();

            }
        }
        
    },
    //左侧菜单背景色
    changeMenuBg : function(selector){
        if(selector.hasClass('wepay-menu-item-selected')){
            return
        }
        else{
            $(".wepay-menu").find(".wepay-menu-item").removeClass('wepay-menu-item-selected');
            selector.addClass("wepay-menu-item-selected")
        }
        return true;
    },
    toTop : function(){
        $('html, body').animate({scrollTop:0}, 500);
    },
    //页面局部刷新
    fnHashTriggerMenu : $(".wepay-menu-item > a").on("click", function(event) {
        wepay.toTop();
        wepay.changeMenuBg($(this).parent('.wepay-menu-item'));
        wepay.crtlNav($("#nav"))
        var query = this.href.split("?")[1];
        if (history.pushState && query) {
            // $("#contentMain").attr("src",query + ".html");
            // $("#contentMain").on('load',function() {
            //     $(this).height($(this).contents().find("#"+ query).height() + 30);
            // })
            $("#"+query).removeClass('hide').siblings().addClass("hide");
            // history处理
            var title = "WePayUI - " + $(this).text();
            document.title = title;     
            history.pushState({ title: title }, title, location.href.split("?")[0] + "?" + query);
        }
        return false;
    }),
    fnHashTrigger: function(target) {
        var query = location.href.split("?")[1], eleTarget = target || null;
        if (typeof query == "undefined") {
            if (eleTarget = wepay.fnHashTriggerMenu.get(0)) {
                // 如果没有查询字符，则使用第一个导航元素的查询字符内容
                history.replaceState(null, document.title, location.href.split("#")[0] + "?" + eleTarget.href.split("?")[1]) + location.hash;    
                wepay.fnHashTrigger(eleTarget);
            }
        } else {
            wepay.fnHashTriggerMenu.each(function() {
                if (eleTarget === null && this.href.split("?")[1] === query) {
                    eleTarget = this;
                }
            });
            
            if (!eleTarget) {
                // 如果查询序列没有对应的导航菜单，去除查询然后执行回调
                history.replaceState(null, document.title, location.href.split("?")[0]);    
                wepay.fnHashTrigger();
            } else {
                $(eleTarget).trigger("click");
            }        
        }
    },
    //初始化
    init : function(){
        wepay.showNav();
        wepay.pullDownMenu();
        wepay.fnHashTriggerMenu;
        if (history.pushState) {
            window.addEventListener("popstate", function() {
                wepay.fnHashTrigger();                             
            });
            wepay.fnHashTrigger();
        }
        wepay.wepayLoaidng();
    }
}
wepay.init();
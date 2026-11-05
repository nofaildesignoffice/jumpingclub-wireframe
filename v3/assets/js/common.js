var body = $("html, body");

$(function(){ 
    // gnb - pc ver
    $('#gnb li').on('mouseover', function(e){
        if ( !isMobile() ) {
            body.removeClass('search-open') ;
            var gnbmenu = $(this).find('a').data('menu') ;
            body.addClass('gnb-open') ;
            $(gnbmenu).addClass('active').siblings().removeClass('active') ;
        }  
    });
    $('.hd').on('mouseleave', function(e){
        if ( !isMobile() ) gnbClose();
    });

    // gnb - pc tab focus
    let targetMenu = '';
    $('#gnb ul li a[data-menu]').on('focus', function(e) {
        e.preventDefault();
        targetMenu = $(this).data('menu');
        if (targetMenu) {
            $('html, body').addClass('gnb-open');
            $('body').removeClass('search-open');
            $('.gnb-menu > div').removeClass('active');
            $(targetMenu).addClass('active');
        }
    }).on('keydown', function(e) {
        targetMenu = $(this).data('menu');
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            if (targetMenu) {
                $(targetMenu).find('ul.depth1 li:first-child > p:first-child > a').focus();
            }
        }
    });

    // 각 메뉴 시작
    for (let i = 1; i <= 4; i++) {
        $(document).on('keydown', `#gnb-menu${i} ul.depth1 li:first-child > p > a`, function(e) {
            if (e.key === "Tab" && e.shiftKey) {
                e.preventDefault();
                $(`#gnb ul li a[data-menu="#gnb-menu${i}"]`).focus();
            }
        });
    }

    // 각 메뉴 마지막
    $(document).on('keydown', '#gnb-menu1 ul.depth1 li:last-child .depth2 li:last-child a', function(e) {
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            $('#gnb ul li a[data-menu="#gnb-menu2"]').focus();
        }
    });
    $(document).on('keydown', '#gnb-menu2 ul.depth1 li:last-child .depth2 li:last-child a', function(e) {
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            $('#gnb ul li a[data-menu="#gnb-menu3"]').focus();
        }
    });
    $(document).on('keydown', '#gnb-menu3 ul.depth1 > li:last-child > p > a', function(e) {
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            $('#gnb ul li a[data-menu="#gnb-menu4"]').focus();
        }
    });
    $(document).on('keydown', '#gnb-menu4 ul.depth1 li:last-child a', function(e) {
        if (e.key === "Tab" && !e.shiftKey) {
            e.preventDefault();
            gnbClose();
            $('.btn-gnb-search').focus();
        }
    });

    // search focus
    $(document).on('keydown', function(event) {
        if (event.key === 'Tab') {
            srchTabPrevent();
        }
    });
    function srchTabPrevent() {
        if ($('body').hasClass('search-open')) {
            $('.hd-search input').attr('tabindex', '0'); 
        } else {
            $('.hd-search input').attr('tabindex', '-1');
        }
    }

    // gnb - mo ver
    $('.btn-gnb-open').on('click', function(e){
        body.removeClass('search-open') ;
        if (body.hasClass('gnb-open')) {
            gnbClose();
        } else {
            body.addClass('gnb-open') ;
        }
    });
    $('.gnb-menu p').on('click', function(e){
        var $childmenu = null;
        if ( isMobile() ) {  
            if ($(this).hasClass('open-dep1')) {
                var $gnbmenu =  $(this).parent('div') ;
                var $submenu =  $gnbmenu.find('.depth1') ;
                $childmenu =  $submenu.find('ul') ;
            } else {
                var $gnbmenu =  $(this).parent('li') ;
                var $submenu =  $gnbmenu.find('.depth2') ;
            } 
            if ( $gnbmenu.hasClass('active') ) {
                // close
                $gnbmenu.removeClass('active');
                $submenu.slideUp() ;
                if ( $childmenu ) $childmenu.slideUp() ;
            } else {
                //open
                $gnbmenu.addClass('active').siblings().removeClass('active');
                $gnbmenu.siblings().find('ul').slideUp() ;
                $submenu.slideDown() ;
            }
        }
    });

    // search
    $('.btn-gnb-search').on('click', function(e){
        gnbClose();
        if (body.hasClass('search-open')) {
            body.removeClass('search-open') ;
        } else {
            body.addClass('search-open') ;
        }
    });
    $('.search-delete').on('click', function(e){
        $('.search-wrap input').val('') ;
    });

    // Swiper
    if (typeof Swiper !== 'undefined') {
        const thumbswiperArr = document.querySelectorAll(".thumbnail-swiper");
        if (thumbswiperArr.length > 0) {
            var swiperMainArr = new Array;
            var swiperThumbsArr = new Array;
            thumbswiperArr.forEach(function (el, i) {
                $(el).attr('id', 'thumbswiper-'+i);
                var nextbtn = "#thumbswiper-"+i+" .swiper-button-next";
                var prevbtn = "#thumbswiper-"+i+" .swiper-button-prev";
                var pagination = el.querySelectorAll(".swiper-pagination")[0];
                var mainSwiper = el.querySelectorAll(".swiperMain")[0];
                var thumbsSwiper = el.querySelectorAll(".swiperThumbs")[0]; 
                var verticalThumbs = el.querySelectorAll(".verticalThumbs")[0]; 

                // 섬네일 스와이퍼
                if(thumbsSwiper && !verticalThumbs) {
                    swiperThumbsArr[i] = new Swiper( thumbsSwiper , {
                        slidesPerView: 'auto',
                        spaceBetween: 8,
                    });
                } else if(thumbsSwiper && verticalThumbs) {
                    swiperThumbsArr[i] = new Swiper( thumbsSwiper , {
                        direction: 'vertical',
                        slidesPerView: 6,
                        spaceBetween: 10,
                    });
                } else {
                    swiperThumbsArr[i] = null;
                }

                // 메인 스와이퍼
                swiperMainArr[i] = new Swiper( mainSwiper , {
                    slidesPerView: 1,
                    watchSlidesProgress: true,
                    navigation: {
                        nextEl: nextbtn,
                        prevEl: prevbtn,
                    },
                    pagination: {
                        el: pagination,
                        type: "fraction",
                    },
                    thumbs: {
                        swiper: swiperThumbsArr[i],
                    },
                });
            });
        }

        const transitionSwiperArr = document.querySelectorAll(".transitionSwiper");
        if (transitionSwiperArr.length > 0) {
            var swiperTansArr = new Array;
            transitionSwiperArr.forEach(function (el, i) {
                var nextbtn = el.querySelectorAll(".swiper-button-next")[0];
                var prevbtn = el.querySelectorAll(".swiper-button-prev")[0];
                var pagination = el.querySelectorAll(".swiper-pagination")[0];
                var mainSwiper = el.querySelectorAll(".transition-Swiper")[0];

                // 메인 스와이퍼
                swiperTansArr[i] = new Swiper( mainSwiper , {
                    slidesPerView: 1, 
                    spaceBetween: 12,
                    loop: true ,
                    speed :200 ,
                    breakpoints: {
                        1200: {
                            slidesPerView: 'auto',
                            spaceBetween: 24,
                        },
                        576: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                    },
                    navigation: {
                        nextEl: nextbtn,
                        prevEl: prevbtn,
                    },
                    pagination: {
                        el: pagination,
                        type: "fraction",
                    },
                });
            });
        }
    }


    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // footer
    $('.ft-links .select-box').on('click', function (e) {
        e.stopPropagation();

 
        $('.ft-links .select-box').not(this).removeClass('active');


        $(this).toggleClass('active');
    });


    $(document).on('click', function(e){
        if ($(e.target).closest('.ft-links .family-site, .ft-links .lang-select').length === 0) {
            $('.ft-links .select-box').removeClass('active');
        }
    });

});


function isMobile(){
    if ( $(window).width() < 992 ) {
        return true ;
    } else {
        return false ;
    }
}

// 스크롤 이벤트
$(window).on('scroll', function(){ 
    var sT = $(window).scrollTop() ;
    if(sT>1){
        body.addClass('is-scroll') ;
    } else {
        body.removeClass('is-scroll') ;
    }
    
    var stickyTop = 0;
    if ($('.sub-menu').length > 0) {
        stickyTop = 440 - $('.hd').height() - $('.sub-menu').height() ;
        if(sT > stickyTop){
            $('.sub-menu').addClass('is-sticky') ;
        } else {
            $('.sub-menu').removeClass('is-sticky') ;
        }
    }
}).trigger('scroll');

// onload 이벤트
$(window).on('load', function(){
});

// resize 이벤트
$(window).on('resize', function(){
    if ( !isMobile() ) {
        gnbClose();
    }
});

function gnbClose(){
    body.removeClass('gnb-open') ;
    $('.gnb-menu').find('ul').removeAttr('style') ;
    $('.gnb-menu').find('.active').removeClass('active') ;
}

function mobilevh(){
    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

//popup close
function closePopup(e) {
    $(e).closest('.popup').hide();
}

$(function(){ 
    // top-visual
    var topSwiper = new Swiper(".topSwiper", {
        loop: true ,
        speed: 800,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".topSwiper .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="'+className+'">' + (index + 1) + "</span>";
            },
        },
        navigation: {
            nextEl: ".topSwiper .swiper-button-next",
            prevEl: ".topSwiper .swiper-button-prev",
        },
    });
    $('.top-swiper-play').on('click',function(){
        if ($(this).hasClass('pause')) {
            topSwiper.autoplay.stop();
            $(this).removeClass('pause');
        } else {
            topSwiper.autoplay.start();
            $(this).addClass('pause');
        }
    });

    // sect1 heartSwiper
    var heartSwiper = new Swiper(".heartSwiper", {
        slidesPerView: "auto",
        spaceBetween: 12,
        loop: true,
        loopAdditionalSlides: 1,
        initialSlide: 1,
        breakpoints: {
            576: {
                spaceBetween: 24,
                loop: false,
                initialSlide: 0,
            },
        },
        pagination: {
            el: ".sect1 .swiper-pagination",
            type: "progressbar",
        },
        navigation: {
            nextEl: ".sect1 .swiper-button-next",
            prevEl: ".sect1 .swiper-button-prev",
        },
    });

    // sect2  heart to change
    $('.sect2 .tab-link a').on('click',function(e){
        e.stopPropagation();
        e.preventDefault() ;
        var tg = $(this).attr('href') ;
        if ( !isMobile() ) {
            //pc
            var gappx = $('.sect2 .tab-cont').offset().top - $('.sect2 .contents').offset().top ;
            $('html, body').animate({scrollTop : $('.sect2').offset().top + 501 + ($(tg).offset().top - $('.sect2 .tab-cont>div').offset().top) } , 200) ;
            setTimeout(() => {
                $('.sect2 .tab-link a').removeClass('on') ;
                $(this).addClass('on') ;
            }, 300);
        } else {
            // mo
            $(tg).addClass('active').siblings().removeClass('active') ;
            $('.sect2 .tab-link a').removeClass('on') ;
            $(this).addClass('on') ;
        }
    });

    
    // sect4   
    var sect4SwiperThumbs = new Swiper(".sect4SwiperThumbs", {
        slidesPerView: 'auto',
        spaceBetween: 12,
        loop: true ,
    });
    var sect4Swiper = new Swiper(".sect4Swiper", {
        loop: true ,
        effect: "cards",
        grabCursor: true,
        cardsEffect: {
          perSlideOffset: 8, // Space between cards in px
          perSlideRotate: 0.5, // Rotation of cards in degrees
        },
        pagination: {
          el: ".sect4 .swiper-pagination",
          type: "fraction",
        },
        navigation: {
            nextEl: ".sect4 .swiper-button-next",
            prevEl: ".sect4 .swiper-button-prev",
        },
        thumbs: {
          swiper: sect4SwiperThumbs,
        },
        controller: {
            control: null
        }
    });
    var sect4SwiperTxt = new Swiper(".sect4Swiper-txt", {
        loop: true ,
        effect: "slide",
        allowTouchMove: false,
        controller: {
            control: sect4Swiper
        }
    });
    if(sect4Swiper.controller){sect4Swiper.controller.control = sect4SwiperTxt;}
    
    
    // sect5   
    var sect5Swiper = new Swiper(".sect5Swiper", {
        slidesPerView: "auto",
        spaceBetween: 12,
        // loop: true ,
        breakpoints: {
            576: {
                spaceBetween: 24,
            },
        },
        pagination: {
            el: ".sect5 .swiper-pagination",
            type: "progressbar",
        },
        navigation: {
            nextEl: ".sect5 .swiper-button-next",
            prevEl: ".sect5 .swiper-button-prev",
        },
    });

    $('.swiper-button-next, .swiper-button-prev').on('keydown', function(e) {
        if (e.key === 'Enter') {
          $(this).trigger('click'); // 클릭 이벤트 트리거
        }
    });
});


$(window).on('scroll', function(){
    sect2Scroll();
});
$(window).on('load', function(){
    sect2Scroll();
    sect3slide() ;
});
$(window).on('resize', function(){
    sect3slide();
});

function sect2Scroll(){
    // console.log(isMobile())
    var wSt =  $(window).scrollTop() ,
        sect2Top = $('.sect2').offset().top , 
        spacing = wSt - sect2Top - 500;

    var $tabCont = $('.sect2 .tab-cont') ,
        $tabContDiv = $('.sect2 .tab-cont>div'),
        tabContTop = $tabCont.offset().top ;
        tabcontSet =  $tabContDiv.height() - $tabCont.height() + 1;
        
    if ( !isMobile() ) {
        if (spacing > 0) {
            $('.cloud1').css({'left': (spacing / 2)+'px' , 'top': -(spacing / 7)+'px'});
            $('.cloud2').css({'left': (spacing / 4)+'px' , 'margin-top': -(spacing / 10)+'px'});
            
                // console.log(tabContTop ,'/', wSt) ;
            if ( spacing < tabcontSet) {
                $tabContDiv.css('transform','translateY(-'+spacing+'px)') ; 
            } else {
                $tabContDiv.css('transform','translateY(-'+tabcontSet+'px)') ;
            }

            // console.log(wSt, ) ;
            $tabContDiv.find('div').each(function(i, e){
                var thisA = $('.tab-link>li').eq(i).find('a') ;
                if (tabContTop > $(this).offset().top - 150 ) {
                    if ( !thisA.hasClass('on') ) {
                        thisA.addClass('on');
                        $('.tab-link>li').eq(i).siblings().find('a').removeClass('on') ;
                    }
                } else {
                    thisA.removeClass('on');
                }
            });

        } else {
            $('.tab-cont>div').css('transform','translateY(0)') ;
        }
        $tabContDiv.find('li').each(function(i, e){
            if ( (wSt + $(window).height() ) - ( $(this).offset().top + $(this).height()) > 0) {
                if ( !$(this).hasClass('counting') ) {
                    $(this).addClass('counting') ;
                    countAction( $(this)) ;
                }
            } else {
                $(this).removeClass('counting') ;
            }
        });
    } else {
        $('.tab-cont>div').css('transform','translateY(0)') ;
    }
}

function countAction(t){
    var countArr = new Array;
    var $tg = t.find('[data-count]') ,
        tgID = $tg.attr('id') ,
        tgText = String($tg.data('count'))  ;
        tgCnt =  tgText.replaceAll(',', ''); 
    new CountUp(tgID, Number(tgCnt)/3*2, Number(tgCnt)).start();
}

var sect3Swiper ;
function sect3slide(){
    // sect3
    if ( isMobile() ) {
        sect3Swiper = new Swiper(".sect3Swiper", {
            spaceBetween: 20, 
            pagination: {
                el: ".sect3Swiper .swiper-pagination",
                clickable: true,
            },
        });
    } 
}
/* v3: sect2 스크롤 롤링 — PC·모바일 공통, 배경 전환을 앞당김 */
var S2 = {pre: 60, post: 260, maxT: 0, start: 0};
function s2Layout(){
    var $s = $('.index section.sect2'); if(!$s.length) return;
    var $c = $s.find('.contents'), $tc = $s.find('.tab-cont'), $d = $tc.children('div'), $p = $d.children('div');
    var mob = window.innerWidth < 996;
    $p.css({height: '', minHeight: ''}); $tc.css('height', '');
    var H;
    if (mob) {
        H = 0; $p.each(function(){ H = Math.max(H, $(this).outerHeight()); });
        $p.css('height', H + 'px'); $tc.css('height', H + 'px');
    } else { H = $tc.height(); }
    S2.maxT = Math.max(0, $d.outerHeight() - H);
    $c.css('min-height', mob ? window.innerHeight + 'px' : '');
    var vh = window.innerHeight, ch = $c.outerHeight();
    var top = Math.min(0, vh - ch);
    $c.css('top', top + 'px');
    $s.find('.spacing').each(function(){ this.style.setProperty('height', (S2.pre + S2.maxT + S2.post) + 'px', 'important'); });
    S2.start = $s.offset().top - top;
}
function sect2Scroll(){
    var $s = $('.index section.sect2'); if(!$s.length) return;
    var d = $(window).scrollTop() - S2.start - S2.pre;
    var t = Math.max(0, Math.min(S2.maxT, d));
    $s.find('.tab-cont>div').css('transform', 'translateY(-' + t + 'px)');
    var on2 = d >= S2.maxT * 0.45;
    var $a = $s.find('.tab-link a');
    $a.eq(0).toggleClass('on', !on2); $a.eq(1).toggleClass('on', on2);
    var wb = $(window).scrollTop() + window.innerHeight;
    $s.find('.tab-cont li').each(function(){
        var r = this.getBoundingClientRect();
        if (r.bottom <= window.innerHeight && r.top >= 0) {
            if (!$(this).hasClass('counting')) { $(this).addClass('counting'); countAction($(this)); }
        } else if (r.top > window.innerHeight) { $(this).removeClass('counting'); }
    });
}
$(function(){
    $('.sect2 .tab-link a').off('click').on('click', function(e){
        e.preventDefault(); e.stopPropagation();
        var i = $('.sect2 .tab-link a').index(this);
        $('html, body').animate({scrollTop: S2.start + S2.pre + (i ? S2.maxT : 0) + 2}, 250);
    });
    s2Layout(); sect2Scroll();
});
$(window).on('load resize', function(){ s2Layout(); sect2Scroll(); });


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

(function($){
  var home=document.querySelector('.ct.index .sect2')!==null;
  function inst(sel,opts,scope){ document.querySelectorAll(sel).forEach(function(el){ if(el.swiper) return; var r=el.closest(scope)||el.parentNode;
    var o=$.extend({},opts); o.navigation={nextEl:r.querySelector('.swiper-button-next'),prevEl:r.querySelector('.swiper-button-prev')}; var pg=r.querySelector('.swiper-pagination'); if(pg) o.pagination={el:pg,type:'progressbar'}; new Swiper(el,o); }); }
  $(function(){
    if(!home){
      if(document.querySelector('.topSwiper')) new Swiper('.topSwiper',{speed:800,pagination:{el:'.topSwiper .swiper-pagination'},navigation:{nextEl:'.topSwiper .swiper-button-next',prevEl:'.topSwiper .swiper-button-prev'}});
      inst('.sect5Swiper',{slidesPerView:'auto',spaceBetween:12,breakpoints:{576:{spaceBetween:24}}},'.sect5');
      inst('.heartSwiper',{slidesPerView:'auto',spaceBetween:12,breakpoints:{576:{spaceBetween:24}}},'.sect1');
      if(window.innerWidth<992) document.querySelectorAll('.sect3Swiper').forEach(function(el){ if(!el.swiper) new Swiper(el,{spaceBetween:20}); });
    }
    // 카테고리 필터 (nav-cate)
    document.querySelectorAll('[data-filter]').forEach(function(bar){
      var tabs=bar.querySelectorAll('[data-f]'), root=bar.closest('.board')||bar.closest('.contain');
      function pick(f){ tabs.forEach(function(t){ t.classList.toggle('on',t.dataset.f===f); });
        root.querySelectorAll('[data-cat]').forEach(function(r){ r.style.display=(f==='all'||r.dataset.cat.split(' ').indexOf(f)>-1)?'':'none'; });
        root.querySelectorAll('[data-pane]').forEach(function(p){ p.style.display=p.dataset.pane.split(' ').indexOf(f)>-1?'':'none'; }); }
      tabs.forEach(function(t){ t.addEventListener('click',function(e){ e.preventDefault(); pick(t.dataset.f); }); });
      var h=location.hash.slice(1); var has=[].some.call(tabs,function(t){return t.dataset.f===h}); pick(has?h:tabs[0].dataset.f);
    });
    // 숨겨진 탭 안 스와이퍼 갱신
    $('a[data-toggle="tab"]').on('shown.bs.tab',function(e){ var p=document.querySelector(e.target.getAttribute('href')); if(p) p.querySelectorAll('.swiper').forEach(function(s){ if(s.swiper) s.swiper.update(); }); });
    // 해시로 탭 열기 (고객지원)
    var hs=location.hash; if(hs){ var t=document.querySelector('a[data-toggle="tab"][href="'+hs+'"]'); if(t) $(t).tab('show'); }
    window.addEventListener('hashchange',function(){ var t=document.querySelector('a[data-toggle="tab"][href="'+location.hash+'"]'); if(t) $(t).tab('show'); });
    // 연혁 탭
    document.querySelectorAll('.sub-menu a[href^="#"]').forEach(function(x){ var id=x.getAttribute('href'); if(id.length<2) return; x.addEventListener('click',function(e){ var p=document.querySelector(id); if(!p||!p.classList.contains('tab-pane')) return; e.preventDefault(); history.replaceState(null,'',id); document.querySelectorAll('.tab-content>.tab-pane').forEach(function(y){ y.classList.remove('active','show'); }); p.classList.add('active','show'); document.querySelectorAll('.sub-menu a[href^="#"]').forEach(function(y){ y.classList.toggle('on',y.getAttribute('href')===id); }); var lb=document.querySelector('.submenu-dropdown .text-primary'); if(lb) lb.textContent=x.textContent; }); }); if(location.hash){ var z=document.querySelector('.sub-menu .nav a[href="'+location.hash+'"]'); if(z) z.click(); }
    document.querySelectorAll('.v3-file input').forEach(function(i){ i.addEventListener('change',function(){ var n=i.parentNode.querySelector('.v3-fname'); if(n) n.textContent=i.files.length?i.files[0].name:'선택된 파일 없음'; }); });
    document.querySelectorAll('.v3-hist').forEach(function(h){ var a=[].slice.call(h.querySelectorAll('.nav a')),it=[].slice.call(h.querySelectorAll('.cont-item')),bar=h.querySelector('.bar'); var on=document.createElement('span'); on.className='progress-on'; bar.appendChild(on); function top(){ var hd=document.querySelector('header.hd'); return (hd?hd.offsetHeight:100)+64+(h.querySelector('.history-progress').offsetHeight); } a.forEach(function(x,i){ x.addEventListener('click',function(e){ e.preventDefault(); window.scrollTo({top:it[i].getBoundingClientRect().top+scrollY-top(),behavior:'smooth'}); }); }); function upd(){ var i=0,t=top()+4; it.forEach(function(el,k){ if(el.getBoundingClientRect().top<=t) i=k; }); a.forEach(function(y,k){ y.classList.toggle('on',k===i); }); var w=h.querySelector('.history-wrap-area').getBoundingClientRect(); var r=Math.max(0,Math.min(1,(t-w.top)/Math.max(1,w.height-innerHeight/2))); on.style.width=(r*100)+'%'; } addEventListener('scroll',upd,{passive:true}); upd(); });
    // 본문 링크 해시(#) 스크롤 방지
    document.querySelectorAll('a[href="#"]').forEach(function(a){ a.addEventListener('click',function(e){ e.preventDefault(); }); });
    // 교육목표: 세로 스크롤에 따라 카드 가로 이동
    document.querySelectorAll('.v3-goal').forEach(function(s){ var l=s.querySelector('.v3-goal-list'), hd=s.querySelector('.v3-goal-head');
      function upd(){ var r=s.getBoundingClientRect(), tot=Math.max(1,s.offsetHeight-innerHeight), p=Math.min(1,Math.max(0,-r.top/tot));
        var cs=getComputedStyle(hd), m=hd.getBoundingClientRect().left+parseFloat(cs.paddingLeft), cw=hd.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight); if(innerWidth>=992){ var gp=parseFloat(getComputedStyle(l).columnGap)||24; l.style.setProperty('--gw',((cw-gp*(l.children.length-1))/l.children.length)+'px'); } else l.style.removeProperty('--gw'); var  st=innerWidth*(innerWidth<768?0.9:0.6), en=Math.min(m, innerWidth-m-(l.lastElementChild.offsetLeft+l.lastElementChild.offsetWidth));
        l.style.transform='translateX('+(st+(en-st)*p)+'px)'; }
      addEventListener('scroll',upd,{passive:true}); addEventListener('resize',upd); upd(); });
    if(window.jQuery){ jQuery(function(){ jQuery('#gnb li').off('mouseover'); jQuery('#gnb ul li a').off('focus'); }); }
    document.querySelectorAll('.v3-dsel').forEach(function(d){
      var b=d.querySelector('.v3-dsel-btn');
      b.addEventListener('click',function(e){e.stopPropagation();var o=d.classList.toggle('open');b.setAttribute('aria-expanded',o)});
      d.querySelectorAll('li').forEach(function(li){li.addEventListener('click',function(){
        d.querySelectorAll('li').forEach(function(x){x.classList.remove('on');x.setAttribute('aria-selected','false')});
        li.classList.add('on');li.setAttribute('aria-selected','true');b.querySelector('span').textContent=li.textContent;d.classList.remove('open');b.setAttribute('aria-expanded','false')})});
    });
    document.addEventListener('click',function(){document.querySelectorAll('.v3-dsel.open').forEach(function(d){d.classList.remove('open')})});
    (function(){
      var secs=[].slice.call(document.querySelectorAll('.contents>.v3-sec')).filter(function(s){return s.querySelector('.v3-lvl,.v3-gcards')});
      if(!secs.length) return;
      secs.forEach(function(s){s.classList.add('v3-join')});
      function fit(){var top=secs[0].offsetTop,h=0;secs.forEach(function(s){h+=s.offsetHeight});secs.forEach(function(s){s.style.setProperty('--jh',h+'px');s.style.setProperty('--jo',(s.offsetTop-top)+'px')})}
      fit();addEventListener('resize',fit);addEventListener('load',fit);
    })();
    if(typeof AOS!=='undefined') AOS.refresh();
    // 서브 수치 카운트업 (원본 홈 countUp 방식: 화면에 들어오면 2/3 지점부터)
    var cnt=[].slice.call(document.querySelectorAll('.v3-stats .h2, .v3-stats .v3-vk-n'));
    if(cnt.length && 'IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){ es.forEach(function(en){ if(!en.isIntersecting) return; io.unobserve(en.target);
        var el=en.target, m=el.textContent.match(/^([0-9,]+)(.*)$/); if(!m) return;
        var to=+m[1].replace(/,/g,''), from=Math.round(to*2/3), t0=null, sfx=m[2];
        (function step(ts){ t0=t0||ts; var k=Math.min((ts-t0)/1200,1), v=Math.round(from+(to-from)*(1-Math.pow(1-k,3)));
          el.textContent=v.toLocaleString('en-US')+sfx; if(k<1) requestAnimationFrame(step); })(performance.now());
      }); },{threshold:.6});
      cnt.forEach(function(c){ io.observe(c); });
    }
    $('a[data-toggle="tab"]').on('shown.bs.tab',function(){ if(typeof AOS!=='undefined') AOS.refreshHard(); });
  });
})(jQuery);

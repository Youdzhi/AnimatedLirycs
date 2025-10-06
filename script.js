(function makeSparkles(){
      const root = document.getElementById('sparkle');
      const count = 28;
      for(let i=0;i<count;i++){
        const s = document.createElement('i');
        s.style.left = Math.random()*100 + 'vw';
        s.style.setProperty('--x', Math.random()*100 + 'vw');
        s.style.animationDelay = (Math.random()*6)+'s, '+(Math.random()*2)+'s';
        const size = 4 + Math.round(Math.random()*6);
        s.style.width = size+'px'; s.style.height = size+'px';
        s.style.opacity = (0.12 + Math.random()*0.4).toFixed(2);
        root.appendChild(s);
      }
    })();

    const stage = document.getElementById('stage');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

    function stageSet(node){ stage.replaceChildren(node); }
    function stageAppend(node){ stage.appendChild(node); }
    function animateOpacity(el, from, to, duration, easing='ease', fill='forwards'){ return el.animate([{opacity:from},{opacity:to}],{duration, easing, fill}); }
    function animateScale(el, keyframes, duration, easing= 'var(--ease)'){ return el.animate(keyframes, {duration, easing}); }

    function particleBurst(xPercent, yPercent, options={}){
      if(prefersReduced) return;
      const { count=14, color='var(--light)', spread=60, life=700, size=6 } = options;
      for(let i=0;i<count;i++){
        const p = document.createElement('i');
        p.style.position='fixed'; p.style.left=xPercent+'%'; p.style.top=yPercent+'%';
        p.style.width = p.style.height = (size + Math.random()*6)+'px';
        p.style.borderRadius='50%'; p.style.background='currentColor'; p.style.color = 'white';
        p.style.boxShadow = '0 0 12px 3px rgba(139,233,253,.35)';
        document.body.appendChild(p);
        const ang = Math.random()*Math.PI*2; const dist = Math.random()*spread + 10;
        const dx = Math.cos(ang)*dist; const dy = Math.sin(ang)*dist;
        p.animate([{transform:'translate(0,0)', opacity:1, color:color},{transform:`translate(${dx}px, ${dy}px)`, opacity:0}],{duration:life + Math.random()*300, easing:'ease-out', fill:'forwards'});
        setTimeout(()=>p.remove(), life+350);
      }
    }

    async function typewriter(text, cls = 'xl', speed = 60){
      const wrap = document.createElement('div');
      wrap.className = `text ${cls} glow`;
      const tw = document.createElement('span');
      tw.className = 'typewriter';
      wrap.appendChild(tw);
      stage.replaceChildren(wrap);
      for(let i=0;i<=text.length;i++){
        tw.textContent = text.slice(0,i);
        await sleep(speed);
      }
      return wrap;
    }

    async function fadeAway(node, anim='fade-out', delay=400){
      await sleep(delay);
      node.classList.add(anim);
      await sleep(600);
    }

    function emojiSpan(e){ const s=document.createElement('span'); s.textContent=e; s.style.display='inline-block'; return s; }

    async function scene1(){
      const n = await typewriter('Выходите, бесы, мы станцуем', 'xl', 55);
      await fadeAway(n, 'fade-out', 500);
    }

    async function scene2(){
      const wrap = document.createElement('div');
      wrap.className = 'text xl jersey glow fade-in';
      wrap.style.position = 'relative';
      const emoji = emojiSpan('🕺');
      emoji.style.position = 'absolute';
      emoji.style.left = '50%';
      emoji.style.top = '50%';
      emoji.style.transform = 'translate(-50%, -50%) scale(.6)';
      emoji.style.opacity = '0';
      emoji.style.fontSize = 'clamp(64px, 12vw, 240px)';
      emoji.style.filter = 'drop-shadow(0 0 16px rgba(255,255,255,.45))';
      const word = document.createElement('span');
      word.textContent = 'jersey';
      wrap.appendChild(word); wrap.appendChild(emoji);
      stageSet(wrap);

      animateOpacity(emoji, 0, 1, 700, 'ease-in');

      const zoomAnim = emoji.animate([
        {transform:'translate(-50%, -50%) scale(.6)'},
        {transform:'translate(-50%, -50%) scale(2.2)'},
        {transform:'translate(-50%, -50%) scale(1.3)'}
      ], {duration:1100, easing:'cubic-bezier(.2,.8,.2,1)', fill:'forwards'});

      wrap.animate([{letterSpacing:'0.02em', textShadow:'0 0 0 rgba(255,255,255,0)'},{letterSpacing:'.08em', textShadow:'0 0 24px rgba(255,255,255,.35)'}],{duration:700, easing:'ease-in-out'});
      await sleep(700);
      particleBurst(50,50,{count:18, color:'var(--spark)', spread:90, life:800});
      await zoomAnim.finished.catch(()=>{});
      wrap.classList.add('fade-out');
      await sleep(650);
    }

    async function scene3(){
      const topWrap = document.createElement('div');
      topWrap.className = 'text lg glow slide-down-in';
      const hand = emojiSpan('✋');
      hand.style.marginLeft = '10px';
      const t1 = document.createElement('span'); t1.textContent = 'Отойди,';
      topWrap.appendChild(t1); topWrap.appendChild(hand);
      stageSet(topWrap);
      hand.animate([{transform:'scale(.6)'},{transform:'scale(1.15)'},{transform:'scale(1)'}],{duration:700, easing:'cubic-bezier(.2,.8,.2,1)'});
      await sleep(900);
      topWrap.classList.add('fade-out');
      await sleep(520);

      const mid = await typewriter('я войду,', 'lg', 70);
      await sleep(900);


      const small = document.createElement('div');
      small.className = 'text md glow pop-in';
      small.style.position = 'absolute';
      small.style.top = '36%';
      small.textContent = 'и она';
      stageAppend(small);

      await sleep(300);

      const big = document.createElement('div');
      big.className = 'text xl glow fade-in';
      big.textContent = 'воскреснет';
      stageSet(big);

      const crossCenter = emojiSpan('✝️');
      crossCenter.style.position = 'absolute';
      crossCenter.style.left = '50%';
      crossCenter.style.top = '50%';
      crossCenter.style.transform = 'translate(-50%, -50%) scale(.6) rotate(0deg)';
      crossCenter.style.fontSize = 'clamp(80px, 14vw, 280px)';
      crossCenter.style.filter = 'drop-shadow(0 0 16px rgba(255,255,255,.45))';
      stageAppend(crossCenter);
      const crossAnim = crossCenter.animate([
        {transform:'translate(-50%, -50%) scale(.6) rotate(0deg)'},
        {transform:'translate(-50%, -50%) scale(1.2) rotate(-12deg)'},
        {transform:'translate(-50%, -50%) scale(0.8) rotate(-6deg)'}
      ], {duration:900, easing:'cubic-bezier(.2,.8,.2,1)', fill:'forwards'});
      await sleep(700);

      particleBurst(50,50,{count:20, color:'var(--light)', spread:120, life:700});
      const bolt = document.createElement('div');
      bolt.className = 'bolt';
      bolt.style.left = 'calc(50% - 1px)';
      bolt.style.top = '50%';
      document.body.appendChild(bolt);
      await sleep(260);
      big.classList.add('fade-out');

      animateOpacity(crossCenter, 1, 0, 520, 'ease-in');
      await sleep(520);
      bolt.remove();
      crossCenter.remove();
    }

    async function scene4(){

      const wrap = document.createElement('div');
      wrap.className = 'text lg glow fade-in';
      wrap.textContent = 'Пристегнись';
      stageSet(wrap);

      const carsLayer = document.createElement('div');
      carsLayer.style.position='fixed'; carsLayer.style.inset='0'; carsLayer.style.pointerEvents='none';
      document.body.appendChild(carsLayer);
      const makeRow = (emoji, topPercent)=>{
        const r = document.createElement('div');
        r.style.position='absolute'; r.style.left='-20vw'; r.style.right='-20vw'; r.style.top= topPercent + '%';
        r.style.fontSize='28px'; r.style.opacity='.65'; r.style.letterSpacing='10px';
        r.textContent = (emoji+' ').repeat(30);
        carsLayer.appendChild(r);
        r.animate([{transform:'translateX(-20vw)'},{transform:'translateX(120vw)'}],{duration:3000+Math.random()*1200,easing:'ease-in-out'});
        return r;
      }
      const cTop = makeRow('🚗', 38);
      const cBot = makeRow('🚙', 62);
      await sleep(1200);

      [cTop,cBot].forEach(el=>{ el.textContent = ('👁️ ').repeat(30); el.style.filter='drop-shadow(0 0 16px rgba(139,233,253,.6))'; });

      wrap.textContent = 'и смотри';
      particleBurst(50,50,{count:14, color:'var(--light)', spread:80, life:600});

      for(let i=0;i<3;i++){
        const b=document.createElement('div'); b.className='bolt'; b.style.left=Math.random()*100+'vw'; b.style.top=(30+Math.random()*40)+'%'; document.body.appendChild(b); setTimeout(()=>b.remove(),400)
      }
      await sleep(900);
      wrap.classList.add('zoom-out');
      await sleep(520);
      carsLayer.remove();
    }

    async function scene5(){

      const n = await typewriter('как тебе, Олеся?', 'lg', 65);
      const tw = n.querySelector('.typewriter');
      await sleep(700);
      for(let i=tw.textContent.length; i>=0; i--){ tw.textContent = tw.textContent.slice(0,i); await sleep(35); }
      n.classList.add('fade-out');
      await sleep(420);
    }

    async function scene6(){

      const peachWrap = document.createElement('div'); peachWrap.className='text xl glow';
      const peach = emojiSpan('🍑'); peachWrap.appendChild(peach); stage.replaceChildren(peachWrap);
      peach.classList.add('zoom-in'); await sleep(650); peach.classList.add('zoom-out'); await sleep(540);

      const words = 'каждой из моих подруг в AMG обвесе'.split(' ');
      const line = document.createElement('div'); line.className='text md glow'; stage.replaceChildren(line);
      for(const w of words){
        const span = document.createElement('span'); span.textContent = w; span.style.display='inline-block'; span.style.margin='0 6px';
        span.classList.add('fade-in'); line.replaceChildren(span); await sleep(260);
        span.classList.add('fade-out'); await sleep(180);
      }
    }

    async function scene7(){
      const wrap = document.createElement('div');
      wrap.className = 'text lg glow fade-in';
      const pre = document.createElement('span'); pre.textContent = 'тгк ';
      const link = document.createElement('a'); link.href='https://t.me/ydz_ofc'; link.textContent='t.me/ydz_ofc'; link.style.color='var(--ok)'; link.style.textDecoration='none'; link.target='_blank';
      wrap.appendChild(pre); wrap.appendChild(link);
      stage.replaceChildren(wrap);
      wrap.animate([{transform:'scale(.9)', letterSpacing:'.0em'},{transform:'scale(1)', letterSpacing:'.05em'}],{duration:700, easing:'ease-in-out'});
    }

    async function run(){
      await scene1();
      await scene2();
      await scene3();
      await scene4();
      await scene5();
      await scene6();
      await scene7();
    }

    run();
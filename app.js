const views=[...document.querySelectorAll('.screen')];
const icons={breathe:'<circle cx="12" cy="12" r="8"/>',sleep:'<path d="M3 12c4-5 14-5 18 0M5 17c3-3 11-3 14 0"/>',journey:'<path d="M4 19l5-5 4 4 7-7"/>',journal:'<circle cx="12" cy="8" r="3.5"/><path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5"/>'};
const labels={breathe:'Breathe',sleep:'Sleep',journey:'Journey',journal:'You'};
function go(name){views.forEach(v=>v.classList.toggle('active',v.dataset.view===name));document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.go===name));location.hash=name==='breathe'?'':name;window.scrollTo(0,0)}
document.querySelectorAll('.tabs').forEach(nav=>{nav.innerHTML=Object.keys(labels).map(k=>`<button class="tab" data-go="${k}"><svg viewBox="0 0 24 24">${icons[k]}</svg>${labels[k]}</button>`).join('')});
document.addEventListener('click',e=>{const goButton=e.target.closest('[data-go]');if(goButton)go(goButton.dataset.go)});
const initial=location.hash.slice(1);go(views.some(v=>v.dataset.view===initial)?initial:'breathe');
window.addEventListener('hashchange',()=>{const next=location.hash.slice(1)||'breathe';if(views.some(v=>v.dataset.view===next))go(next)});

let breathing=true,seconds=168;
const breathToggle=document.querySelector('#breathToggle'),phase=document.querySelector('#breathPhase'),count=document.querySelector('#breathCount'),elapsed=document.querySelector('#elapsed');
breathToggle.addEventListener('click',()=>{breathing=!breathing;breathToggle.classList.toggle('paused',!breathing);breathToggle.setAttribute('aria-pressed',breathing);breathToggle.setAttribute('aria-label',breathing?'Pause breathing session':'Resume breathing session');phase.textContent=breathing?'Inhale':'Paused';count.textContent=breathing?'four':'breathe'});
setInterval(()=>{if(!breathing)return;seconds++;elapsed.textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;const cycle=seconds%12;phase.textContent=cycle<6?'Inhale':'Exhale';count.textContent=['four','three','two','one'][Math.min(3,Math.floor((cycle%6)/1.5))]},1000);

let playing=null;
document.querySelectorAll('.play').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.audio;const same=playing===id;document.querySelectorAll('.play').forEach(b=>b.classList.remove('playing'));playing=same?null:id;if(playing)button.classList.add('playing');const state=document.querySelector('#storyState');if(state)state.textContent=playing===id?'Playing softly · tap to pause':id==='forest'?'Tap to begin · auto-stops at sleep':state.textContent}));

const sessions=new Set([1,3,5,6,8,9,10,11,14,15,16,17,18,20,21]),reflections=new Set([2,7,13]),missed=new Set([4,12,19]);
const calendar=document.querySelector('#calendarDays');for(let i=0;i<6;i++)calendar.append(document.createElement('span'));for(let day=1;day<=30;day++){const el=document.createElement('button');el.className='day';el.textContent=day;el.setAttribute('aria-label',`June ${day}`);if(sessions.has(day))el.classList.add('session');else if(reflections.has(day))el.classList.add('reflection');else if(missed.has(day))el.classList.add('missed');else if(day===22)el.classList.add('today-day');else el.classList.add('future');el.addEventListener('click',()=>el.classList.toggle('reflection'));calendar.append(el)}

const mood=document.querySelector('#mood'),moodWord=document.querySelector('#moodWord');mood.addEventListener('input',()=>{const v=+mood.value;moodWord.textContent=v<25?'heavy':v<50?'tender':v<75?'brighter':'light'});
document.querySelector('#tags').addEventListener('click',e=>{if(e.target.tagName!=='BUTTON')return;if(e.target.id==='addTag'){const value=prompt('Name this feeling');if(value){const b=document.createElement('button');b.textContent=value;b.className='selected';e.target.before(b)}}else e.target.classList.toggle('selected')});
document.querySelector('#saveJournal').addEventListener('click',()=>{const entry=document.querySelector('#journalText').value.trim();if(entry)localStorage.setItem('breatheJournal',entry);const saved=document.querySelector('#saved');saved.textContent=entry?'Reflection tucked away.':'Write a sentence first.';setTimeout(()=>saved.textContent='',2500)});
const savedEntry=localStorage.getItem('breatheJournal');if(savedEntry)document.querySelector('#journalText').value=savedEntry;
'use strict';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
document.documentElement.classList.add('js');

const menuButton = $('.menu-button');
const navigation = $('.header nav');
navigation.id = 'main-navigation';
menuButton.setAttribute('aria-controls', navigation.id);
const contactLink = $('.contact-link');
const mobileMenu = matchMedia('(max-width: 760px)');
function positionContact() {
  if (mobileMenu.matches) navigation.append(contactLink);
  else menuButton.before(contactLink);
}
positionContact();
mobileMenu.addEventListener('change', positionContact);
function setMenu(open) {
  navigation.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
matchMedia('(max-width: 760px)').addEventListener('change', () => setMenu(false));
let paused = reducedMotion.matches;
let toastTimer;
function toast(message) {
  $('.toast').textContent = message;
  $('.toast').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('.toast').classList.remove('show'), 3500);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
$$('.reveal').forEach(element => observer.observe(element));

const progress = $('.scroll-progress');
let scrollPending = false;
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  scrollPending = false;
}
addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateProgress); } }, { passive: true });
updateProgress();

$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
  $$('[data-filter]').forEach(item => { item.classList.toggle('active', item === button); item.setAttribute('aria-pressed', String(item === button)); });
  $$('.project-card').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) card.classList.add('visible');
  });
  updateProgress();
}));

const projects = {
  orbit: { name: 'Orbit Audio', subtitle: 'O som também tem uma identidade.', text: 'Um conceito de e-commerce para áudio premium. Verde orgânico, tipografia expressiva e um produto no centro da experiência. A direção visual traduz a sensação de imersão em uma interface clara e envolvente.', tags: ['E-commerce', 'Direção de arte', 'Interface responsiva'], background: '#dce4d6', color: '#12352d', logo: 'orbit®', intention: 'O desafio criativo: fazer o visitante sentir o produto antes mesmo de ouvir a primeira nota.' },
  pulse: { name: 'Pulse Finance', subtitle: 'Finanças com uma nova energia.', text: 'Uma exploração de interface para um produto financeiro mais humano. O contraste entre lavanda e verde ácido dá personalidade à marca, enquanto a hierarquia visual mantém as informações fáceis de encontrar.', tags: ['Produto digital', 'Design de interface', 'Identidade visual'], background: '#aa8bea', color: '#25173f', logo: 'pulse.', intention: 'O desafio criativo: aproximar um assunto complexo por meio de uma experiência leve e intuitiva.' },
  forma: { name: 'Forma Studio', subtitle: 'Onde o espaço encontra a sensação.', text: 'Um conceito editorial para um estúdio de arquitetura. A composição trabalha luz, materialidade e respiro. Formas construídas com CSS criam uma cena arquitetônica sem depender de fotografias ou bibliotecas pesadas.', tags: ['Website editorial', 'Arquitetura', 'Arte com CSS'], background: '#ddd5c6', color: '#3b3529', logo: 'forma®', intention: 'O desafio criativo: usar o ritmo da página para comunicar a mesma calma de um espaço bem projetado.' }
};
$$('[data-project]').forEach(card => card.addEventListener('click', () => {
  const project = projects[card.dataset.project];
  const content = $('#project-detail');
  content.replaceChildren();
  const eyebrow = document.createElement('span'); eyebrow.className = 'eyebrow muted'; eyebrow.textContent = 'EXPLORAÇÃO AUTORAL · 2026';
  const title = document.createElement('h2'); title.textContent = project.name;
  const visual = document.createElement('div'); visual.className = 'detail-visual'; visual.style.background = project.background; visual.style.color = project.color; visual.textContent = project.logo;
  const subtitle = document.createElement('h3'); subtitle.textContent = project.subtitle;
  const description = document.createElement('p'); description.textContent = project.text; description.style.marginTop = '14px';
  const tags = document.createElement('div'); tags.className = 'detail-tags'; project.tags.forEach(tag => { const span = document.createElement('span'); span.textContent = tag; tags.append(span); });
  const intention = document.createElement('p'); intention.textContent = project.intention;
  const note = document.createElement('p'); note.className = 'detail-note'; note.style.marginTop = '24px'; note.textContent = 'Projeto conceitual criado para demonstrar possibilidades de design. Não representa um cliente ou produto comercial lançado.';
  content.append(eyebrow, title, visual, subtitle, description, tags, intention, note);
  $('#project-dialog').showModal();
}));

$$('dialog').forEach(dialog => {
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
  new MutationObserver(() => { if (dialog.open) document.body.style.overflow = 'hidden'; }).observe(dialog, { attributes: true, attributeFilter: ['open'] });
});
$('#year').textContent = new Date().getFullYear();

if (matchMedia('(pointer: fine)').matches) $$('.magnetic').forEach(element => {
  element.addEventListener('pointermove', event => {
    if (paused) return;
    const box = element.getBoundingClientRect();
    element.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .12}px, ${(event.clientY - box.top - box.height / 2) * .16}px)`;
  });
  element.addEventListener('pointerleave', () => { element.style.transform = ''; });
});

// Write an idea into code, then bring the corresponding interface to life.
const scene = $('.dev-scene');
const codeLines = $$('.dev-line code');
const lineLengths = codeLines.map(line => line.textContent.length);
const preview = $('.dev-preview');
const buildStatus = $('.dev-build-status');
let typingTimer = 0;
let lineIndex = 0;
let characterIndex = 0;
let holdUntil = 0;
let sceneVisible = true;
let built = true;

function showFinishedScene() {
  codeLines.forEach(line => { line.style.removeProperty('--typed'); line.classList.remove('is-typing'); });
  preview.classList.add('is-built');
  scene.classList.remove('is-building');
  buildStatus.textContent = 'Build concluído.';
  built = true;
}
function beginBuild() {
  lineIndex = 0;
  characterIndex = 0;
  built = false;
  preview.classList.remove('is-built');
  scene.classList.add('is-building');
  codeLines.forEach(line => { line.style.setProperty('--typed', '0'); line.classList.remove('is-typing'); });
  buildStatus.textContent = 'Transformando ideia em código…';
}
function typeNext() {
  typingTimer = 0;
  if (paused || !sceneVisible || document.hidden) return;
  if (built) {
    if (Date.now() >= holdUntil) beginBuild();
  } else {
    const line = codeLines[lineIndex];
    line.classList.add('is-typing');
    characterIndex++;
    line.style.setProperty('--typed', String(characterIndex));
    if (characterIndex >= lineLengths[lineIndex]) {
      line.classList.remove('is-typing');
      lineIndex++;
      characterIndex = 0;
      if (lineIndex === 3) buildStatus.textContent = 'Cuidando de cada detalhe…';
      if (lineIndex >= codeLines.length) { showFinishedScene(); holdUntil = Date.now() + 5200; }
    }
  }
  typingTimer = setTimeout(typeNext, built ? 160 : 36);
}
function resumeTyping() {
  if (!typingTimer && !paused && sceneVisible && !document.hidden) typingTimer = setTimeout(typeNext, 80);
}
function setMotion(value) {
  paused = value;
  document.body.classList.toggle('paused', paused);
  const button = $('.motion-button');
  button.setAttribute('aria-pressed', String(paused));
  button.setAttribute('aria-label', paused ? 'Retomar animações' : 'Pausar animações');
  button.firstElementChild.textContent = paused ? '▷' : 'Ⅱ';
  clearTimeout(typingTimer);
  typingTimer = 0;
  if (paused && reducedMotion.matches) showFinishedScene();
  if (!paused) resumeTyping();
}
new IntersectionObserver(entries => {
  sceneVisible = entries[0].isIntersecting;
  if (!sceneVisible) { clearTimeout(typingTimer); typingTimer = 0; }
  else resumeTyping();
}).observe(scene);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { clearTimeout(typingTimer); typingTimer = 0; }
  else resumeTyping();
});
if (matchMedia('(pointer: fine)').matches) {
  scene.addEventListener('pointermove', event => {
    if (paused) return;
    const box = scene.getBoundingClientRect();
    scene.style.setProperty('--tilt-x', `${((event.clientY - box.top) / box.height - .5) * -5}deg`);
    scene.style.setProperty('--tilt-y', `${((event.clientX - box.left) / box.width - .5) * 7}deg`);
  });
  scene.addEventListener('pointerleave', () => { scene.style.removeProperty('--tilt-x'); scene.style.removeProperty('--tilt-y'); });
}
$('.motion-button').addEventListener('click', () => setMotion(!paused));
reducedMotion.addEventListener('change', event => setMotion(event.matches));
holdUntil = Date.now() + 1400;
setMotion(paused);

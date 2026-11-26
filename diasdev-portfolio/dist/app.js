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


const projects = {
  shai: { siteUrl: 'https://shai-diasdev.vercel.app', githubUrl: 'https://github.com/dias-dev24/shai', name: 'Shai Camisetas', subtitle: 'Sua marca em movimento.', text: 'Site de camisetas e uniformes personalizados, com catálogo interativo, opções de malhas e orçamento pelo WhatsApp.', tags: ['HTML, CSS e JavaScript', 'Design responsivo', 'Catálogo filtrável', 'Orçamento pelo WhatsApp'], background: '#edeafb', color: '#38358b', image: 'assets/shai-camisetas.jpeg', imageAlt: 'Página inicial do site Shai Camisetas', intention: 'O objetivo: apresentar as possibilidades de personalização e facilitar o contato de empresas, equipes, escolas e eventos com a Shai.', label: 'PROJETO REAL · 2026', note: 'Projeto desenvolvido para a Shai Camisetas, com fotografias reais dos produtos e experiência adaptada para celular e desktop.' },
  bravo: { siteUrl: 'https://bravo-barbearia-chi.vercel.app', githubUrl: 'https://github.com/dias-dev24/barbearia', name: 'Bravo Barbearia', subtitle: 'Seu estilo. Sua assinatura.', text: 'Site de barbearia com visual elegante e agendamento online. O visitante escolhe o serviço, o profissional e o melhor horário em poucos passos.', tags: ['Next.js · React', 'Design responsivo', 'Agendamento online'], background: '#1c211c', color: '#c99a65', image: 'assets/bravo-barbearia.png', imageAlt: 'Página inicial do site Bravo Barbearia', intention: 'O objetivo: valorizar a marca e facilitar a reserva de horários.', label: 'PROJETO DE PORTFÓLIO · 2026', note: 'Projeto demonstrativo com marca e reservas fictícias.' },
  forma: { name: 'Forma Studio', subtitle: 'Onde o espaço encontra a sensação.', text: 'Um conceito editorial para um estúdio de arquitetura. A composição trabalha luz, materialidade e respiro. Formas construídas com CSS criam uma cena arquitetônica sem depender de fotografias ou bibliotecas pesadas.', tags: ['Website editorial', 'Arquitetura', 'Arte com CSS'], background: '#ddd5c6', color: '#3b3529', logo: 'forma®', intention: 'O desafio criativo: usar o ritmo da página para comunicar a mesma calma de um espaço bem projetado.' }
};
$$('.project-details, button[data-project]').forEach(button => button.addEventListener('click', () => {
  const project = projects[button.closest('[data-project]').dataset.project];
  const content = $('#project-detail');
  content.dataset.project = button.closest('[data-project]').dataset.project;
  content.replaceChildren();
  const eyebrow = document.createElement('span'); eyebrow.className = 'eyebrow muted'; eyebrow.textContent = project.label || 'EXPLORAÇÃO AUTORAL · 2026';
  const title = document.createElement('h2'); title.textContent = project.name;
  const visual = document.createElement('div'); visual.className = 'detail-visual'; visual.style.background = project.background; visual.style.color = project.color; if (project.image) {
    visual.classList.add('detail-visual-image');
    const image = document.createElement('img'); image.src = project.image; image.alt = project.imageAlt;
    image.width = 1600; image.height = 845;
    visual.append(image);
  } else { visual.textContent = project.logo; }
  const subtitle = document.createElement('h3'); subtitle.className = 'detail-subtitle'; subtitle.textContent = project.subtitle;
  const description = document.createElement('p'); description.className = 'detail-description'; description.textContent = project.text;
  const tags = document.createElement('div'); tags.className = 'detail-tags'; project.tags.forEach(tag => { const span = document.createElement('span'); span.textContent = tag; tags.append(span); });
  const highlights = document.createElement('section'); highlights.className = 'detail-highlights';
  const highlightsTitle = document.createElement('h4'); highlightsTitle.textContent = 'Destaques';
  highlights.append(highlightsTitle, tags);
  const objective = document.createElement('section'); objective.className = 'detail-objective';
  const objectiveTitle = document.createElement('h4'); objectiveTitle.textContent = 'Objetivo';
  const intention = document.createElement('p'); intention.textContent = project.intention.replace(/^O objetivo:\s*/, '');
  objective.append(objectiveTitle, intention);
  const note = document.createElement('p'); note.className = 'detail-note'; note.style.marginTop = '24px'; note.textContent = project.note || 'Projeto conceitual criado para demonstrar possibilidades de design. Não representa um cliente ou produto comercial lançado.';
  if (!project.siteUrl) content.append(eyebrow);
  content.append(title, visual, subtitle, description, highlights, objective);
  if (!project.siteUrl) content.append(note);
  if (project.siteUrl && project.githubUrl) {
    const actions = document.createElement('div'); actions.className = 'project-actions';
    [[project.siteUrl, 'Acessar site'], [project.githubUrl, 'Ver no GitHub']].forEach(([url, label], index) => {
      const link = document.createElement('a');
      link.className = index === 0 ? 'button primary' : 'button project-github';
      link.href = url; link.textContent = label;
      link.target = '_blank'; link.rel = 'noopener noreferrer';
      actions.append(link);
    });
    subtitle.before(actions);
  }
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

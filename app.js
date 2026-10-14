/**
 * LitBites - Lógica de carregamento e sorteio aleatório sem repetições
 */

let resumosList = [];     // Lista original completa vinda do resumos.json
let embaralhados = [];    // Fila de exibição atual (deck)
let ultimoResumoId = null;

const summaryText = document.getElementById('summary-text');
const summaryMeta = document.getElementById('summary-meta');
const btnNext = document.getElementById('btn-next');
const btnCopy = document.getElementById('btn-copy');
const toast = document.getElementById('toast');

// --- Algoritmo de Embaralhamento (Fisher-Yates) ---
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// --- Carregamento dos Resumos do resumos.json ---
async function loadResumos() {
  try {
    const response = await fetch('resumos.json');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    resumosList = await response.json();
    
    if (resumosList.length > 0) {
      // Cria a primeira pilha embaralhada
      embaralhados = shuffle(resumosList);
      getRandomSummary();
    } else {
      summaryText.textContent = "Nenhum resumo encontrado no arquivo.";
    }
  } catch (error) {
    console.error('Erro ao carregar os microresumos:', error);
    summaryText.textContent = "Erro ao carregar os microresumos. Verifique o arquivo resumos.json ou execute via servidor local.";
  }
}

// --- Exibir Próximo Resumo Sem Repetição ---
function getRandomSummary() {
  if (resumosList.length === 0) return;

  // Se a pilha de resumos não vistos acabou, recarrega e embaralha novamente
  if (embaralhados.length === 0) {
    embaralhados = shuffle(resumosList);
    
    // Garante que o primeiro da nova rodada não seja idêntico ao último exibido
    if (embaralhados.length > 1 && embaralhados[embaralhados.length - 1].id === ultimoResumoId) {
      const itemAtropelado = embaralhados.pop();
      embaralhados.unshift(itemAtropelado);
    }
    showToast("Todos os resumos foram exibidos! Reiniciando ciclo.");
  }

  // Tira o último item da pilha
  const item = embaralhados.pop();
  ultimoResumoId = item.id;

  // 1. Título e Autor no topo
  summaryMeta.textContent = `${item.titulo} — ${item.autor}`;
  // 2. Resumo sem aspas na parte de baixo
  summaryText.textContent = item.resumo;
}

// --- Copiar Resumo Atual ---
async function copySummary() {
  if (!summaryMeta.textContent || !summaryText.textContent) return;
  const textToCopy = `${summaryMeta.textContent}\n\n${summaryText.textContent}`;
  
  try {
    await navigator.clipboard.writeText(textToCopy);
    showToast("Resumo copiado para a área de transferência!");
  } catch (err) {
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast("Resumo copiado!");
  }
}

// --- Alternância de Tema ---
function initTheme() {
  const savedTheme = localStorage.getItem('litbites-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('litbites-theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const btnThemeToggle = document.getElementById('theme-toggle');
  if (btnThemeToggle) {
    const iconSpan = btnThemeToggle.querySelector('.icon-theme');
    if (iconSpan) {
      iconSpan.textContent = theme === 'light' ? '☀️' : '🌙';
    }
  }
}

// --- Toast Feedback ---
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2500);
}

// --- Event Listeners ---
btnNext.addEventListener('click', getRandomSummary);
btnCopy.addEventListener('click', copySummary);

const btnThemeToggle = document.getElementById('theme-toggle');
if (btnThemeToggle) {
  btnThemeToggle.addEventListener('click', toggleTheme);
}

// --- Inicialização ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadResumos();
});

// --- Registro do Service Worker ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .catch(err => console.error('Falha ao registrar SW:', err));
  });
}

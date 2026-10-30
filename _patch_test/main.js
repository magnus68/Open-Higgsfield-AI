import './style.css';
import { Header } from './components/Header.js';
import { ImageStudio } from './components/ImageStudio.js';
import { BackendModal } from './components/BackendModal.js';

const app = document.querySelector('#app');
let contentArea;
let booted = false;

// Router
function navigate(page) {
  if (!contentArea) return;
  contentArea.innerHTML = '';

  if (page === 'image') {
    contentArea.appendChild(ImageStudio());
  } else if (page === 'video') {
    import('./components/VideoStudio.js').then(({ VideoStudio }) => {
      contentArea.appendChild(VideoStudio());
    });
  } else if (page === 'library') {
    import('./components/LibraryPage.js').then(({ LibraryPage }) => {
      contentArea.appendChild(LibraryPage());
    });
  } else if (page === 'cinema') {
    import('./components/CinemaStudio.js').then(({ CinemaStudio }) => {
      contentArea.appendChild(CinemaStudio());
    });
  } else if (page === 'lipsync') {
    import('./components/LipSyncStudio.js').then(({ LipSyncStudio }) => {
      contentArea.appendChild(LipSyncStudio());
    });
  }
}

// Event Listener for Navigation
window.addEventListener('navigate', (e) => {
  navigate(e.detail.page);
});

// --- VERSIONE DI PROVA (Puntoweb) -------------------------------------
// Rimossa la schermata di accesso "content-factory": l'app parla solo con
// kie.ai usando la chiave API personale salvata nel browser.
try { localStorage.removeItem('cf_backend'); } catch {}

function bootApp() {
  if (booted) return;
  booted = true;

  app.innerHTML = '';
  // Pass navigate to Header so links work
  app.appendChild(Header(navigate));

  contentArea = document.createElement('main');
  contentArea.id = 'content-area';
  contentArea.className = 'flex-1 relative w-full overflow-hidden flex flex-col bg-app-bg';
  app.appendChild(contentArea);

  // Initial Route
  navigate('image');
}

bootApp();

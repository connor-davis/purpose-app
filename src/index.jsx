import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Router } from 'solid-app-router';
import { registerSW } from 'virtual:pwa-register';

let Routed = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

render(Routed, document.getElementById('root'));

const updateSW = registerSW({
  onNeedRefresh() {},
  onOfflineReady() {},
});

if (typeof window !== 'undefined') {
  import('./sw');
}

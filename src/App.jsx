import { HopeProvider, NotificationsProvider } from '@hope-ui/solid';
import PurposeApp from './PurposeApp';
import config from './config';

function App() {
  return (
    <HopeProvider config={config}>
      <NotificationsProvider placement={'top-end'}>
        <PurposeApp />
      </NotificationsProvider>
    </HopeProvider>
  );
}

export default App;

import { HopeProvider } from '@hope-ui/solid';
import PurposeApp from './PurposeApp';

const config = {
  initialColorMode: 'dark',
  lightTheme: {
    colors: {
      lime4: '#a3e635',
    },
  },
  darkTheme: {
    colors: {
      lime4: '#a3e635',
    },
  },
};

function App() {
  return (
    <HopeProvider config={config}>
      <PurposeApp />
    </HopeProvider>
  );
}

export default App;

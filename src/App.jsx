import {HopeProvider} from '@hope-ui/solid';
import PurposeApp from './PurposeApp';

const config = {
    initialColorMode: 'dark', lightTheme: {
        colors: {
            lime4: '#a3e635',
        },
    }, darkTheme: {
        colors: {
            lime4: '#a3e635', limeAlpha4: 'rgba(163,230,53,0.5)', red5: '#ef4444', redAlpha5: 'rgba(239,68,68,0.5)'
        },
    },
};

function App() {
    return (<HopeProvider config={config}>
        <PurposeApp/>
    </HopeProvider>);
}

export default App;

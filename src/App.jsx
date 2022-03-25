import { Route, Routes } from 'solid-app-router';
import NoType from './components/NoType';
import AuthenticationGuard from './guards/authenticationGuard';
import useState from './hooks/state';
import DashboardPage from './pages/dashboard/dashboardPage';
import RootPage from './pages/root/rootPage';
import SetupCompanyProfilePage from './pages/setup/setupCompanyProfilePage';
import SetupIndividualProfilePage from './pages/setup/setupIndividualProfilePage';

function App() {
  let [themeState, toggle] = useState('theme');
  let [userState, updateUserState] = useState('userState');
  // let navigate = useNavigate();

  return (
    <div class={themeState.theme}>
      <div class="w-screen h-screen bg-white dark:bg-gray-900 overflow-hidden select-none">
        <AuthenticationGuard>
          {userState.userType === 'individual' && (
            <RootPage>
              <Routes>
                <Route path="/" exact element={<DashboardPage />} />
              </Routes>
            </RootPage>
          )}

          {!userState.userType && (
            <Routes>
              <Route path="/" exact element={<NoType />} />

              <Route
                path="/setupCompanyProfile"
                element={<SetupCompanyProfilePage />}
              />

              <Route
                path="/setupIndividualProfile"
                element={<SetupIndividualProfilePage />}
              />
            </Routes>
          )}
        </AuthenticationGuard>
      </div>
    </div>
  );
}

export default App;

import { Route, Routes } from 'solid-app-router';
import { onMount } from 'solid-js';
import NoType from './components/NoType';
import AuthenticationGuard from './guards/authenticationGuard';
import useState from './hooks/state';
import DashboardPage from './pages/dashboard/dashboardPage';
import RootPage from './pages/root/rootPage';
import SetupProfilePage from './pages/setup/setupProfilePage';

function App() {
  let [themeState, toggle] = useState('theme');
  let [userState, updateUserState] = useState('userState');
  // let navigate = useNavigate();

  setTimeout(() => {
    switch (userState.type) {
      case 'admin':
        document.title = document.title + ' | Admin';
        break;

      default:
        if (userState.displayName) {
          document.title = `Purpose | ${userState.displayName}`;
          break;
        }

        document.title = 'Purpose | Welcome';
        break;
    }

    console.log(showSetupProfileRequest());
  }, 100);

  let showSetupProfileRequest = () => {
    let requiredFields = [
      'firstName',
      'lastName',
      'idNumber',
      'age',
      'gender',
      'ethnicity',
      'streetAddress',
      'suburb',
      'ward',
      'city',
      'areaCode',
      'province',
      'country',
      'type',
      'displayName',
      'bankAccountNumber',
      'bankName',
      'bankBranch',
      // 'photo',
    ];

    let weight = requiredFields
      .map((field) => {
        if (userState[field] === undefined) return true;
      })
      .filter((field) => field);

    if (weight.length > 1) return true;
    else return false;
  };

  return (
    <div class={themeState.theme}>
      <div class="w-screen h-screen bg-white dark:bg-gray-900 overflow-hidden select-none">
        <AuthenticationGuard>
          {showSetupProfileRequest() && (
            <Routes>
              <Route path="/" exact element={<NoType />} />

              <Route path="/setupProfile" element={<SetupProfilePage />} />
            </Routes>
          )}

          {userState.type !== 'admin' && (
            <RootPage>
              <Routes>
                <Route path="/" exact element={<DashboardPage />} />
              </Routes>
            </RootPage>
          )}
        </AuthenticationGuard>
      </div>
    </div>
  );
}

export default App;

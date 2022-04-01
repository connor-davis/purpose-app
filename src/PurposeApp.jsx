import { Route, Routes } from 'solid-app-router';

import AuthenticationGuard from './guards/authenticationGuard';
import DashboardPage from './pages/dashboard/dashboardPage';
import NoType from './components/NoType';
import RootPage from './pages/root/rootPage';
import SetupProfilePage from './pages/setup/setupProfilePage';
import useState from './hooks/state';

let PurposeApp = () => {
  let [userState, updateUserState] = useState('userState');

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
      'city',
      'areaCode',
      'province',
      'country',
      'type',
      'displayName',
      'accountNumber',
      'bankName',
      'bankBranch',
      // 'photo',
    ];

    let weight = requiredFields
      .map((field) => {
        if (userState[field] === undefined) return field;
      })
      .filter((field) => field);

    console.log(weight);

    if (weight.length > 1) return true;
    else return false;
  };

  return (
    <AuthenticationGuard>
      {showSetupProfileRequest() && (
        <Routes>
          <Route path="/" exact element={<NoType />} />

          <Route path="/setupProfile" element={<SetupProfilePage />} />
        </Routes>
      )}

      {!showSetupProfileRequest() && (
        <>
          {userState.type !== 'admin' && (
            <RootPage>
              <Routes>
                <Route path="/" exact element={<DashboardPage />} />
              </Routes>
            </RootPage>
          )}
        </>
      )}
    </AuthenticationGuard>
  );
};

export default PurposeApp;

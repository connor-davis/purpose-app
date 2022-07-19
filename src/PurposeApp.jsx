import { Route, Routes } from 'solid-app-router';

import AdminDashboardPage from './adminPages/adminDashboard/adminDashboardPage';
import AdminDocumentsPage from './adminPages/adminDocuments/adminDocumentsPage';
import AdminFoldersPage from './adminPages/adminDocuments/adminFoldersPage';
import AdminRootPage from './adminPages/adminRoot/adminRootPage';
import AdminUserPage from './adminPages/adminUsers/adminUserPage';
import AdminUsersPage from './adminPages/adminUsers/adminUsersPage';
import NoType from './components/NoType';
import AuthenticationGuard from './guards/authenticationGuard';
import useState from './hooks/state';
import DashboardPage from './pages/dashboard/dashboardPage';
import ProductsPage from './pages/products/productsPage';
import ProfilePage from './pages/profile/profilePage';
import RootPage from './pages/root/rootPage';
import SalesPage from './pages/sales/salesPage';
import SetupProfilePage from './pages/setup/setupProfilePage';

import io from 'socket.io-client';
import AdminArchivePage from './adminPages/adminArchive/adminArchivePage';
import AdminEditUserPage from './adminPages/adminUsers/adminEditUserPage';
import apiUrl from './apiUrl';
import EcdArchivePage from './ecdPages/ecdArchive/ecdArchivePage';
import EcdDashboardPage from './ecdPages/ecdDashboard/ecdDashboardPage';
import EcdDocumentsPage from './ecdPages/ecdDocuments/ecdDocumentsPage';
import EcdProfilePage from './ecdPages/ecdProfile/ecdProfilePage';
import EcdRootPage from './ecdPages/ecdRoot/ecdRootPage';
import EcdSalesPage from './ecdPages/ecdSales/ecdSalesPage';
import ArchivePage from './pages/archive/archivePage';
import DocumentsPage from './pages/documents/documentsPage';
import EcdProducePage from './ecdPages/ecdProduce/ecdProducePage';

let socket = io(apiUrl);

window.socket = socket;

let PurposeApp = () => {
  let [userState, updateUserState] = useState('userState');

  setTimeout(() => {
    if (document.title === 'Purpose') {
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
    }
  }, 300);

  let showSetupProfileRequest = () => {
    if (userState.type === 'admin') return false;

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
      'positionAtECD',
      'numberOfChildren',
      'displayName',
      'accountNumber',
      'bankName',
      'bankBranch'
    ];

    let weight = requiredFields
      .map((field) => {
        if (userState[field] === undefined) return field;
      })
      .filter((field) => field);

    if (weight.length > 2) return true;
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
          {userState.type !== 'admin' && userState.type !== 'earlyChildhoodDevelopmentCenter' && (
            <Routes>
              <Route path="/" element={<RootPage />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/archive" element={<ArchivePage />} />
              </Route>
            </Routes>
          )}

          {userState.type === "earlyChildhoodDevelopmentCenter" && (
            <Routes>
              <Route path="/" element={<EcdRootPage />}>
                <Route path="/" element={<EcdDashboardPage />} />
                <Route path="/produce" element={<EcdProducePage />} />
                <Route path="/sales" element={<EcdSalesPage />} />
                <Route path="/documents" element={<EcdDocumentsPage />} />
                <Route path="/archive" element={<EcdArchivePage />} />
                <Route path="/profile" element={<EcdProfilePage />} />
              </Route>
            </Routes>
          )}

          {userState.type === 'admin' && (
            <Routes>
              <Route path="/" element={<AdminRootPage />}>
                <Route path="/" element={<AdminDashboardPage />} />
                <Route path="/users" element={<AdminUsersPage />} />
                <Route path="/users/:id" element={<AdminUserPage />} />
                <Route path="/users/edit/:id" element={<AdminEditUserPage />} />
                <Route path="/documents" element={<AdminFoldersPage />} />
                <Route path="/documents/:id" element={<AdminDocumentsPage />} />
                <Route path="/archive" element={<AdminArchivePage />} />
              </Route>
            </Routes>
          )}
        </>
      )}
    </AuthenticationGuard>
  );
};

export default PurposeApp;

import { useNavigate } from 'solid-app-router';
import { createSignal } from 'solid-js';
import SidebarItem from '../../../../../ecomart-bubble/threereco-app/src/components/sidebar/SidebarItem';
import Sidebar from '../../components/sidebar/Sidebar';
import useState from '../../hooks/state';

let RootPage = ({ children }) => {
  let navigate = useNavigate();
  let [authState, setAuthState, clearAuthState] = useState(
    'authenticationGuard'
  );
  let [userState, setUserState, clearUserState] = useState('userState');

  let [sidebarActive, setSidebarActive] = createSignal(false);
  return (
    <div class="flex flex-row w-screen h-screen bg-gray-800">
      <div class="hidden md:block flex-none">
        <Sidebar
          sidebarActive={true}
          setSidebarActive={(value) => setSidebarActive(value)}
        >
          <SidebarItem
            onClick={() => {
              navigate('/');
            }}
            icon={() => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            )}
            element={() => <div>Dashboard</div>}
          />

          <SidebarItem
            className="hover:bg-red-500 dark:hover:bg-red-500 hover:text-white dark:hover:text-white"
            onClick={() => {
              clearUserState();
              clearAuthState();
              window.location.reload();
            }}
            icon={() => (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            )}
            element={() => <div>Logout</div>}
          />
        </Sidebar>
      </div>

      {sidebarActive() && (
        <div class="flex absolute w-full h-full md:hidden">
          <Sidebar
            sidebarActive={sidebarActive()}
            setSidebarActive={(value) => setSidebarActive(value)}
          >
            <SidebarItem
              onClick={() => {
                navigate('/');
                setSidebarActive(false);
              }}
              icon={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              )}
              element={() => <div>Dashboard</div>}
            />

            <SidebarItem
              className="hover:bg-red-500 dark:hover:bg-red-500 hover:text-white dark:hover:text-white"
              onClick={() => {
                clearUserState();
                clearAuthState();
                window.location.reload();
              }}
              icon={() => (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              )}
              element={() => <div>Logout</div>}
            />
          </Sidebar>

          <div class="w-1/6 h-full bg-gray-900 opacity-70">{''}</div>
        </div>
      )}

      <div class="flex flex-col w-full h-full mt-3 mx-5">
        <div class="flex justify-between items-center md:justify-end">
          <div class="md:hidden" onClick={() => setSidebarActive(true)}>
            <div class="cursor-pointer text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="flex flex-col w-full h-full bg-white mt-3 dark:bg-gray-900 dark:text-white rounded-t-md p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default RootPage;

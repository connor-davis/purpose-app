import { createSignal } from 'solid-js';
import useState from '../../hooks/state';
import ArrowLeft from '../../icons/arrowLeft';
import PurposeLogoSmall from '../PurposeLogoSmall';
import SidebarHeader from './SidebarHeader';

let Sidebar = ({
  children,
  sidebarActive = true,
  setSidebarActive = (value) => {},
}) => {
  let [themeState, toggle] = useState('theme');

  let [active, setActive] = createSignal(sidebarActive);

  return (
    <div
      class={`flex flex-col space-y-3 h-full ${
        active() ? 'w-5/6 md:w-64' : 'w-16 items-center'
      } transition-width duration-300 bg-gray-900 text-white shadow p-1`}
    >
      <SidebarHeader
        left={() =>
          active() && (
            <div
              class={`flex items-center space-x-2 cursor-pointer select-none`}
              onClick={() =>
                themeState.theme === 'dark'
                  ? toggle({ theme: 'light' })
                  : toggle({ theme: 'dark' })
              }
            >
              <PurposeLogoSmall className={'h-10'} />
              <div class="text-white font-bold">Purpose</div>
            </div>
          )
        }
        right={() =>
          active() ? (
            <div
              class={`md:hidden flex flex-col justify-center items-center cursor-pointer w-10 h-10`}
              onClick={() => {
                setActive(false);
                setSidebarActive(false);
              }}
            >
              <ArrowLeft className="text-white fill-white" />
            </div>
          ) : (
            <div
              class="md:hidden cursor-pointer"
              onClick={() => {
                setActive(true);
                setSidebarActive(true);
              }}
            >
              <PurposeLogoSmall className={'h-10'} />
            </div>
          )
        }
      />

      <div class="flex flex-col space-y-2">{children}</div>
    </div>
  );
};

export default Sidebar;

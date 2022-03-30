import { createSignal } from 'solid-js';
import ArrowDown from '../../icons/arrowDown';
import ArrowUp from '../../icons/arrowUp';

let DropDown = ({ children, text, extraClasses }) => {
  let [active, setActive] = createSignal(false);

  return (
    <div
      class="flex flex-col h-15 space-y-2 relative px-3 py-2"
      onClick={() => setActive(!active())}
    >
      <div class="flex items-center justify-between">
        <div>{text()}</div>
        <div>{active() ? <ArrowDown /> : <ArrowUp />}</div>
      </div>

      {active() && (
        <div
          class={`absolute top-6 z-50 left-0 right-0 flex flex-col space-y-2 w-full h-auto max-h-64 overflow-y-auto text-gray-900 dark:text-white ${extraClasses}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default DropDown;

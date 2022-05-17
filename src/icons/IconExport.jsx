import { Icon } from '@hope-ui/solid';

let IconExport = (props) => (
  <Icon
    {...props}
    class="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </Icon>
);

export default IconExport;
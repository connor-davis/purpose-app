import { Icon } from '@hope-ui/solid';

let IconUser = (props) => (
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
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    />
  </Icon>
);

export default IconUser;

import { Icon } from '@hope-ui/solid';

let IconCheck = (props) => (
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
      stroke-width="2"
      stroke-linejoin="round"
      d="M5 13l4 4L19 7"
    />
  </Icon>
);

export default IconCheck;
{
  /* <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    stroke-width="2"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>; */
}

import { createIcon } from '@hope-ui/solid';

let IconArrowRight = createIcon({
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: '2',
  fill: 'none',
  path: () => (
    <path
      fill="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M9 5l7 7-7 7"
    />
  ),
});

export default IconArrowRight;
{
  /* <svg
  xmlns="http://www.w3.org/2000/svg"
  class="h-6 w-6"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="2"
>
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
</svg>; */
}

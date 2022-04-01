import { createIcon } from '@hope-ui/solid';

let IconArrowLeft = createIcon({
  viewBox: '0 0 24 24',
  stroke: 'currentColor',
  strokeWidth: '2',
  fill: 'none',
  path: () => (
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
  ),
});

export default IconArrowLeft;

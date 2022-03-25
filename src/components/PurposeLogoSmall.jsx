import Logo from '../assets/PurposeSmallLogo.png';

let PurposeLogoSmall = ({ className }) => {
  return (
    <div class="flex justify-center items-center">
      <img src={Logo} class={className || 'w-auto h-40'} />
    </div>
  );
};

export default PurposeLogoSmall;

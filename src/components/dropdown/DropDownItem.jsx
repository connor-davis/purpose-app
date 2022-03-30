let DropDownItem = ({ text, extraClasses, onClick = () => {} }) => {
  return (
    <div class={`text-gray-900 dark:text-white ${extraClasses}`} onClick={() => onClick()}>
      {text}
    </div>
  );
};

export default DropDownItem;

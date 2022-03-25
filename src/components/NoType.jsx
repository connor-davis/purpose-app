import { useNavigate } from 'solid-app-router';
import PurposeLogo from './PurposeLogo';

let NoType = ({ className }) => {
  let navigate = useNavigate();
  
  return (
    <div class="flex flex-col w-full h-full justify-center items-center bg-gray-800">
      <div class="flex flex-col items-center space-y-10 w-72 bg-white dark:bg-gray-900 rounded-md shadow p-5">
        <PurposeLogo />

        <div class="text-gray-800 text-center">
          Welcome to Purpose, please select what type of user you are.
        </div>
        <div class="flex flex-col justify-center items-center w-full space-y-3">
          <button
            class="px-3 py-2 bg-lime-300 text-black w-full text-center rounded shadow select-none"
            onClick={() => navigate('/setupCompanyProfile')}
          >
            Company
          </button>
          <button
            class="px-3 py-2 bg-lime-300 text-black w-full text-center rounded shadow select-none"
            onClick={() => navigate('/setupIndividualProfile')}
          >
            Individual
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoType;

import AuthenticationPage from '../pages/authentication';
import apiUrl from '../apiUrl';
import axios from 'axios';
import { onMount } from 'solid-js';
import useState from '../hooks/state';

let AuthenticationGuard = ({ children }) => {
  let [state, update] = useState('authenticationGuard');

  onMount(() => {
    setTimeout(() => {
      axios
        .get(apiUrl + '/authentication/check', {
          headers: {
            authorization: 'Bearer ' + state.authenticationToken,
          },
        })
        .catch((error) => {
          console.log(error);
          update({ authenticationToken: undefined });
        });
    }, 300);
  });

  return (
    <div class="w-screen h-screen outline-none select-none">
      {state.authenticationToken ? children : <AuthenticationPage />}
    </div>
  );
};

export default AuthenticationGuard;

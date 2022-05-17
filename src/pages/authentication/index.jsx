import LoginPage from './loginPage';
import RegisterPage from './registerPage';
import { createSignal } from 'solid-js';
import { Route, Routes } from 'solid-app-router';
import ResetPasswordPage from '../reset/resetPassword.page';

let AuthenticationPage = () => {
  let [login, toggleLogin] = createSignal(false);

  return (
    <div class="w-full h-full">
      <Routes>
        <Route
          path="/"
          exact
          element={() =>
            login() ? (
              <LoginPage toggleLogin={() => toggleLogin(!login())} />
            ) : (
              <RegisterPage toggleLogin={() => toggleLogin(!login())} />
            )
          }
        />
        <Route path="/reset/:token" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
};

export default AuthenticationPage;

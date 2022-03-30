import useState from '../../hooks/state';

let DashboardPage = () => {
  let [userState, updateUserState] = useState('userState');
  
  return <div>Hello, {userState.displayName}</div>;
};

export default DashboardPage;

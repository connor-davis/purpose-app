import useState from '../../hooks/state';

let DashboardPage = () => {
  let [userState, updateUserState] = useState('userState');
  
  return <div>Hello, {userState.userDisplayName}</div>;
};

export default DashboardPage;

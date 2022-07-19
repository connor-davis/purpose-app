import useState from "../../hooks/state";

const EcdDashboardPage = () => {
    let [userState, updateUserState] = useState('userState');
    let [authState, updateAuthState] = useState('authenticationGuard');

    return (
        <div class="flex flex-col w-full h-full text-black rounded-xl">
            <div class="flex w-full h-auto justify-between p-5">
                <div>Your Dashboard</div>
            </div>
        </div>
    );
};

export default EcdDashboardPage;
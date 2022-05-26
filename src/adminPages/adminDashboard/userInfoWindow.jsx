let UserInfoWindow = ({ user, viewProfile = () => {} }) => {
  return (
    <div class="flex flex-col w-64 max-h-64 overflow-y-auto border-l border-t border-r border-b border-gray-200 rounded-lg">
      <div class="flex justify-center items-center py-2 font-bold">
        {user.displayName}
      </div>
      <div class="flex flex-col space-y-2 p-2">
        <div class="flex justify-center items-center">
          <div class="flex flex-col justify-center items-center w-16 h-16 bg-lime-400 text-white rounded-full">
            {user.firstName.split('')[0] + user.lastName.split('')[0]}
          </div>
        </div>
        <div class="flex justify-center items-center">
          {user.firstName + ' ' + user.lastName}
        </div>
        <div class="flex justify-between items-center">
          <div>Industry:</div>
          <div class="font-bold">{user.typeDescription || user.type}</div>
        </div>
        <div class="flex justify-between items-center">
          <div>Number of Employees:</div>
          <div class="font-bold">{user.employeesCount || 0}</div>
        </div>
        <div class="flex justify-between items-center">
          <div>Total Sales:</div>
          <div class="font-bold">{user.sales.length || 0}</div>
        </div>
        <div class="flex justify-between items-center">
          <div>Address:</div>
          <div class="font-bold">{user.streetAddress}</div>
        </div>
        <div></div>

        <div
          class="flex justify-center items-center bg-lime-400 shadow-lg shadow-lime-200 select-none outline-none text-white rounded-md px-3 py-2 cursor-pointer"
          id="viewProfileButton"
          onClick={() => {
            viewProfile();
          }}
        >
          View Profile
        </div>
      </div>
    </div>
  );
};

export default UserInfoWindow;

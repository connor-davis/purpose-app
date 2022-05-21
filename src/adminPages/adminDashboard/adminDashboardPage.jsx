import useState from '../../hooks/state';
import 'https://cdn.jsdelivr.net/npm/chart.js@3.7.0/dist/chart.min.js';
import { createStore } from 'solid-js/store';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import AdminUserMap from './adminUserMap';
import { gendersChart, salesChart } from '../../charts';
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectListbox,
  SelectOption,
  SelectOptionIndicator,
  SelectOptionText,
  SelectPlaceholder,
  SelectTrigger,
  SelectValue,
  VStack,
} from '@hope-ui/solid';
import { For } from 'solid-js';

let AdminDashboardPage = () => {
  let [authState, updateAuthState] = useState('authenticationGuard');
  let [userState, updateUserState] = useState('userState');

  let [users, setUsers] = createStore([], {
    name: 'dashboard-users',
  });
  let [sales, setSales] = createStore([], {
    name: 'dashboard-sales',
  });

  setTimeout(() => {
    loadUsers();
    loadSales('all');
  }, 300);

  let loadUsers = async () => {
    await axios
      .get(apiUrl + '/admin/users', {
        headers: {
          Authorization: 'Bearer ' + authState.authenticationToken,
        },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setUsers([...response.data.data]);
        }
      });
  };

  let industries = [
    'Sewing',
    'Bakery',
    'Wood Work',
    'Garden Service',
    'Food And Beverage',
    'Gardening',
    'Nails',
    'Salon',
    'Consulting',
    'Construction',
    'Other',
  ];

  let loadSales = async (industry) => {
    await axios
      .get(apiUrl + '/admin/users/sales/all', {
        headers: { Authorization: 'Bearer ' + authState.authenticationToken },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          setSales([...response.data.data]);

          salesChart(sales, industry);
          gendersChart(users);
        }
      });
  };

  return (
    <div class="flex flex-col w-full h-full text-black rounded-xl overflow-y-scroll">
      <div class="flex w-full justify-between p-5">
        <div>Your Dashboard</div>
      </div>
      <div class="flex flex-col space-y-5 w-full h-full p-5 pt-0 pb-20">
        <div class="w-full font-bold">Analytics</div>
        <div class="flex space-x-5 w-full">
          <div class="flex flex-col justify-center items-center w-full p-10 space-y-3 bg-lime-400 rounded-lg shadow-xl shadow-lime-200">
            <div class="text-white font-bold">Total Users</div>
            <div class="text-white">{users.length}</div>
          </div>
          <div class="flex flex-col justify-center items-center w-full p-10 space-y-3 bg-lime-400 rounded-lg shadow-xl shadow-lime-200">
            <div class="text-white font-bold">Total Sales</div>
            <div class="text-white">{sales.length}</div>
          </div>
        </div>

        <div class="flex flex-col w-full h-full space-y-5">
          <div class="flex flex-col w-full border-l border-t border-r border-b border-gray-200 rounded-2xl p-2">
            <div class="self-end">
              <Select
                id="type"
                variant="unstyled"
                value={'All'}
                onChange={(type) => {
                  let typeSplit = type.toString().split(' ');
                  let typeJoin = typeSplit.join('');
                  let typeFormatted =
                    typeJoin.split('')[0].toLowerCase() +
                    typeJoin.substring(1, typeJoin.length);

                  salesChart(sales, typeFormatted);
                }}
              >
                <SelectTrigger
                  border="none"
                  outline="none"
                  bg="#e5e5e5"
                  p="$3"
                  class="outline-none"
                  color="black"
                >
                  <SelectPlaceholder>Choose Industry</SelectPlaceholder>
                  <SelectValue />
                  <SelectIcon />
                </SelectTrigger>
                <SelectContent
                  bg="#e5e5e5"
                  border="none"
                  color="black"
                  minW="$56"
                >
                  <SelectListbox as={VStack} spacing="$1">
                    <For
                      each={[
                        'Sewing',
                        'Bakery',
                        'Wood Work',
                        'Garden Service',
                        'Food And Beverage',
                        'Gardening',
                        'Nails',
                        'Salon',
                        'Consulting',
                        'Construction',
                        'Other',
                      ]}
                    >
                      {(item) => (
                        <SelectOption
                          value={item}
                          w="100%"
                          bg="white"
                          _active={{ bg: 'white' }}
                          color="black"
                        >
                          <SelectOptionText>{item}</SelectOptionText>
                          <SelectOptionIndicator color="$lime4" />
                        </SelectOption>
                      )}
                    </For>
                  </SelectListbox>
                </SelectContent>
              </Select>
            </div>
            <canvas id="salesChart" class="w-full max-h-96"></canvas>
          </div>
          <canvas
            id="gendersChart"
            class="w-full max-h-96 border-l border-t border-r border-b border-gray-200 rounded-2xl p-2"
          ></canvas>
          <AdminUserMap />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

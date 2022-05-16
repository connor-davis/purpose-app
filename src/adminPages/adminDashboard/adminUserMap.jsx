import { Loader } from '@googlemaps/js-api-loader';
import useState from '../../hooks/state';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import UserInfoWindow from './userInfoWindow';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'solid-app-router';

let AdminUserMap = () => {
  let navigate = useNavigate();

  let [authState, updateAuthState] = useState('authenticationGuard');
  let [userState, updateUserState] = useState('userState');

  let loadData = async () => {
    await axios
      .get(apiUrl + '/admin/users', {
        headers: { Authorization: 'Bearer ' + authState.authenticationToken },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          let users = response.data.data;

          const loader = new Loader({
            apiKey: 'AIzaSyALY5RV-exvEf9BHaMqaPvqdFi7a6IOe-k',
            version: 'weekly',
          });

          let position = {
            lat: parseFloat(userState.lat),
            lng: parseFloat(userState.lng),
          };

          loader
            .load()
            .then((google) => {
              let map = new google.maps.Map(
                document.getElementById('adminUserMap'),
                {
                  center: position,
                  zoom: 12,
                  styles: [
                    {
                      featureType: 'all',
                      stylers: [{ visibility: 'off' }],
                    },
                    {
                      featureType: 'road',
                      stylers: [{ visibility: 'on' }],
                    },
                  ],
                }
              );

              users.map(async (user) => {
                let data = { ...user };

                if (data.type === 'admin') return;

                await axios
                  .get(apiUrl + '/admin/users/' + user.id, {
                    headers: {
                      Authorization: 'Bearer ' + authState.authenticationToken,
                    },
                  })
                  .then(async (response) => {
                    if (response.data.error) return console.log(response.data);
                    else {
                      let user = response.data.data;

                      let sales = await axios.get(
                        apiUrl + '/admin/users/sales/' + user.id,
                        {
                          headers: {
                            Authorization:
                              'Bearer ' + authState.authenticationToken,
                          },
                        }
                      );

                      user.sales = sales.data.data;

                      let position = {
                        lat: parseFloat(user.lat),
                        lng: parseFloat(user.lng),
                      };

                      let infoForUser = UserInfoWindow({
                        user,
                      });

                      let infoWindowForUser = new google.maps.InfoWindow({
                        content: infoForUser,
                      });

                      let toggled = false;

                      let marker = new google.maps.Marker({
                        position,
                        map,
                        icon: {
                          path: faUser.icon[4],
                          fillColor: '#262626',
                          fillOpacity: 1,
                          strokeWeight: 1,
                          strokeColor: '#a3e635',
                          scale: 0.04,
                        },
                      });

                      marker.addListener('click', () => {
                        if (toggled) {
                          toggled = false;
                          infoWindowForUser.close();
                        } else {
                          toggled = true;
                          infoWindowForUser.open({
                            anchor: marker,
                            map,
                            shouldFocus: true,
                          });

                          google.maps.event.addListener(
                            infoWindowForUser,
                            'domready',
                            () => {
                              let viewProfileButton =
                                document.getElementById('viewProfileButton');

                              viewProfileButton.addEventListener(
                                'click',
                                () => {
                                  navigate('/users/' + user.id);
                                }
                              );
                            }
                          );
                        }
                      });
                    }
                  });
              });
            })
            .catch((e) => {
              // do something
            });
        }
      });
  };

  setTimeout(() => {
    loadData();
  }, 300);

  return (
    <div class="w-full" style={{ 'min-height': '500px' }}>
      <div id="adminUserMap" class="flex w-full h-full rounded-lg"></div>
    </div>
  );
};

export default AdminUserMap;

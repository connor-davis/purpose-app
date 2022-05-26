import useState from '../../hooks/state';
import axios from 'axios';
import apiUrl from '../../apiUrl';
import { useNavigate } from 'solid-app-router';
import UserInfoWindow from './userInfoWindow';

let AdminUserMap = () => {
  let navigate = useNavigate();

  let [authState, updateAuthState] = useState('authenticationGuard');
  let [userState, updateUserState] = useState('userState');

  let loadData = async () => {
    var lmap = L.map('adminUserMap', {
      center: [-29.75298, 30.82111],
      zoom: 13,
      preferCanvas: true,
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(lmap);

    let markers = L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      removeOutsideVisibleBounds: false,
      singleMarkerMode: true,
    });

    await axios
      .get(apiUrl + '/admin/users', {
        headers: { Authorization: 'Bearer ' + authState.authenticationToken },
      })
      .then((response) => {
        if (response.data.error) return console.log(response.data);
        else {
          let users = response.data.data;

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

                  if (isNaN(user.lat) && isNaN(user.lng)) return;

                  let svgIcon = L.divIcon({
                    html: ``,
                    className: 'h-6 w-6',
                    iconSize: [24, 24],
                    iconAnchor: [0, 10],
                  });

                  let marker = L.marker(
                    [parseFloat(user.lat), parseFloat(user.lng)],
                    {
                      elevation: 260.0,
                      title: user.displayName,
                      icon: svgIcon,
                    }
                  ).addTo(lmap);

                  let infoForUser = UserInfoWindow({
                    user,
                    viewProfile: () => {
                      navigate('/users/' + user.id);
                    },
                  });

                  marker.bindPopup(infoForUser);

                  markers.addLayer(marker);
                }
              });
          });

          lmap.addLayer(markers);
        }
      });
  };

  setTimeout(() => {
    loadData();
  }, 300);

  return (
    <div class="w-full pb-20" style={{ 'min-height': '500px' }}>
      <div id="adminUserMap" class="flex w-full h-full rounded-lg"></div>
    </div>
  );
};

export default AdminUserMap;

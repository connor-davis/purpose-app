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

    let oms = new OverlappingMarkerSpiderfier(lmap);

    let popup = new L.Popup();

    oms.addListener('click', function (marker) {
      popup.setContent(marker.content);
      popup.setLatLng(marker.getLatLng());
      lmap.openPopup(popup);
    });

    oms.addListener('spiderfy', function (markers) {
      lmap.closePopup();
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

            if (data.businessType === 'admin') return;

            await axios
              .get(apiUrl + '/admin/users/' + user._id, {
                headers: {
                  Authorization: 'Bearer ' + authState.authenticationToken,
                },
              })
              .then(async (response) => {
                if (response.data.error) return console.log(response.data);
                else {
                  let user = response.data.data;

                  let sales = await axios.get(
                    apiUrl + '/admin/users/sales/' + user._id,
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
                    html: `<svg xmlns="http://www.w3.org/2000/svg" fill="#171717" viewBox="0 0 24 24" stroke="#A3E635" stroke-width="1">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>`,
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
                      navigate('/users/' + user._id);
                    },
                  });

                  marker.content = infoForUser;

                  lmap.addLayer(marker);
                  oms.addMarker(marker);
                }
              });
          });
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

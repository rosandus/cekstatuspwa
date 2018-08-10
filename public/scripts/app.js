(function() {
  'use strict';

  window.onload = function() {

      // Connection Status
      document.getElementById('connectionstatus').innerHTML = navigator.onLine ? 'Online' : 'Offline';

      // GPS
      document.getElementById('gpsstatus').innerHTML = navigator.geolocation ? 'Yes' : 'No';
      // checkGps();
      // function checkGps() {
      //     if ('geolocation' in navigator) {
      //         document.querySelector('#gpsstatus').textContent = 'Yes';
      //     } else {
      //         document.querySelector('#gpsstatus').textContent = 'No';
      //     }
      // };

      // Front Camera Status
      document.getElementById('frontcamerastatus').innerHTML = window.ImageCapture ? 'Yes' : 'No';

      // Rear Camera Status
      document.getElementById('rearcamerastatus').innerHTML = navigator.mediaDevices || navigator.mediaDevices.enumerateDevices ? 'Yes' : 'No';
      // checkCamera();
      // function checkCamera() {
      //     if ('ImageCapture' in window) {
      //         document.querySelector('#camerastatus').textContent = 'Yes';
      //     } else {
      //         document.querySelector('#camerastatus').textContent = 'No';
      //     }
      // };

      // Tap Status
      // document.getElementById('touchable').addEventListener('touchstart', handleStart, false);
      // document.getElementById('tapstatus').addEventListener().innerHTML = document.documentElement.ontouchstart ? 'Yes' : 'No';

      // Accelerometer Status
      document.getElementById('accestatus').innerHTML = window.Accelerometer ? 'Yes' : 'No';
      // if (window.Accelerometer == undefined) {
      //     //No accelerometer is present. Use buttons.
      //     document.getElementById('accestatus').innerHTML = 'No';
      // }
      // else {
      //     document.getElementById('accestatus').innerHTML = 'Yes';
      //     // window.addEventListener("devicemotion", accelerometerUpdate, true);
      // }

      // Bluetooth Status
      document.getElementById('bluetoothstatus').innerHTML = navigator.bluetooth ? 'Yes' : 'No';
      // checkBluetooth();
      // function checkBluetooth() {
      //     if ('bluetooth' in navigator) {
      //         document.querySelector('#bluetoothstatus').textContent = 'Yes';
      //     } else {
      //         document.querySelector('#bluetoothstatus').textContent = 'No';
      //     }
      // };

      // Device Name
      checkDevice();
      function checkDevice() {
          'use strict';

          let module = {
              options: [],
              header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
              dataos: [
                  { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
                  { name: 'Windows', value: 'Win', version: 'NT' },
                  { name: 'iPhone', value: 'iPhone', version: 'OS' },
                  { name: 'iPad', value: 'iPad', version: 'OS' },
                  { name: 'Kindle', value: 'Silk', version: 'Silk' },
                  { name: 'Android', value: 'Android', version: 'Android' },
                  { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
                  { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
                  { name: 'Macintosh', value: 'Mac', version: 'OS X' },
                  { name: 'Linux', value: 'Linux', version: 'rv' },
                  { name: 'Palm', value: 'Palm', version: 'PalmOS' }
              ],
              init: function () {
                  let agent = this.header.join(' '),
                      os = this.matchItem(agent, this.dataos);
                  return { os: os};
              },
              matchItem: function (string, data) {
                  let i = 0,
                      j = 0,
                      html = '',
                      regex,
                      regexv,
                      match,
                      matches,
                      version;

                  for (i = 0; i < data.length; i += 1) {
                      regex = new RegExp(data[i].value, 'i');
                      match = regex.test(string);
                      if (match) {
                          regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                          matches = string.match(regexv);
                          version = '';
                          if (matches) { if (matches[1]) { matches = matches[1]; } }
                          if (matches) {
                              matches = matches.split(/[._]+/);
                              for (j = 0; j < matches.length; j += 1) {
                                  if (j === 0) {
                                      version += matches[j] + '.';
                                  } else {
                                      version += matches[j];
                                  }
                              }
                          } else {
                              version = '0';
                          }
                          return {
                              name: data[i].name,
                              version: parseFloat(version)
                          };
                      }
                  }
                  return { name: 'unknown', version: 0 };
              }
          };

          const e = module.init();

          document.getElementById('devicestatus').innerHTML = e.os.name + " " + e.os.version;
          console.log(e.os.name);
          console.log(e.os.version);
      };

      // Battery Status
      function updateBatteryStatus(battery) {
          document.querySelector('#charging').textContent = battery.charging ? 'Charging' : 'Not Charging';
          document.querySelector('#level').textContent = battery.level * 100 + "%";
          document.querySelector('#dischargingTime').textContent = battery.dischargingTime / 60;
      }

      navigator.getBattery().then(function (battery) {
          // Update the battery status initially when the promise resolves ...
          updateBatteryStatus(battery);

          // .. and for any subsequent updates.
          battery.onchargingchange = function () {
              updateBatteryStatus(battery);
          };

          battery.onlevelchange = function () {
              updateBatteryStatus(battery);
          };

          battery.ondischargingtimechange = function () {
              updateBatteryStatus(battery);
          };
      });

      // // Connectivity Type
      function getConnection() {
          return navigator.connection || navigator.mozConnection ||
              navigator.webkitConnection || navigator.msConnection;
      }

      function updateNetworkInfo(info) {
          // let type = info.type.charAt(0).toUpperCase()+info.type.slice(1);
          document.getElementById('connectivitytpe').innerHTML = info.type + "; " + info.effectiveType;
      }

      let info = getConnection();
      if (info) {
          info.addEventListener('change', updateNetworkInfo);
          updateNetworkInfo(info);
      }

      // Tap Status
      // checkTap();
      // // let isTouchCapable = 'ontouchstart' in window || navigator.msMaxTouchPoints;
      // // let isTouchCapable = 'ontouchstart' in window ||
      // //     window.DocumentTouch && document instanceof window.DocumentTouch ||
      // //     navigator.maxTouchPoints ||
      // //     window.navigator.msMaxTouchPoints || 'onmsgesturechange' in window || window.navigator.msMaxTouchPoints;
      // function checkTap() {
      //     if (isTouchCapable){
      //         document.addEventListener('touchstart', myTouchFunction, false);
      //         document.querySelector('#tapstatus').textContent = 'Yes';
      //     } else {
      //         document.querySelector('#tapstatus').textContent = 'No';
      //     }
      // };
  };

// LOCK SCREEN
const lockScreen = () => {
    if (window.screen.orientation.type == "portrait") {
        document.documentElement.requestFullScreen();
        screen.orientation.lock("portrait-primary");
    };
};
lockScreen();
// screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
// screen.lockOrientationUniversal("portrait");
// if (screen.lockOrientationUniversal("landscape-primary")) {
//     // orientation was locked
// } else {
//     // orientation lock failed
// }
// let lockOrientation = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation;
// lockOrientation("portrait-primary");

// if (window.screen.orientation.type == "portrait-primary") {
//     console.log("Benar");
//     window.screen.orientation.lock(window.screen.orientation.type);
// };

// ENABLE GPS
navigator.permissions && navigator.permissions.query({name: 'geolocation'}).then(function(PermissionStatus) {
    if(PermissionStatus.state == 'granted'){
        //allowed
        console.log("Hahaha bisa kok");
    }else{
        //denied
        console.log("TIDAK BISA");
    }
});

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
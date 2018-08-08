(function() {
  'use strict';

  window.onload = function() {
      // Connection Status
      document.getElementById('connectionstatus').innerHTML = navigator.onLine ? 'Online' : 'Offline';

      // Accelerometer Status
      // document.getElementById('accestatus').innerHTML = navigator.onLine ? 'Online' : 'Offline';
      if (window.Accelerometer == undefined) {
          //No accelerometer is present. Use buttons.
          document.getElementById('accestatus').innerHTML = 'No';
      }
      else {
          document.getElementById('accestatus').innerHTML = 'Yes';
          // window.addEventListener("devicemotion", accelerometerUpdate, true);
      }

      checkBluetooth();
      function checkBluetooth() {
          if ('bluetooth' in navigator) {
              document.querySelector('#bluetoothstatus').textContent = 'Yes';
          } else {
              document.querySelector('#bluetoothstatus').textContent = 'No';
          }
      };
      // if (!('bluetooth' in navigator)) {
      //     $target.innerText = 'Bluetooth API not supported.';
      //     return;

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

      // Connectivity Type
      function getConnection() {
          return navigator.connection || navigator.mozConnection ||
              navigator.webkitConnection || navigator.msConnection;
      }

      function updateNetworkInfo(info) {
          let type = info.type.charAt(0).toUpperCase()+info.type.slice(1);
          document.getElementById('connectivitytpe').innerHTML = type + "; " + info.effectiveType;
      }

      let info = getConnection();
      if (info) {
          info.addEventListener('change', updateNetworkInfo);
          updateNetworkInfo(info);
      }

      // Front Camera
      // function getUserMedia(options, successCallback, failureCallback) {
      //     var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      //         navigator.mozGetUserMedia || navigator.msGetUserMedia;
      //     if (api) {
      //         return api.bind(navigator)(options, successCallback, failureCallback);
      //     }
      // }
      //
      // function getStream() {
      //     if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      //         !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      //         document.querySelector('#frontcamerastatus').textContent = 'No';
      //         return;
      //     } else {
      //         document.querySelector('#frontcamerastatus').textContent = 'Yes';
      //     }
      // }

      // GPS
      checkGps();
      function checkGps() {
          if ('geolocation' in navigator) {
              document.querySelector('#gpsstatus').textContent = 'Yes';
          } else {
              document.querySelector('#gpsstatus').textContent = 'No';
          }
      };
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();

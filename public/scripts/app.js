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

      // Rear Camera Status
      document.getElementById('camerastatus').innerHTML = window.ImageCapture ? 'Yes' : 'No';
      // checkCamera();
      // function checkCamera() {
      //     if ('ImageCapture' in window) {
      //         document.querySelector('#camerastatus').textContent = 'Yes';
      //     } else {
      //         document.querySelector('#camerastatus').textContent = 'No';
      //     }
      // };

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
      // getStream();
      // function getUserMedia(options, successCallback, failureCallback) {
      //     var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      //         navigator.mozGetUserMedia || navigator.msGetUserMedia;
      //     if (api) {
      //         return api.bind(navigator)(options, successCallback, failureCallback);
      //     }
      // }

      // function getStream() {
      //     if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      //         !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      //         document.querySelector('#frontcamerastatus').textContent = 'No';
      //         return;
      //     } else {
      //         document.querySelector('#frontcamerastatus').textContent = 'Yes';
      //     }
      // }

      // Tap Status
      checkTap();
      let isTouchCapable = 'ontouchstart' in window ||
          window.DocumentTouch && document instanceof window.DocumentTouch ||
          navigator.maxTouchPoints ||
          window.navigator.msMaxTouchPoints;
      function checkTap() {
          if (isTouchCapable){
              document.addEventListener('touchstart', myTouchFunction, false);
              document.querySelector('#tapstatus').textContent = 'Yes';
          } else {
              document.querySelector('#tapstatus').textContent = 'No';
          }
      };
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();
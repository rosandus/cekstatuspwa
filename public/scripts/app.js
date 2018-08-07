(function() {
  'use strict';

  window.onload = function() {
      function updateBatteryStatus(battery) {
          document.querySelector('#charging').textContent = battery.charging ? 'charging' : 'not charging';
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
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
})();

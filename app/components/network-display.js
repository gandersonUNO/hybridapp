import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
  networkType: 'Unknown Network',
  notification: 'No notification',
  on: true,
  init: function() {
    this._super(...arguments);
    this.checkConnections(this);
  },
  checkConnections: function(scope) {
    later(function() {
      let newNetworkState = navigator.connection.type;
      if(newNetworkState !== scope.get('networkType')){
        if(scope.get('networkType') !== 'Unknown Network') {
          navigator.notification.alert(
            'Your connection type has changed. You are now using ' + newNetworkState + '.',
            scope.alertDismissed,
            'Connection Changed',
            'Ok'
          );
        }
        if(newNetworkState !== 'wifi') {
          scope.set('notification', 'Offline');
        }
        else {
          scope.set('notification', 'Online');
        }
      }

      scope.set('networkType', newNetworkState);

      if(scope.get('on')){
        scope.checkConnections(scope); //recurse
      }
    }, 100);
  },
  alertDismissed: function(scope) {

  }

});

var app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.initializeGoogleAnalytics();
    },
    
    initializeGoogleAnalytics: function() {
        var uuid = $cordovaDevice.getUUID();
        
        $cordovaGoogleAnalytics.debugMode();
        $cordovaGoogleAnalytics.startTrackerWithId('UA-57593200-3');
        $cordovaGoogleAnalytics.setUserId(uuid);
        $cordovaGoogleAnalytics.addCustomDimension('dimension1', 'App Load');
        $cordovaGoogleAnalytics.trackView('App Load');
    }
};

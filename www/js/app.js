var app = {
    goalFile: 'goals.txt',
    goals: { 'goals': [] };,
    
    initialize: function initialize() {
        this.bindEvents();
    },

    bindEvents: function bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function onDeviceReady() {
        app.initializeGoogleAnalytics();
        app.initializeGoals();
    },
    
    initializeGoogleAnalytics: function initializeGoogleAnalytics() {
        var uuid = $cordovaDevice.getUUID();
        
        $cordovaGoogleAnalytics.debugMode();
        $cordovaGoogleAnalytics.startTrackerWithId('UA-57593200-3');
        $cordovaGoogleAnalytics.setUserId(uuid);
        $cordovaGoogleAnalytics.addCustomDimension('dimension1', 'App Load');
        $cordovaGoogleAnalytics.trackView('App Load');
    },
    
    initializeGoals: function initializeGoals() {
        $cordovaGoogleAnalytics.addCustomDimension('dimension2', 'Initialize Goals');
        
        function readGoals() {
            $cordovaFile.readAsText(cordova.file.dataDirectory, $scope.inputs.readFile)
                .then(function readSuccess(success) {
                    app.goals = JSON.parse(success);
                    $cordovaGoogleAnalytics.trackEvent('Initialize Goals', 'Read Goal File', 'Success', 0);
                }, function readFail(error) {
                    console.log('Read Fail: ', error);
                    $cordovaGoogleAnalytics.trackEvent('Initialize Goals', 'Read Goal File', 'Fail: ' + error, 0);
                });
        }
        
        function createGoals() {
            var data = JSON.stringify(app.goals);
            
            $cordovaFile.writeFile(cordova.file.dataDirectory, app.goalFile, data, true)
                .then(function createSuccess(success) {
                    console.log('Write Successful');
                    $cordovaGoogleAnalytics.trackEvent('Initialize Goals', 'Create Goal File', 'Success', 0);
                }, function createFail(error) {
                    console.log('Write Fail', error);
                    $cordovaGoogleAnalytics.trackEvent('Initialize Goals', 'Create Goal File', 'Fail: ' + error, 0);
                });
        }
        
        $cordovaFile.checkFile(cordova.file.dataDirectory, app.goalFile)
            .then(function checkSuccess(success) {
                $cordovaGoogleAnalytics.trackEvent('Initialize Goals', 'Check Goal File', 'Success', 0);
                readGoals();
            }, function checkFail(error) {
                console.log('Check Fail: ', error);
                $cordovaGoogleAnalytics.trackEvent('Initialize Goals', 'Check Goal File', 'Fail: ' + error, 0);
                createGoals();
            });
    },

    addGoal: function addGoal(goal) {
        $cordovaGoogleAnalytics.addCustomDimension('dimension4', 'Add Goals');
        
        app.goals.goals.push(goal);
        $cordovaGoogleAnalytics.trackEvent('Add Goals', 'Add Goal', 'Success', app.goals.goals.length);
        app.saveGoals();
    },
            
    saveGoals: function saveGoals() {
        $cordovaGoogleAnalytics.addCustomDimension('dimension3', 'Save Goals');
        var data = JSON.stringify(app.goals);
        
        function writeGoals() {
            $cordovaFile.writeFile(cordova.file.dataDirectory, app.goalFile, data, true)
                .then(function (success) {
                    console.log('Write Successful');
                    $cordovaGoogleAnalytics.trackEvent('Save Goals', 'Save Goal File', 'Success', app.goals.goals.length);
                }, function (error) {
                    console.log('Write Fail', error);
                    $cordovaGoogleAnalytics.trackEvent('Save Goals', 'Save Goal File', 'Fail: ' + error, 0);
                });    
        }
        
        $cordovaFile.checkFile(cordova.file.dataDirectory, app.goalFile)
            .then(function checkSuccess(success) {
                $cordovaGoogleAnalytics.trackEvent('Save Goals', 'Check Goal File', 'Success', 0);
                writeGoals();
            }, function checkFail(error) {
                console.log('Check Fail: ', error);
                $cordovaGoogleAnalytics.trackEvent('Save Goals', 'Check Goal File', 'Fail: ' + error, 0);
            });
    }
};

window.app = app;

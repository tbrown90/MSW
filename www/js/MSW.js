var appDependencies = [
    'ui.router',
    'ngCordova',
    'MSWDirectives',
    'MSWControllers',
    'MSWServices'
];

var MSW = {
    App: angular.module('MSW', appDependencies),
    Directives: angular.module('MSWDirectives', []),
    Controllers: angular.module('MSWControllers', []),
    Services: angular.module('MSWServices', [])
};

MSW.App.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    $urlRouterProvider.otherwise("/");
    
    $stateProvider
        .state('msw', {
            url: "/",
            views: {
                'content': {
                    templateUrl: "features/home/home-partial.html",
                    controller: 'homeCtrl' 
                }
            }
        })
        .state('add', {
            url: "add",
            views: {
                'content': {
                    templateUrl: "features/goal-add/goal-add-partial.html",
                    controller: 'goalAddCtrl'
                }
            }
        });
});

MSW.App.run(['$state', function($state) {
    console.log('Run');
    $state.go('msw');
}]);

window.MSW = MSW;
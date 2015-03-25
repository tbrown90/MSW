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
        .state('home', {
            url: "",
            templateUrl: "features/home/home-partial.html",
            controller: 'homeCtrl'
        });
});

MSW.App.run(['$state', function($state) {
    $state.go('home');
}]);

window.MSW = MSW;
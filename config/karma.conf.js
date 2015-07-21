module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: [ 'jasmine' ],
    files: [
     'libs/jquery/dist/jquery.js',
     'libs/angular/angular.js',
     'libs/angular-animate/angular-animate.js',
     'libs/slick-carousel/slick/slick.js',
     'libs/angular-ui-router/release/angular-ui-router.js',
     'libs/lodash/dist/lodash.js',
     'libs/restangular/dist/restangular.js',
     'libs/angular-smart-table/dist/smart-table.min.js',
     'libs/angular-local-storage/dist/angular-local-storage.js',
     'libs/textAngular/dist/textAngular-rangy.min.js',
     'libs/textAngular/dist/textAngular-sanitize.min.js',
     'libs/textAngular/dist/textAngular.min.js',
     'libs/moment/moment.js',
     'libs/angular-moment/angular-moment.js',
     'libs/angular-bootstrap/ui-bootstrap.js',
     'libs/angular-slick/dist/slick.js',
     'libs/semantic-ui/dist/semantic.js',
     'libs/highcharts-ng/src/highcharts-ng.js',
     'libs/Chart.js/Chart.min.js',
     'libs/angular-chart.js/dist/angular-chart.js',
     'libs/angular-toastr/dist/angular-toastr.min.js',
     'libs/angular-toastr/dist/angular-toastr.tpls.min.js',
     'libs/angular-cookie/angular-cookie.js',
     'libs/ng-token-auth/dist/ng-token-auth.js',
     'libs/ngstorage/ngStorage.js',
      {pattern: 'app/*.js', included: false},
      {pattern: 'app/partials/*.html', included: false},
     'test/test-main.js'
    ],
    preprocessors: {
      'app/partials/*.html': 'ng-html2js'
    },
    reporters: [ 'progress' ],
    colors: true,
    autoWatch: true,
    logLevel: config.LOG_INFO,
    browsers: [ 'Chrome' ],
    singleRun: false,
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-ng-html2js-preprocessor'
    ]
  });
};


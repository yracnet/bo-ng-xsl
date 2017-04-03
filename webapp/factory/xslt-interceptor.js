app.run(['$rootScope', '$xhrFactory', function($rootScope, $xhrFactory){
  var layout = $xhrFactory('GET', 'layout.xsl');
  layout.open('GET', 'layout.xsl', false);
  layout.send(null);
  $rootScope.runXslt=true;
  $rootScope.xsltProcessor = new XSLTProcessor();
  if (layout.status === 200) {
    console.log('layout: ', layout);
    $rootScope.xsltProcessor.importStylesheet(layout.responseXML);
    //code = layout.responseXML;
  }
}]);
app.factory('xsltInterceptor', ['$rootScope', function($rootScope) {
    var xsltInterceptor = {
      request: function(request) {
       console.log('request: ', request);
       return request;
      },
      response: function(response) {
       console.log('response: ', response);
       console.log('runXslt: ', $rootScope.runXslt);
       if($rootScope.runXslt === false || $rootScope.runXslt === 'false'){
         return response;
       }
       //if(isJson(response.data)){
       if(typeof response.data === 'string'){
          var xml = document.createElement('ignore');
          xml.innerHTML = response.data;
          var xsltProcessor = $rootScope.xsltProcessor;
          console.log('xsltProcessor: ', xsltProcessor);
          tranform = xsltProcessor.transformToFragment(xml, document);
          console.log('tranform: ', tranform);
          var serializer = new XMLSerializer();
          response.data = serializer.serializeToString( tranform );
       }
       console.log('response.data: ', response.data);
       return response;
      }
    };
    return xsltInterceptor;
}]);
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('xsltInterceptor');
}]);


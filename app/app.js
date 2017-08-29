'use strict';

angular.module('productsListModule', [])
    .controller('ProductListCtrl', ['ProductsList', function (ProductsList) {
        var vm = this;
        ProductsList.getProducts()
            .then(function(response){
                vm.productsList = response.data.productList;
                vm.selectedProduct = vm.productsList[0];
            }, function(error){
                console.log(error);
            });

        function displayPrice() {
            alert("Price of the item is :" + vm.selectedProduct.networkPrice + "$");
        }

        vm.displayPrice = displayPrice;
    }])
    .factory('ProductsList', ['$http', function($http){
        function getProducts() {
           return $http({
                method: 'GET',
                url: 'http://localhost:8009/proxy/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=6&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1',
               params: {
                   headers: {
                       //'Access-Control-Allow-Origin': '*'
                       'Access-Control-Request-Headers' : '*'
                   }
               }
            });
        }
        return {
            getProducts : getProducts
        }
    }]);
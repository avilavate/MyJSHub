
angular.module("app", []).controller("ctrl", ["circleFactory", "$scope", function (circleFactory, $scope) {
    $scope.circles = [];
    for (var i = 0; i <= 1000; i = i + 50) {
        $scope.circles.push(i);
    }
    $scope.Countries = [];
    $scope.Circles = [];


    $scope.addCountry = function (n, p, m, e) {
        var c = new circleFactory.Country(n, p, m, e);
        $scope.Circles.push(new circleFactory.Circle(c));
    };
}]);


angular.module("app").factory("circleFactory", function () {
    var Country = function (name, population, medication, education) {
        this.population = population;
        this.name = name;
        this.medication = medication;
        this.education = education;
    };

    var min = {
        min: 1000000
    };

    var Circle = function (country) {
        this.x = (country.education * 1000) / 100;
        this.y = 1000 - (country.medication * 1000) / 100;
        this.r = 0;
        this.fitToSizeRadious = 0;
        this.name = country.name;
        this.radious = function () {
            if (country.population !== undefined) {
                //considers the minimum population as 1M using Pi*r*r formilae
                this.r = Math.sqrt(((country.population) * 7) / 22) / 50;
            }
            return this.r;
        };
        this.fitToSize = function () {
            this.fitToSizeRadious = this.r / min;
        }
    };

    return {
        Country: Country,
        Circle: Circle
    }
});


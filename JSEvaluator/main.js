"use strict";

angular.module("app", []).controller("ctrl", ["$scope","evalFactory", function ($scope, evalFactory) {
    $scope.input;
    $scope.isValid = false;
   
    $scope.ExpressionEvaluator = function () {
        $scope.isValid = evalFactory.ExpressionEvaluator($scope.input);
        $scope.result = evalFactory.Execute();
    }


}]).factory("evalFactory", function () {

    var Stack = function () {
        this.data = [];
        this.push = function (info) {
            var length = this.data.length;
            this.data[length] = info;
        }
        this.pop = function () {
            if (this.data) {
                var length = this.data.length === 0 ? 0 : this.data.length - 1;
                var item = this.data[length] ? true : false;
                this.data.splice(length, 1);
                return item;
            }
        }
        this.reset = function () {
            this.data = [];
        }
    };

    var Execute = function (expr) {
        var i = 0;
        var left;
        var right, operator, result;

        while (expr[i] !== "+" || expr[i] !== "-" || expr[i] !== "*" || expr[i] !== "/" && i < expr.length) {
            left = expr[i];
            i++;
        }
        operator = expr[i++];
        right = expr[i];
        left = Number.parseInt(left);
        right = Number.parseInt(right);
        switch (operator) {
            case "+":
                result = left + right;
                break;
            case "-":
                result = left - right;
                break;
            case "*":
                result = left * right;
                break;
            case "/":
                result = left / right;
                break;
            default:
                result = "Not a valid statement";
        }
        return result;
    };

    var ExpressionEvaluator = function (expression) {
        var arr = expression.split('');
        console.log(Validator(arr));
    }
    var expResult = 0;
    var Validator = function (arr) {
        var stack = new Stack();
        var popRes;
        var intermediate;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === "{") {
                stack.push("{");
            }
            else if (arr[i] === "}") {
                if (!stack.pop()) {
                    return false;
                }
            }
            else {
                intermediate += arr[i]

            }
        }

        return stack.data.length === 0;
      
    }

    var factory = {
        Stack: Stack,
        Execute: Execute(intermediate),
        Validator: Validator,
        ExpressionEvaluator: ExpressionEvaluator
    };

    return factory;

});








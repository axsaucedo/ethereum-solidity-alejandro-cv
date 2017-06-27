var CVAlejandro = artifacts.require("./CVAlejandro.sol");

contract("CVAlejandro.sol", function (accounts) {

  function checkModifierFunction (newValue, getFunc, setFunc, compareFunc) {
    var initialValue;

    return getFunc().then(function (result) {

      initialValue = result;
      return setFunc(newValue);

    }).then(function () {
      return getFunc();

    }).then(function (result) {

      return compareFunc(initialValue, newValue, result);
    });
  }



  var add_attributes = ["Experience", "Education", "Language"];

  for (var i in add_attributes) {

    var attribute = add_attributes[i];

    (function (attribute) {
      it("should correctly get and add " + attribute, function () {

        return CVAlejandro.deployed().then(function (instance) {

            return checkModifierFunction(
                attribute,
                instance["get" + attribute],
                instance["add" + attribute],
                function (initial, newValue, result) {
                  var expected = initial + newValue + "\n";
                  return assert.equal(expected, result);
                });
        });
      });
    })(attribute);

    (function (attribute) {

      it("should not allow adder " + attribute + " to be ran as non-owner account", function () {
        // Changing account to a different one
        web3.eth.defaultAccount = web3.eth.accounts[2];

        return CVAlejandro.deployed().then(function (instance) {

          return checkModifierFunction(
                  attribute,
                  instance["get" + attribute],
                  (function (attribute) {
                    return function () {
                      web3.eth.sendTransaction({ from: web3.eth.accounts[2], data: instance["add" + attribute] });
                    };
                  })(attribute),
                  function (initial, newValue, result) {
                    return assert.equal(initial, result);
                  });
        });
      });
    });

    (function (attribute) {

      it("should have content in " + attribute, function () {
        // Changing account to a different one
        web3.eth.defaultAccount = web3.eth.accounts[2];

        return CVAlejandro.deployed().then(function (instance) {

          return instance["get" + attribute]();

        }).then(function (result) {

          assert.notEqual("", result);

        });

      });

    })(attribute);


    (function (attribute) {

      it("should have content in " + attribute, function () {
        // Changing account to a different one
        web3.eth.defaultAccount = web3.eth.accounts[2];

        return CVAlejandro.deployed().then(function (instance) {

          return checkModifierFunction(
              attribute,
              instance["get" + attribute],
              instance["pop" + attribute],
              function (initial, newValue, result) {
                var expected = initial.replace(/(\n).+\n$|^.*\n$/, "$1");
                return assert.equal(result, expected);
              });
        });

      });

    })(attribute);
  }


  var set_attributes = ["Email", "Name", "Summary", "LinkedIn", "GitHub", "Twitter", "Address", "Description", "Title"];

  for (var i in set_attributes) {

    var set_attribute = set_attributes[i];

    (function (set_attribute) {
      it("should correctly get and set " + set_attribute, function () {

        return CVAlejandro.deployed().then(function (instance) {

            return checkModifierFunction(
                set_attribute,
                instance["get" + set_attribute],
                instance["set" + set_attribute],
                function (initial, newValue, result) {
                  return assert.equal(newValue, result);
                });
        });
      });
    })(set_attribute);


    (function (set_attribute) {

      it("should not allow setter " + set_attribute + " to be ran as non-owner account", function () {
        // Changing account to a different one
        web3.eth.defaultAccount = web3.eth.accounts[2];

        return CVAlejandro.deployed().then(function (instance) {

          return checkModifierFunction(
                  set_attribute,
                  instance["get" + set_attribute],
                  (function (set_attribute) {
                    return function () {
                      web3.eth.sendTransaction({ from: web3.eth.accounts[2], data: instance["set" + set_attribute] });
                    };
                  })(set_attribute),
                  function (initial, newValue, result) {
                    return assert.equal(initial, result);
                  });
        });
      });

    })(set_attribute);


    (function (set_attribute) {

      it("should have content in " + set_attribute, function () {
        // Changing account to a different one
        web3.eth.defaultAccount = web3.eth.accounts[2];

        return CVAlejandro.deployed().then(function (instance) {

          return instance["get" + set_attribute]();

        }).then(function (result) {
          assert.notEqual("", result);
        });
      });

    })(set_attribute);
  }
});



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

  it("should correctly add new education", function () {

    return CVAlejandro.deployed().then(function (instance) {

      return checkModifierFunction(
          "TEST_EDUCATION",
          instance.getEducation,
          instance.addEducation,
          function (initial, newValue, result) {
            var expected = initial + newValue + "\n";
            return assert.equal(expected, result);
          });
    });
  });

  it("should correctly add new experience", function () {

    return CVAlejandro.deployed().then(function (instance) {

      return checkModifierFunction(
          "TEST_EXPERIENCE",
          instance.getExperience,
          instance.addExperience,
          function (initial, newValue, result) {
            var expected = initial + newValue + "\n";
            return assert.equal(expected, result);
          });

    });
  });

  it("should correctly add new language", function () {

    return CVAlejandro.deployed().then(function (instance) {

      return checkModifierFunction(
          "TEST_LANGUAGE",
          instance.getLanguage,
          instance.addLanguage,
          function (initial, newValue, result) {
            var expected = initial + newValue + "\n";
            return assert.equal(expected, result);
          });

    });
  });

  it("Should not allow any of the setter accounts to be called by anyone other than the owner", function () {

  });
});



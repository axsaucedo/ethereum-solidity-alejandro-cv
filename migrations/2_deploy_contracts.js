var CVAlejandro = artifacts.require("./CVAlejandro.sol");

module.exports = function (deployer) {
  deployer.deploy(CVAlejandro, { gas: 4000000 });
};

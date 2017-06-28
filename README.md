# Ethereum Solidity Alejandro CV

![https://github.com/axsauze/ethereum-solidity-alejandro-cv/blob/master/assets/title.png?raw=true][https://github.com/axsauze/ethereum-solidity-alejandro-cv/blob/master/assets/title.png?raw=true]

This is a repository containing my CV in the Ethereum Blockchain, together with a web interface to visualise it, located in

![CVAlejandro Body][https://github.com/axsauze/ethereum-solidity-alejandro-cv/blob/master/assets/body.png?raw=true]


# Installing

In order to install the project make sure you run all the dependencies:

```
npm install
```

Once you have this, you will need to have a way to test this, I recommend using testrpc:

```
npm install -g ethereumjs-testrpc
```

# Running

This section consist of:

* Setting up environment
* Deploying CV Contracts
* Interacting with CV contract


## Setting up environment

We need to first kick off testrpc to make sure we can have a mock blockchain environment to avoid waiting for mining times, etc:

```
testrpc
```

It's that simple. We should now see:

EthereumJS TestRPC v3.0.5

```
Available Accounts
==================
...

Private Keys
==================
...
```

Those are the accounts and private keys that it created in the mock private network.

## Deploying CV Contracts

Now we need to deploy the contracts, which can be done by first compiling them and then running the migration:

```
truffle compile

truffle migrate
```

The output should be something as follows:

```
Using network 'development'.

Running migration: 1_initial_migration.js
  Deploying Migrations...
  Migrations: [ANOTHER_HASH]
Saving successful migration to network...
Saving artifacts...
Running migration: 2_deploy_contracts.js
  Deploying CVAlejandro...
  CVAlejandro: [YOUR_HASH]
Saving successful migration to network...
Saving artifacts...
```

You need to make sure you keep the [YOUR_HASH] string, as we'll need it later.

## Interacting with the contract

Now that we have deployed the contracts, let's interact with them. First let's kick off the interactive console!

```
geth attach rpc:http://localhost:8535
```

**(Alternatively)** You can also do this by running:

```
truffle console
```

Once you are in the console, we can start loading the contract. First and formost we will need the ABI, which is the interface of the contract, which we can get from the output of the `truffle compile` command that we ran previously.

The output of this command is saved in the file `build/contracts/CVAlejandro.json`. We open this file, and from the JSOn object we copy the entire array in the ABI property:

``` javascript
{
  "contract_name": "CVAlejandro",
  "abi": [ ... ] // <- This array, copy it!
}
```

Now in the console we first load the ABI object by saving it in a variable:

``` javascript
var abi = [ /* The really long array that you just copied */ ];
```

We now proceed to build a contract object:

``` javascript
var contract = web3.eth.contract(abi);
```

Now we are going to need the contract address from the output of the `truffle migrate` command, which we called [YOUR_HASH] - remember? Let's copy it and use it to create now an instance of our contract based on the address in the blockchain.

``` javascript
var instance = contract.at("[THE CONTRACT ADDRESS]");
```

Now we have an instance that we can interact with!

Let's run some functions against the contract!

``` javascript
instance.getTwitter();

instance.setTwitter("NEW TEST TWTITTER");

instance.getTwitter();
```

We can see the output has been changed now!

# Testing

To run the tests simply run:

```
truffle test
```

https://github.com/axsauze/ethereum-solidity-alejandro-cv/blob/master/assets/title.png?raw=true
[https://github.com/axsauze/ethereum-solidity-alejandro-cv/blob/master/assets/title.png?raw=true]: https://github.com/axsauze/ethereum-solidity-alejandro-cv/blob/master/assets/title.png?raw=true

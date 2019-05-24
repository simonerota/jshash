# jshash

A collection of hashing functions for ancient javascript implementations.

This package targets and has been tested on [Mozilla's Rhino](https://developer.mozilla.org/en-US/docs/Mozilla/Projects/Rhino) 1.5R5 (JavaScript 1.5/ ECMA Script 3)

Included functions:

- SHA
- LMHASH
- NTHASH

## Usage example

    var password = "ThePassword";
    print(SHA(password)); // {SHA}D6sP66NRqicdGDNFQT+AI8t/6VM=
    print(hashNT(password)); // B32FEDAED99B839126B446318F08B2DA
    print(hashLM(password)); // 2F468C7425D327B5D408E6B105741864



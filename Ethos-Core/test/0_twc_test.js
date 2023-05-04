const { expect } = require("chai");

// npx hardhat test ./test/0_twc_test.js 
describe("twcTest", function () {

    let collateralConfig;
    let tokenOne;

    async function init() {
        // CollateralConfig 
        const CollateralConfig = await ethers.getContractFactory("CollateralConfig");
        collateralConfig = await CollateralConfig.deploy();

        //  token one  
        const TokenOne = await ethers.getContractFactory("TokenOne");
        tokenOne = await TokenOne.deploy(1000000);
        
        await collateralConfig.deployed();
        await tokenOne.deployed();

        console.log("collateralConfig contract address:" + collateralConfig.address);
        console.log("tokenOne contract address:" + tokenOne.address);

      }
    
      before(async function () {
        await init();
      });
    
      // 
      it("test 0", async function () {
        // address[] calldata _collaterals,
        // uint256[] calldata _MCRs,
        // uint256[] calldata _CCRs 

        //  address array  
        let _collaterals = [tokenOne.address];
        let _MCRs = [100, 200, 300];
        let _CCRs = [1000, 2000, 3000];
        await collateralConfig.initialize(_collaterals, _MCRs, _CCRs);
        let allowedCollaterals = await collateralConfig.getAllowedCollaterals();
        console.log("allowedCollaterals:" + allowedCollaterals);  
      });



});
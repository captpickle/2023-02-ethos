const { expect } = require("chai");

// npx hardhat test ./test/0_twc_test.js 
describe("twcTest", function () {

    let collateralConfig;
     //update test
     
    async function init() {
        const [owner, otherAccount] = await ethers.getSigners();
        const CollateralConfig = await ethers.getContractFactory("CollateralConfig");
        collateralConfig = await CollateralConfig.deploy();
        await collateralConfig.deployed();
        console.log("collateralConfig contract address:" + collateralConfig.address);
      }
    
      before(async function () {
        await init();
      });
    
      // 
      it("test 0", async function () {
        // address[] calldata _collaterals,
        // uint256[] calldata _MCRs,
        // uint256[] calldata _CCRs 
        let _collaterals = ["0x0000", "0x0001", "0x0002"];
        let _MCRs = [100, 200, 300];
        let _CCRs = [1000, 2000, 3000];
        await collateralConfig.initialize(_collaterals, _MCRs, _CCRs);
        let allowedCollaterals = await collateralConfig.getAllowedCollaterals();
        console.log("allowedCollaterals:" + allowedCollaterals);  
      });



});
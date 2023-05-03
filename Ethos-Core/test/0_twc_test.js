const { expect } = require("chai");

// npx hardhat test ./test/0_twc_test.js 
describe("twcTest", function () {

    let collateralConfig;

    async function init() {
        const [owner, otherAccount] = await ethers.getSigners();
        const CollateralConfig = await ethers.getContractFactory("CollateralConfig");
        collateralConfig = await CollateralConfig.deploy();
        await collateralConfig.deployed();
        console.log("collateralConfig:" + collateralConfig.address);
      }
    
      before(async function () {
        await init();
      });
    
      // 
      it("test 0", async function () {
       
      });



});
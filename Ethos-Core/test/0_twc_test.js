const { expect } = require("chai");

// npx hardhat test ./test/0_twc_test.js 
describe("twcTest", function () {

    let collateralConfig;
    let tokenOne;

    async function init() {
        // CollateralConfig 
        const CollateralConfig = await ethers.getContractFactory("CollateralConfig");
        collateralConfig = await CollateralConfig.deploy();
        await collateralConfig.deployed();
        //  token one as Collateral token  
        const TokenOne = await ethers.getContractFactory("TokenOne");
        tokenOne = await TokenOne.deploy(1000000);
        await tokenOne.deployed();
        console.log("collateralConfig contract address:" + collateralConfig.address);
        console.log("tokenOne contract address:" + tokenOne.address);

        
        // checkContract(_collateralConfigAddress);
        // checkContract(_troveManagerAddress);
        // checkContract(_activePoolAddress);
        // checkContract(_defaultPoolAddress);
        // checkContract(_stabilityPoolAddress);
        // checkContract(_gasPoolAddress);
        // checkContract(_collSurplusPoolAddress);
        // checkContract(_priceFeedAddress);
        // checkContract(_sortedTrovesAddress);
        // checkContract(_lusdTokenAddress);
        // checkContract(_lqtyStakingAddress);
          
        const TroveManager = await ethers.getContractFactory("TroveManager");
        const troveManager = await TroveManager.deploy();
        console.log("troveManager contract address:" + troveManager.address);

        const ActivePool = await ethers.getContractFactory("ActivePool");
        const activePool = await ActivePool.deploy();
        console.log("activePool contract address:" + activePool.address);

        const DefaultPool = await ethers.getContractFactory("DefaultPool");
        const defaultPool = await DefaultPool.deploy();
        console.log("defaultPool contract address:" + defaultPool.address);


        const StabilityPool = await ethers.getContractFactory("StabilityPool");
        const stabilityPool = await StabilityPool.deploy();
        console.log("stabilityPool contract address:" + stabilityPool.address);

        const GasPool = await ethers.getContractFactory("GasPool");
        const gasPool = await GasPool.deploy();
        console.log("gasPool contract address:" + gasPool.address);

        const CollSurplusPool = await ethers.getContractFactory("CollSurplusPool");
        const collSurplusPool = await CollSurplusPool.deploy();
        console.log("collSurplusPool contract address:" + collSurplusPool.address);

        const PriceFeed = await ethers.getContractFactory("PriceFeed");
        const priceFeed = await PriceFeed.deploy();
        console.log("priceFeed contract address:" + priceFeed.address);


        const SortedTroves = await ethers.getContractFactory("SortedTroves");
        const sortedTroves = await SortedTroves.deploy();
        console.log("sortedTroves contract address:" + sortedTroves.address);
      

        const BorrowerOperations  = await ethers.getContractFactory("BorrowerOperations");
        const borrowerOperations = await BorrowerOperations.deploy();
        console.log("borrowerOperations contract address:" +borrowerOperations.address);

   
        const LUSDToken = await ethers.getContractFactory("LUSDToken");
        const lusdToken = await LUSDToken.deploy(troveManager.address, stabilityPool.address, borrowerOperations.address, tokenOne.address, tokenOne.address); 
        console.log("lusdToken contract address:" + lusdToken.address);

        const LQTYStaking = await ethers.getContractFactory("LQTYStaking");
        const lqtyStaking = await LQTYStaking.deploy();
        console.log("lqtyStaking contract address:" + lqtyStaking.address); 


        // address _lqtyTokenAddress,
        // address _lusdTokenAddress,
        // address _troveManagerAddress, 
        // address _borrowerOperationsAddress,
        // address _activePoolAddress,
        // address _collateralConfigAddress
        
        await lqtyStaking.setAddresses(tokenOne.address,lusdToken.address,troveManager.address,borrowerOperations.address,activePool.address,collateralConfig.address);

        await  tokenOne.approve(lqtyStaking.address,100000);
        await  lqtyStaking.stake(100000);
        // uint public totalLQTYStaked;
        let totalstaked =  await  lqtyStaking.totalLQTYStaked(); 
        console.log("totally staked :" +  totalstaked); 
        await  lqtyStaking.unstake(100000);  
        

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
        // console.log("allowedCollaterals:" + allowedCollaterals);     
      });



});
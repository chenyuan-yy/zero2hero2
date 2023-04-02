import { DeployFunction, ProxyOptions } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { readAddressList, storeAddressList } from "../scripts/helper";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log("Deploying My Contract with account:", deployer);

  const addressList = readAddressList();

  const proxyOptions: ProxyOptions = {
    proxyContract: "TransparentUpgradeableProxy",
    viaAdminContract: "ProxyAdmin",
    execute: {
      // 只在初始化时执行
      init: {
        // 执行initialize方法
        methodName: "initialize",
        // 参数
        args: [1],
      },
    },
  };

  const myPeanut = await deploy("Peanut", {
    contract: "Peanut",
    from: deployer,
    proxy: proxyOptions,
    args: [],
    log: true,
  });

  console.log("Proxy deployed to:", myPeanut.address);
  console.log("Implementation deployed to:", myPeanut.implementation);

  addressList[network.name].MyPeanut = myPeanut.address;
  storeAddressList(addressList);
};

// npx hardhat deploy --network {network} --tags {Tag}
func.tags = ["MyPeanut"];
export default func;
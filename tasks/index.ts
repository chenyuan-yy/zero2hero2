import { task, types } from "hardhat/config";
import { readAddressList } from "../scripts/helper";
import { Peanut__factory } from "../typechain-types";

task("getValue").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myPeanut = new Peanut__factory(dev).attach(
    addressList[network.name].MyPeanut
  );
  const value = await myPeanut.value();
  console.log("value: ", value.toString());
});

task("getVersion").setAction(async (_, hre) => {
  const { network } = hre;
  const [dev] = await hre.ethers.getSigners();
  const addressList = readAddressList();

  const myPeanut = new Peanut__factory(dev).attach(
    addressList[network.name].MyPeanut
  );
  const version = await myPeanut.VERSION();
  console.log("version: ", version.toString());
});

task("setValue")
  .addParam("value", "The value to set", undefined, types.int)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const myPeanut = new Peanut__factory(dev).attach(
      addressList[network.name].MyPeanut
    );
    const tx = await myPeanut.setValue(taskArgs.value);
    console.log("tx: ", await tx.wait());

    const currentValue = await myPeanut.value();
    console.log("currentValue: ", currentValue.toString());
  });

  task("setNum")
  .addParam("num", "The num to set", undefined, types.int)
  .setAction(async (taskArgs, hre) => {
    const { network } = hre;
    const [dev] = await hre.ethers.getSigners();
    const addressList = readAddressList();

    const myPeanut = new Peanut__factory(dev).attach(
      addressList[network.name].MyPeanut
    );
    const tx = await myPeanut.setNum(taskArgs.num);
    console.log("tx: ", await tx.wait());

    const currentNumber = await myPeanut.number();
    console.log("currentNumber: ", currentNumber.toString());
  });

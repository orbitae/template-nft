async function main() {
  const baseTokenURI = "ipfs://QmT4QKVQqo9ZbGdkrfnyrJb3NDb5XrEz9ULfLcyhpDJKyZ/";

  // Get owner/deployer's wallet address
  const [owner] = await hre.ethers.getSigners();

  // Get contract that we want to deploy
  const contractFactory = await hre.ethers.getContractFactory("OrbitaeNFT");

  // Deploy contract with the correct constructor arguments
  const contract = await contractFactory.deploy(baseTokenURI);

  // Wait for this transaction to be mined
  await contract.deployed();

  // Get contract address
  console.log("Contract deployed to:", contract.address);

  // Mint 2 NFTs
  txn = await contract.mintNFTs(1);
  await txn.wait();

  // Get all token IDs of the owner
  let tokens = await contract.tokensOfOwner(owner.address);
  console.log("Owner has tokens: ", tokens);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

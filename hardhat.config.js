/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle")

const ALCHEMY_API_KEY = "P-iowBJ48qzELivLxYIQrUGMwetJ9660";
const ROPSTEN_PRIVATE_KEY = "37d6d6c4790a30b25c8cae141596d6f5e48a1e8ce796663e8dc812c34a4ba55f";

module.exports = {
  solidity: "0.8.17",

  networks: {
    ropsten: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
    }
  }
};


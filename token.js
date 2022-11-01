// const { expect } = require("chai");
// const { ethers } = require("hardhat");



// describe("Token contract", function () {

//     it("Deployment should assign the total supply of the owner", async function () {

//         const [owner] = await ethers.getSigners();  // We can access the accounts and its balances through this getsigners.
//         console.log("Signers object:", owner);
//         const Token = await ethers.getContractFactory("Token");  // instance contract

//         const hardhatToken = await Token.deploy();  // Deploy Cotract

//         const ownerBalance = await hardhatToken.balanceOfAccount(owner.address);  // Checking the ba;ance of the owner and which is 100000
//         console.log("Owner Address:", owner.address);

//         expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);  //calling function totalSupply which is 100000 and it must be equal to ownerBalance.
//     });

//     it("Should transfer tokens between accounts", async function () {
//         const [owner, addr1, addr2] = await ethers.getSigners();

//         const Token = await ethers.getContractFactory("Token"); // Instance Contract

//         const hardhatToken = await Token.deploy();  // Deploy Contract

//         // Transfer 10 tokens from owner to addr1

//         await hardhatToken.transfer(addr1.address, 10);
//         expect(await hardhatToken.balanceOfAccount(addr1.address)).to.equal(10);

//         //await hardhat 5 tokens from addr1 to addr2

//         await hardhatToken.connect(addr1).transfer(addr2.address, 5)
//         expect(await hardhatToken.balanceOfAccount(add2.address)).to.equal(5);
//     });
// });


// Now the same code but in mpre proper and compact way:

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function () {
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })
        it("Should assign the total supply of tokens to the owner", async function () {
            const ownerBalance = await hardhatToken.balanceOfAccount(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function () {
        it("Should transfer tokens between accounts", async function () {
            // Transfer is done from owner's account to addr1.address
            await hardhatToken.transfer(addr1.address, 5);
            const addr1Balance = await hardhatToken.balanceOfAccount(addr1.address);
            expect(addr1Balance).to.equal(5);

            await hardhatToken.connect(addr1).transfer(addr2.address, 5);
            const addr2Balance = await hardhatToken.balanceOfAccount(addr2.address);
            expect(addr2Balance).to.equal(5);

        });

        it("Should fail if sender does not have eough tokens", async function () {
            const initialOwnerBalance = await hardhatToken.balanceOfAccount(owner.address);
            await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not Enough Tokens");

            expect(await hardhatToken.balanceOfAccount(owner.address)).to.equal(initialOwnerBalance);
        });

        it("Should update balance after transfers", async function () {
            const initialOwnerBalnce = await hardhatToken.balanceOfAccount(owner.address);
            await hardhatToken.transfer(addr1.address, 5);
            await hardhatToken.transfer(addr2.address, 10);
            const finalOwnerBalance = await hardhatToken.balanceOfAccount(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalnce - 15);

            const addr1Balance = await hardhatToken.balanceOfAccount(addr1.address);
            expect(addr1Balance).to.equal(5);

            const add2Balance = await hardhatToken.balanceOfAccount(addr2.address);
            expect(add2Balance).to.equal(10);

        });
    });

});




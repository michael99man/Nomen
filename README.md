# nomen
WINNER: *Decentralize everything: Best use of Ark blockchain challenge - Sponsored by ARK.io*

A decentralized digital authentication framework built on the Ethereum blockchain.

# What it does
nomen is your passport to Web 3.0. As the first Decentralized Authentication Service (DAS), nomen allows you to login to all your favorite websites with a click of a button both privately and securely. Using Ethereum smart contracts, nomen establishes and maintains a decentralized ledger of accounts using blockchain technology. This system has many benefits over conventional username/password systems.

* Private: No more 3rd party tracking. No more Cambridge Analytica. No more Big Brother. Through nomen, logging-in is a transaction between you, the website you are accessing, and no one else.

* Authenticated: All users are securely authenticated via the Ethereum blockchain. The only way for an attacker to spoof your account is to hijack your protected Ethereum wallet.

* Universal: One nomen, all of Web 3.0. Gone are the days of struggling to remember your passwords for dozens of different sites. With a click of a button, nomen grants you access to all of your favorite (supported) websites.

* Accessible: nomen was designed to be as easy to use as possible. Despite the behind-the-scenes complexity of blockchain authentication and integration, nomen's simple, streamlined interface makes the powerful technology accessible to everyone.

# Components
Our framework can be broken down into two major components: a backend served by a Solidity smart contract running on the Ethereum Virtual Machine, and a frontend that uses the web3 API to communicate with the blockchain.

The backend runs on the EVM, which means it is executed across the entire Ethereum blockchain. This accomplishes the goal of decentralization authentication we set forth in our vision. Meanwhile, the frontend can register users and securely log them in. Although creating a nomen requires an Ether (gas) fee to process, login calls with existing nomen will be free. Note that because using nomen requires interacting with the Ethereum blockchain, an Ethereum browser is required. The simplest choice for this is MetaMask, a Google Chrome extension that can handle all Ether functions.

An integral feature of nomen is its plug-and-play capability. We developed a PHP authentication plugin can connect to any existing web technology. Therefore, the leap from web 2.0 to 3.0 has never be easier. The plugin communicates with Infura, which acts as an Ethereum node to fetch information stored on-chain. The client, attempting to authenticate into an application, will sign a timestamp with MetaMask and submit it to the authentication server. The plugin will then verify the signature and grant (or deny) access. Security has never been simpler.

The website (temporarily hosted on michaelman.net/nomen), explains our vision, allows users to create a nomen, and also demonstrates a sample nomen login.

# Read more here: https://devpost.com/software/nomen-zc9m4d
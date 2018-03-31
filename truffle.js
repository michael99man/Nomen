module.exports = {
    networks: {
        development: {
          host: "localhost",
          port: 8545,
          network_id: "*" // match any network
        },
        rinkeby: {
            host: "localhost", // Connect to geth on the specified
            port: 8545,
            from: "0xc958D1c8E0C7eac1CA9edDeB2ca0d429f03283bb", // default address to use for any transaction Truffle makes during migrations
            network_id: "4",
            gas: 6712390 // Gas limit used for deploys
        }
  }
};

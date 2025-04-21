# Cryptographic Document Verifier.
- **Issuing verifiable digital documents.**
- **Verifying digital documents.**

## Build with.
- **[vite](https://vite.dev):** For fast javascript bundling. 
- **[Wagmi](https://wagmi.sh/react/getting-started):** Offers support for multiple wallet connections and chains (sepolia, mainnet, polygon...) and simplifies handling wallet connections and transactions with it's easy to use hooks with minimal setup. Important files include [wagmi config](./client/src/wagmi_config.js).
- **[redux toolkit](https://redux-toolkit.js.org/introduction/getting-started):** For state management. On top of state management *redux toolkit* also simplifies handling API requests to the server getting rid of the need to write multiple fetch requests, this keeps the code clean. Important files include [store.js](./client/src/store.js), [apiSlice.js](./client/src/slices/apiSlice.js). 


## Setup Guide.
### Don't have *pnpm*?
**Open a terminal and run the following command**
```
npm i -g pnpm
```

- Clone repository.
    ```
    git clone https://github.com/tenze21/Cryptographic_verifiable_document_issuer.git
    ```

- Get into client folder.
    ```
    <!-- From the root folder (Cryptographic_verifiable_document_issuer) -->

    cd client
    ```
- Install client dependencies.
    ```
    pnpm i
    ```
- Get into server folder.
    ```
    <!-- From root folder -->

    cd server
    ```
- Install server dependencies
    ```
    pnpm i
    ```
- Set up enviroment variables.

    **Create a *variables.env* folder in the server folder and include the following:**

    ```
    SESSION_SECRET= YOUR_SESSION_SECRET
    PORT= PORT_NO.
    NODE_ENV=development
    MONGO_URI= YOUR_MONGO_URI
    ENCRYPTION_KEY=32_CHARACTERS_ENCRYPTION_KEY
    ADMIN_ADDRESS=MARKSHEET_SIGNER'S_WALLET_ADDRESS
    SEPOLIA_RPC_URL=YOUR_SEPOLIA_RPC_URL
    CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
    ```
- Start server 
    ```
    pnpm run server
    ```
- Start Client
    ```
    <!-- open a new terminal and Get into the client folder -->

    pnpm run dev
    ```

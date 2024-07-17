## Environments
* rustc 1.79.0
* solana-cli 1.18.17
* node 20.14.0
* yarn 1.22.22
* anchor-cli 0.30.0

## Getting Started

First, install environment:

Guide from https://www.anchor-lang.com/docs/installation,

Next, set solana config:
```bash
solana config get

solana config set --url mainnet-beta

solana config set --keypair <your keypair address(ex: /root/.config/solana/id.json)>

solana config get
```

Next, build project:

```bash
anchor build
```

Next, deploy project:

```bash
anchor deploy
```

Finally, after deploy success, you will receive program id.

- Contract
Replace Anchor.toml/solucky to received id.
Replace programs/solucky/src/lib.rs/declare_id to received id.
```bash
anchor test
```

- FrontEnd
Open Solucky-Frontend/.env file.
Set NEXT_PUBLIC_MYPRO_ID to received id.
Rebuild the frontend project.

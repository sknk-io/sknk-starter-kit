type StarterConfig = {
  chainId: string;
  rpcUrl: string;
  gameAddress: string;
  defaultPair: string;
  defaultToken: string;
  tokenDecimals: string;
  wethAddress: string;
  roundType: string;
  defaultStake: string;
};

export function getStarterConfig(): StarterConfig {
  return {
    chainId: process.env.NEXT_PUBLIC_CHAIN_ID ?? "31337",
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL ?? "http://127.0.0.1:8545",
    gameAddress: process.env.NEXT_PUBLIC_GAME_ADDRESS ?? "0x0000000000000000000000000000000000000000",
    defaultPair: process.env.NEXT_PUBLIC_DEFAULT_PAIR ?? "0x0000000000000000000000000000000000000000",
    defaultToken: process.env.NEXT_PUBLIC_DEFAULT_TOKEN ?? "0x0000000000000000000000000000000000000000",
    tokenDecimals: process.env.NEXT_PUBLIC_DEFAULT_TOKEN_DECIMALS ?? "18",
    wethAddress: process.env.NEXT_PUBLIC_WETH_ADDRESS ?? "0x0000000000000000000000000000000000000000",
    roundType: process.env.NEXT_PUBLIC_GAME_ROUND_TYPE ?? "single",
    defaultStake: process.env.NEXT_PUBLIC_DEFAULT_STAKE ?? "1",
  };
}

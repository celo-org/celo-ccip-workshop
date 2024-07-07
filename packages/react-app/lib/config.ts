export const getTokenAddress = (tokenName: "cusd" | "link") => {
  switch (tokenName) {
    case "cusd":
      return "0x874069fa1eb16d44d622f2e0ca25eea172369bc1";
    case "link":
      return "0x32E08557B14FaD8908025619797221281D439071";
    default:
      throw new Error("Invalid token name");
  }
};

export const getSepoliaNftAddress = (): `0x${string}` => {
  return "0x5F7d03E873c2E2F544540A03c46dD34bC4A47436";
};

export const getAlfajoresSourceMinterAddress = (): `0x${string}` => {
  return "0xF11f9085D5d8AFB2e5de62466F6e82F379E74509";
};

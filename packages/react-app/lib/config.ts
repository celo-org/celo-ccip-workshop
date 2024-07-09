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
  return "0x4d7E731C036305eC0116Bc585C5091fc2f77E68c";
};

export const getAlfajoresSourceMinterAddress = (): `0x${string}` => {
  return "0xecC4EcFEfdd5cd3b752c9b7396ECdDf564c693C0";
};

export const receiverdDestinationMinterAddress = (): `0x${string}` => {
  return "0x6D5AdD4C3dA61A96569a1044571686c345468A25";
};

export const encodeTokenId = ({
  chainId,
  address,
}: {
  chainId: number;
  address: string;
}) => `${chainId}_${address}`;

export const decodeTokenId = (tokenId: string) => {
  const [chainId, address] = tokenId.split("_");
  return { chainId: +chainId, address };
};

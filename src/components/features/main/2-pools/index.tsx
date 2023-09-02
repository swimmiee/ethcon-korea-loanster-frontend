export const Pools = () => {
  const { selectedInvest, invests, setInvest } = usePools();
  return (
    <Selection
      selected={selectedInvest?.id || null}
      setSelected={(i) => setInvest(i)}
      items={invests}
      getId={(i) => i.id}
      cols={3}
      Item={PoolItem}
    />
  );
};

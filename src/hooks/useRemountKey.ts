import { useCallback, useState } from "react";

const getRandomNumber = (digits: number) => {
  return Math.ceil(Math.random() * 10 ** digits);
};

const useRemountKey = (
  digits: number
): { remountKey: number; regenerateRemountKey: () => void } => {
  const [remountKey, setRemountKey] = useState(getRandomNumber(digits));

  const regenerateRemountKey = useCallback(() => {
    setRemountKey(getRandomNumber(digits));
  }, [digits]);

  return { remountKey, regenerateRemountKey };
};
export default useRemountKey;

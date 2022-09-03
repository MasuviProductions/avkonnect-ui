import { useCallback, useState } from "react";
import { getRandomNumber } from "../utils/generic";

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

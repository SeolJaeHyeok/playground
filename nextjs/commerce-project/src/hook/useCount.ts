import { useState } from "react";

export const useCount = ({
  max,
  min,
}: {
  max?: number;
  min?: number;
} = {}) => {
  const [count, setCount] = useState(1);

  const onPlus = () => {
    setCount((prev) => {
      if (max && prev === max) return prev;
      return prev + 1;
    });
  };

  const onMinus = () => {
    setCount((prev) => {
      if (min && prev === min) return prev;
      if (prev === 1) return prev;
      return prev - 1;
    });
  };

  return {
    count,
    onPlus,
    onMinus,
  };
};

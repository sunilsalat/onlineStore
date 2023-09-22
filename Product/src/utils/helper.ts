export const retryFuncThrice = async (output: any) => {
  let n = 0;
  while (n < 3) {
    if (output) {
      break;
    } else {
      n++;
      continue;
    }
  }
};

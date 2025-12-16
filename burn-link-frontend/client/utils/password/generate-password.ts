export const generatePassword = (passLength: number = 20) => {
  let pass = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789?@-._~!$&+="; // url hash alowed chars
  for (let i = 0; i < passLength; i++) {
    pass += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return pass;
};

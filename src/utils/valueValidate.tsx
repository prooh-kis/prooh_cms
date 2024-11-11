export const isValidEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const isNumber = (value: any) => {
  var reg = /^\d+$/;
  return reg.test(value);
};

export const isValidUrl = (userInput: string) => {
  var res = userInput.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  if (res == null) return false;
  else return true;
};

export const convertNumberToIndianRs = (number: any) => {
  const value = Number(number);
  // console.log("convertNumberToIndianRs : ", number);
  if (value)
    return value.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      currency: "INR",
    });
  return value;
};

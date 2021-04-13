export const validateName = (name) => {
  if (name) {
    name = name.trim();
  }
  return name && name.length >= 3 && name.length <= 64 ? true : false;
};

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9]+[a-zA-Z0-9._\-]*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;
  const regexNoMatch = /.*(\.|@|_|\-){2,}.*/;
  return regex.test(email) && !regexNoMatch.test(email);
};

export const validateUsername = (username) => {
  const regex = /^[aA-zZ][.@\w]{2,50}$/;
  const regexNoMatch = /.*(\.|@|_){2,}.*/;
  return regex.test(username) && !regexNoMatch.test(username);
};

export const validatePhone = (phone) => {
  const regex = /^\d{7,13}$/;
  return regex.test(phone);
};

export const validateCompanyname = (companyname) => {
  return companyname && companyname.length >= 3 && companyname.length <= 60
    ? true
    : false;
};

export const validatePassword = (password) => {
  var isValid = password && password.length >= 8 && password.length <= 32;
  if (isValid) {
    const regexUpperCaseChar = /.*[A-Z]+.*/;
    const regexHasLowerCaseChar = /.*[a-z]+.*/;
    const regexHasNumericChar = /.*[0-9]+.*/;
    const regexHasSpChar = /.*[~`!@$%^&()_+=\-#\]*\[\\;:'",.\/<>?]+.*/;
    isValid =
      regexUpperCaseChar.test(password) &&
      regexHasLowerCaseChar.test(password) &&
      regexHasNumericChar.test(password) &&
      regexHasSpChar.test(password);
  }
  return isValid;
};
export const validateURL = (url) => {
  const regex = /^(https?):\/\/[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]/;
  return regex.test(url);
};

export const validateUniversityName = (name) => {
  return name && name.length >= 3 && name.length <= 64 ? true : false;
};

export const validateDegreeName = (name) => {
  return name && name.length >= 2 && name.length <= 64 ? true : false;
};

export const validateProjectTitle = (title) => {
  return title && title.length >= 5 && title.length <= 32 ? true : false;
};

export const validateProjectDesc = (desc) => {
  return desc && desc.length >= 10 && desc.length <= 1000 ? true : false;
};

export const validateAQTitle = (title) => {
  return title && title.length >= 5 && title.length <= 64 ? true : false;
};

export const validateCompanyName = (name) => {
  return name && name.length >= 3 && name.length <= 64 ? true : false;
};

export const validateDomain = (domain) => {
  return domain && domain.length >= 3 && domain.length <= 20 ? true : false;
};

export const validateAddress = (add) => {
  return add && add.length >= 5 && add.length <= 64 ? true : false;
};

export const validateRegNo = (no) => {
  return no && no.length >= 3 && no.length <= 20 ? true : false;
};

export const validateOwner = (name) => {
  return name && name.length >= 3 && name.length <= 64 ? true : false;
};

export const validatePostalCode = (code) => {
  return code.length === 5 || code.length === 6 ? true : false;
};

export const validateCompanyWeight = (wt) => {
  return wt >= 1 && wt <= 10 ? true : false;
};

export const validateInternalOrder = (internalOrder) => {
  if (internalOrder) {
    internalOrder = internalOrder.trim();
  }
  return internalOrder === undefined ||
    internalOrder.length === 0 ||
    (internalOrder.length > 2 && internalOrder.length < 33)
    ? true
    : false;
};

export const validateDepartment = (department) => {
  if (department) {
    department = department.trim();
  }
  return department && department.length > 2 && department.length < 33;
};

export const validateReferenceNumber = (referenceNumber) => {
  if (referenceNumber) {
    referenceNumber = referenceNumber.trim();
  }
  return (
    referenceNumber === undefined ||
    referenceNumber.length === 0 ||
    (referenceNumber.length > 2 && referenceNumber.length < 33)
  );
};

export const validateCostCenter = (costCenter) => {
  if (costCenter) {
    costCenter = costCenter.trim();
  }
  return (
    costCenter === undefined ||
    costCenter.length === 0 ||
    (costCenter.length > 2 && costCenter.length < 33)
  );
};

export const stripTags = (text) => {
  if (text) {
    return text.replace(/<(.|\n)*?>/g, "").replace(/  +/g, " ");
  }
  return text;
};

export const getDateAfterDays = (dayCount) => {
  return dayCount && dayCount > 0
    ? getDateAfterDaysFromDate(new Date().toISOString().split("T")[0], dayCount)
    : new Date().toISOString().split("T")[0];
};

export const getDateAfterDaysFromDate = (dateString, dayCount) => {
  if (dateString) {
    const dateMS = Date.parse(dateString);
    return new Date(dateMS + (dayCount ? dayCount * 24 * 60 * 60 * 1000 : 0))
      .toISOString()
      .split("T")[0];
  }
};

export const getDaysFromToday = (date) => {
  if (date) {
    return (
      (Date.parse(date) - Date.parse(new Date().toISOString().split("T")[0])) /
      1000 /
      60 /
      60 /
      24
    );
  }
  return date;
};

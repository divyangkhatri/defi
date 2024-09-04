function validateNumber(number) {
  const validNumber = Number(number);
  return isNaN(validNumber) ? null : validNumber;
}

module.exports = {
  validateNumber,
};

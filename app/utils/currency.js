/**
 * Convert a price from one currency to another
 *
 * @param {number} price
 * @param {str} fromCurrency  eg. "INR"
 * @param {str} toCurrency eg. "EUR"
 * @param {object} currencies with .currency_rates
 */
export const convertCurrency = (
  price,
  fromCurrency,
  toCurrency,
  currencies
) => {
  return (
    price /
    parseFloat(currencies.currency_rates[toCurrency].rates[fromCurrency])
  );
};

/**
 * Sort an array of tree projects with .treeCost and .currency
 *
 * @param {array} array of plant projects with .treeCost and .currency
 * @param {boolean} asc
 * @param {object} currencies with .currency_rates
 */
export const sortProjectsByPrice = (plantProjects, asc, currencies) => {
  let sorted = Array.from(plantProjects);

  if (
    currencies &&
    currencies.currency_rates &&
    currencies.currency_rates.EUR
  ) {
    if (asc) {
      sorted = sorted.sort(
        (a, b) =>
          convertCurrency(a.treeCost, a.currency, 'EUR', currencies) -
          convertCurrency(b.treeCost, b.currency, 'EUR', currencies)
      );
    } else {
      sorted = sorted.sort(
        (a, b) =>
          convertCurrency(b.treeCost, b.currency, 'EUR', currencies) -
          convertCurrency(a.treeCost, a.currency, 'EUR', currencies)
      );
    }
  }
  return sorted;
};

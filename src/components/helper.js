export const priceFormat = (val) => {
  if (val < 100000) {
    return Intl.NumberFormat().format(val);
  } else if (val > 99999 && val < 10000000) {
    const lakh_number = val / 100000;
    return (
      lakh_number.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }) + " Lac"
    );
  } else {
    const crore_number = val / 10000000;
    return (
        crore_number.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }) + " Crore"
    );
  }
};




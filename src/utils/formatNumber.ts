const formatNumber = (value: number, decimalLengths: { [key: string]: number } = {}) => {
  // Fungsi untuk membuat angka subscript Unicode
  const toSubscript = (num: number) => {
    const subscriptMap: { [key: string]: string } = {
      '2': '\u2082',
      '3': '\u2083',
      '4': '\u2084',
      '5': '\u2085',
      '6': '\u2086',
      '7': '\u2087',
      '8': '\u2088',
      '9': '\u2089',
    };

    return num
      .toString()
      .split('')
      .map((digit) => subscriptMap[digit])
      .join('');
  };

  // Fungsi untuk memformat angka
  const formatValue = (num: number, maxDecimalLength: number) => {
    const [integerPart, decimalPart] = num.toString().split('.');

    if (!decimalPart) {
      return num.toString();
    }

    if (Math.abs(num) >= 1) {
      maxDecimalLength = Math.min(maxDecimalLength, 5);
      return `${integerPart}.${decimalPart.slice(0, maxDecimalLength)}`;
    }

    const leadingZeros = decimalPart.match(/^0+/)?.[0]?.length || 0;
    const significantDecimals = decimalPart.slice(leadingZeros).slice(0, maxDecimalLength);

    return leadingZeros > 0
      ? `${integerPart}.0${toSubscript(leadingZeros)}${significantDecimals}`
      : `${integerPart}.${decimalPart.slice(0, maxDecimalLength)}`;
  };

  if (Math.abs(value) >= 1_000_000_000) {
    const maxDecimalLength = decimalLengths['B'] || 1;
    return `${formatValue(value / 1_000_000_000, maxDecimalLength)}B`;
  } else if (Math.abs(value) >= 1_000_000) {
    const maxDecimalLength = decimalLengths['M'] || 2;
    return `${formatValue(value / 1_000_000, maxDecimalLength)}M`;
  } else if (Math.abs(value) >= 1_000) {
    const maxDecimalLength = decimalLengths['K'] || 2;
    return `${formatValue(value / 1_000, maxDecimalLength)}K`;
  }

  const maxDecimalLength = decimalLengths['default'] || 3;
  return `${formatValue(value, maxDecimalLength)}`;
};

export default formatNumber;

import {isNullOrEmpty} from './Lang';

/**
 * @param strInput
 */
export function changeFixed(strInput: string) {
  try {
    if (strInput == null) {
      return strInput;
    }
    if (isNullOrEmpty(strInput)) {
      return '';
    }
    if (strInput.endsWith(',000000')) {
      return strInput.replace(',000000', '');
    }
    if (strInput.endsWith(',000000)')) {
      return strInput.replace(',000000', ')');
    }
    if (strInput.endsWith(',00000')) {
      return strInput.replace(',00000', '');
    }
    if (strInput.endsWith(',00000)')) {
      return strInput.replace(',00000', ')');
    }
    if (strInput.endsWith(',0000')) {
      return strInput.replace(',0000', '');
    }
    if (strInput.endsWith(',0000)')) {
      return strInput.replace(',0000', ')');
    }
    if (strInput.endsWith(',000')) {
      return strInput.replace(',000', '');
    }
    if (strInput.endsWith(',000)')) {
      return strInput.replace(',000', ')');
    }
    if (strInput.endsWith(',00')) {
      return strInput.replace(',00', '');
    }
    if (strInput.endsWith(',00)')) {
      return strInput.replace(',00', ')');
    }
    if (strInput.endsWith(',0')) {
      return strInput.replace(',0', '');
    }
    if (strInput.endsWith(',0)')) {
      return strInput.replace(',0', ')');
    }
    return strInput;
  } catch (e) {
    console.error(e);
  }
  return strInput;
}

export function convertFormatToNumber(stringNumberInput: any) {
  if (isNullOrEmpty(stringNumberInput)) {
    return stringNumberInput;
  }

  let stringNumber = stringNumberInput;

  stringNumber = stringNumber.replace('$', '');
  stringNumber = stringNumber.replace('%', '');
  try {
    if (isNullOrEmpty(stringNumber)) {
      return 0;
    }
    if (isNaN(stringNumber)) {
      if (typeof stringNumber !== 'string') {
        stringNumber = stringNumber.toString();
      }
      let stringNumberTemp = stringNumber.replace(/,/gi, '');
      if (isNaN(stringNumberTemp)) {
        // truong hop nay khi string duoc format thanh dang () se la so am nen se cong them dau -
        stringNumberTemp = stringNumberTemp.replace(/\(/gi, '');
        stringNumberTemp = stringNumberTemp.replace(/\)/gi, '');
        stringNumberTemp = '-' + stringNumberTemp;
        return parseFloat(stringNumberTemp);
      }
      return parseFloat(stringNumberTemp);
    }
    return parseFloat(stringNumber);
  } catch (e) {
    console.error(e);
  }
  return 0;
}

export function formatNumber(input: any, decimal?: number) {
  try {
    if (input == null) {
      return input;
    }
    if (input === '') {
      input = '0';
    }
    if (isNaN(input)) {
      return input;
    }
    if (typeof input === 'string') {
      input = convertFormatToNumber(input);
    }
    if (decimal == null) {
      if (input <= 2) {
        decimal = 3;
      } else {
        decimal = 2;
      }
    }
    if (typeof decimal !== 'undefined') {
      input = roundFloat(input, decimal);
    }
    input = input.toString().split('.');
    input[0] = input[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return changeFixed(input.join(','));
  } catch (ex) {
    console.error(ex);
  }
  return changeFixed(input);
}

export function formatNumberV2(input: any) {
  try {
    if (input == null) {
      return input;
    }
    if (input === '') {
      input = '0';
    }
    if (isNaN(input)) {
      return input;
    }
    if (typeof input === 'string') {
      input = convertFormatToNumber(input);
    }
    if (input >= 1000000) {
      const million = Math.round(input / 1000000);
      return million + ' triệu';
    }
    if (input > 1000) {
      const thousand = Math.round(input / 1000);
      return thousand + 'K';
    }
    return input;
  } catch (ex) {
    console.error(ex);
  }
  return changeFixed(input);
}

export function roundFloat(numberFloat: number, lenght: number) {
  try {
    if (numberFloat == null || lenght == null) {
      return 0;
    }
    let itenDivison: number = 1;
    for (let i = 0; i < lenght; i++) {
      itenDivison += 0;
    }
    const division = itenDivison;
    return (Math.round(numberFloat * division) / division).toFixed(lenght);
  } catch (e) {
    console.error(e);
  }
  return 0;
}

/**
 * Format numbers using single letter notation (1K, 1M, 1B, 1T...)
 * @param input
 * @returns {string}
 */
export function formatNumberInSingleLetterNotation(input: number): string {
  const suffix = ['', 'K', 'M', 'B', 'T', 'Q'];
  const index = Math.floor(Math.log(input) / Math.log(1000));

  if (input === 0 || input === null) {
    return '0';
  }

  return (
    (Math.floor((input / Math.pow(1000, index)) * 10) / 10).toString() +
    suffix[index]
  );
}

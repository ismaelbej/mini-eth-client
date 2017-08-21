import moment from 'moment';
import BigNumber from 'bignumber.js';

const HASH_LENGTH = 20;

export function formatTimestamp(timestamp) {
  return moment(new Date(timestamp * 1000)).format();
}

export function formatHash(hash, length = HASH_LENGTH) {
  return hash.length > length ? `${hash.substr(0, length - 2)}..` : hash;
}

export const formatAddress = formatHash;

export function formatAmount(amountParam) {
  let amount = new BigNumber(amountParam);
  const units = [
    'wei',
    'Kwei',
    'Mwei',
    'Gwei',
    'szabo',
    'finney',
  ];
  if (amount.isZero()) {
    return '0';
  }
  let i = 0;
  while (i < units.length) {
    if (amount.lt(1000)) {
      return `${amount.toString()} ${units[i]}`;
    }
    amount = amount.div(1000);
    i += 1;
  }
  return `${amount.toString()} ether`;
}

export default {
  formatAddress,
  formatAmount,
  formatHash,
  formatTimestamp,
};

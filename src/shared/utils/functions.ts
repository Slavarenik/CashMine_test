export function formatAmount(value: string, decimals: number): string {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    return value;
  }

  return parsed.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: Math.min(decimals, 8),
  });
}

export function formatUsd(available: string, usdPrice: string): string {
  const amount = Number(available);
  const price = Number(usdPrice);

  if (Number.isNaN(amount) || Number.isNaN(price)) {
    return '—';
  }

  return (amount * price).toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });
}

export function hasClaimableAvailable(available: string | null | undefined): boolean {
  if (available === null || available === undefined || available === '') {
    return false;
  }

  const amount = Number(available);
  return !Number.isNaN(amount) && amount > 0;
}

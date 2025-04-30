const locales = `vn-VN`
export function displayCurrency(value: number | undefined) {
  if (!value)
    return new Intl.NumberFormat(locales, {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(0)
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(value)
}

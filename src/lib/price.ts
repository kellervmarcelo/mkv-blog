const MIN_DISCOUNT_FOR_BADGE = 1;

export function getFormattedPrice(rawPrice: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
  }).format(rawPrice);
}

export function getPriceWithDiscount(rawPrice: number, discount: number) {
  const discountAmount = rawPrice * (discount / 100);
  return Math.round((rawPrice - discountAmount) * 100) / 100;
}

export function getDiscountBadge(discount: number) {
  return discount < MIN_DISCOUNT_FOR_BADGE ? null : Math.floor(discount);
}

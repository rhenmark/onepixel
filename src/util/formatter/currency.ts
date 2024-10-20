export const formattedNumber = (value: number) => new Intl.NumberFormat('en-US', { 
  style: 'currency', 
  currency: 'PHP' 
}).format(value);


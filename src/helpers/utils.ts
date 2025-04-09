export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };
  // @ts-ignore
  const formatted = date.toLocaleDateString('en-US', options);
  const [weekday, month, day, year] = formatted.replace(',', '').split(' ');
  return `${weekday} ${month} ${day} ${year}`;
};

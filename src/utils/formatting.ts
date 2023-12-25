export function formatArticleCreatedDate(date: string) {
  const d = new Date(date);
  const [day, year] = [d.getDate(), d.getFullYear()];

  return `${d.toLocaleString('en-US', { month: 'long' })} ${day}, ${year}`;
}

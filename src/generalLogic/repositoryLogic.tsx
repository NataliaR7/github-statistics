import {Mouth} from '../resources/constants'

export function sortReposData (source: any[]) {
    const result = source.slice();
    result.sort((a, b) => {
      const firstDate = new Date(a.pushed_at);
      const secondDate = new Date(b.pushed_at);
      if (firstDate.toLocaleDateString() === secondDate.toLocaleDateString()) {
        return +b.stargazers_count - +a.stargazers_count;
      }
      return +secondDate - +firstDate;
    });
    return result;
}

export function getStylizedDate(date: Date) {
  const today = new Date();
  const diffTime = today.getHours() - date.getHours();
  if(today.toLocaleDateString() === date.toLocaleDateString() && diffTime >= 0 && diffTime < 5) {
      return diffTime !== 0 ? `${diffTime} hour ago` : `${today.getMinutes() - date.getMinutes()} minutes ago`;
  }
  return `on ${date.getDate()} ${Mouth[date.getMonth()]} ${date.getFullYear()}`;
}


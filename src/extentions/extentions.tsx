import { Mouth } from '../resources/constants';

export function GetLablesAndValues(data: { [key: string]: number }) {
  let lables: string[] = []
  let values: number[] = []
  for (let lanuage in data) {
    lables.push(lanuage);
    values.push(data[lanuage])
  }
  return { lables, values };
}

export function cloneRepo(url: string, target: EventTarget & HTMLSpanElement, message: any) {
  navigator.clipboard.writeText(url)
    .then(() => {
      target.classList.add("hidden");
      message?.current?.classList.remove("hide");
      setTimeout(() => {
        target.classList.remove("hidden");
      }, 80);
      setTimeout(() => {
        message?.current?.classList.add("hide");
      }, 500);
    });
}

export function sortReposData(source: any[]) {
  const result = source.slice();
  const today = new Date().toLocaleDateString();
  result.sort((a, b) => {
    const firstDate = new Date(a.pushed_at);
    const secondDate = new Date(b.pushed_at);
    if (firstDate.toLocaleDateString() === secondDate.toLocaleDateString() && firstDate.toLocaleDateString() !== today) {
      return +b.stargazers_count - +a.stargazers_count;
    }
    return +secondDate - +firstDate;
  });
  return result;
}

export function getStylizedDate(date: Date) {
  const today = new Date();
  const diffTime = today.getHours() - date.getHours();
  if (today.toLocaleDateString() === date.toLocaleDateString() && diffTime >= 0 && diffTime < 5) {
    return diffTime !== 0 ? `${diffTime} hour ago` : `${today.getMinutes() - date.getMinutes()} minutes ago`;
  }
  return `on ${date.getDate()} ${Mouth[date.getMonth()]} ${date.getFullYear()}`;
}


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
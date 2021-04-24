

export function GetLablesAndValues(data: {[key: string]: number}) {
    let lables: string[] = []
    let values: number[] = []
    for (let lanuage in data) {
      lables.push(lanuage);
      values.push(data[lanuage])
    }
    return { lables, values };
  }

// export const a = 123
export const color = ["#6EF1AA", "#59BFF9", "#808CFF", "#C9EF78", "#FFCD82", "#9F2970", "#B3F959", "#FD94FF", "#B3ACFF"]
export const generalColor = ["#F9DE59", "#E8A628", "#F98365","#CDDA95","#A1DFFB","#575656"];

export function getRandomColor() {
    const colorIndex = Math.floor(Math.random() * color.length);
    console.log(colorIndex, "colorIndex");
    return color[colorIndex];
}

export function getRandomGeneralColor() {
    const colorIndex = Math.floor(Math.random() * generalColor.length);
    return generalColor[colorIndex];
}

export const graphColors1 = ["#B2D3E1", "#F2CFDA", "#C66AABB3", "#68417FB3", "#219BC3B3", "80575656", "#B3F959", "#FD94FF", "#B3ACFF"]
export const graphColors2 = ["#f9de59", "#f98365", "#E8A628", "#CDDA95", "#a1dffb", "#80575656"]
export const graphColors3 = ["#63a91f", "#c6dc93", "#b0d3bf", "#589d62","#1a512eB3", "#80575656"]
export const graphColors4 = ["#5fa55aB3", "#01b4bcB3", "#f6d51fB3", "#fa8925B3","#fa5457B3", "#80575656"]
export const graphColors = ["#008FFB", "#00E396", "#FEB019", "#FF4560","#775DD0", "#80575656"]
export const graphColors6 = ["#A1DFFB", "#CDDA95", "#F98365", "#E8A628","#F9DE59", "#80575656"]
export const graphColors7 = ["#FF0006B3", "#FFBF00B3", "#00FF11B3","#00FFE9B3", "#AD60FFB3", "#80575656"]
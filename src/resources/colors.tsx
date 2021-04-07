export const color = ["#9F2970", "#6EF1AA", "#B3F959", "#59BFF9", "#808CFF", "#FD94FF", "#C9EF78", "#B3ACFF", "#FFCD82"]
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
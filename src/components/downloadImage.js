export default function downloadImage(imgObjs) {
  for (const imgData of imgObjs) {
    let base64 = imgData.base64;
    var link = document.createElement("a");
    link.href = base64;
    link.download = imgData.description.split(" ")[0] + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

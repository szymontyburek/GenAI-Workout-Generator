export default function downloadImage(imgData) {
  let base64 = imgData.base64;
  var link = document.createElement("a");
  link.href = base64;
  link.download = imgData.description.split(" ")[0] + ".png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

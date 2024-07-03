export default function downloadImage(imgObjs) {
  for (const imgData of imgObjs) {
    let base64 = imgData.base64;
    var link = document.createElement("a");
    link.href = base64;

    let imgName = "";
    const descArr = imgData.description.split(" ");
    //taking at most first 3 elements from descArr array
    for (let i = 0; i < 3; i++) {
      try {
        const description = descArr[i];
        if (i == 0) imgName += description;
        else
          imgName += description.charAt(0).toUpperCase() + description.slice(1);
      } catch {
        break;
      }
    }

    link.download = imgName + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

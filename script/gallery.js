const images = [];

for (let i = 1; i <= 22; i++) {
  images[i-1] = "../img/gallery/gallery_(" + i + ").jpg";
}

for (image of images) {
  console.log(image);
}

let img = document.getElementById("images");
let elements = [];

// for (let i = 0; i < images.length; i++) {
// 	elements[i] = document.createElement("img");
// 	elements[i].src = images[i];
//   console.log("Elements " + i + elements[i]);
// 	img.appendChild(elements[i]);
// }

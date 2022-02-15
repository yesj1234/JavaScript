"use strict";
const modal = document.querySelector("#modal");
const btnOpenPopUp = document.querySelector(".btn-open-popup");
const body = document.querySelector("body");
const closeBtn = document.querySelector("#close");

const input = document.querySelector("input#custom-file");
const preview = document.querySelector(".preview");
const fileTypes = ["image/jpg", "image/jpeg", "image/png"];

const backgroundSubmitBtn = document.querySelector("button#submit");
const IMAGE_KEY = "image";
let customBackgroundList = [];

closeBtn.addEventListener("click", () => {
  modal.classList.toggle("show-modal");
});

btnOpenPopUp.addEventListener("click", () => {
  modal.classList.toggle("show-modal");
  if (modal.classList.contains("show-modal")) {
    body.style.overflow = "hidden";
  }
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.toggle("show-modal");
  }
  if (!modal.classList.contains("show-modal")) {
    body.style.overflow = "auto";
  }
});

window.addEventListener("click", (e) => {
  e.target === modal ? modal.classList.remove("show-modal") : false;
});

function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 104857) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048756).toFixed(1) + "MB";
  }
}

function updateImageDisplay() {
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }
  const curFiles = input.files;
  if (curFiles.length === 0) {
    const para = document.createElement("p");
    para.textContent = "No files currently selected to upload";
    preview.appendChild(para);
  } else {
    const list = document.createElement("ol");
    preview.appendChild(list);

    for (const file of curFiles) {
      const listItem = document.createElement("li");
      const span = document.createElement("span");
      if (validFileType(file)) {
        span.textContent = `File name:${file.name}, file size:${returnFileSize(
          file.size
        )}.`;
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        image.onload = function () {
          window.URL.revokeObjectURL(this.src);
        };
        listItem.appendChild(image);
        listItem.appendChild(span);
      } else {
        span.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(span);
      }
      list.appendChild(listItem);
    }
  }
}

function saveImages() {
  const files = input.files;
  function saveImage(file) {
    if (/\.(jpe?g|png)$/i.test(file.name)) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const newBackgroundImageObject = { url: reader.result };
        customBackgroundList.push(newBackgroundImageObject);
      });
      reader.readAsDataURL(file);
    }
  }
  if (files) {
    [].forEach.call(files, saveImage);
  }
  setTimeout(storeInSession, 2000);
}

function storeInSession() {
  try {
    localStorage.setItem(IMAGE_KEY, JSON.stringify(customBackgroundList));
  } catch (error) {
    alert(
      `${error} \nlocalStorage 용량이 부족합니다. 용량이 작은 사진으로 업로드 해주세요!`
    );
  }
}

function updateBackgroundImage(event) {
  event.preventDefault();

  const savedCustomBackgroundImages = JSON.parse(
    localStorage.getItem(IMAGE_KEY)
  );
  const length = savedCustomBackgroundImages.length;
  let crossFadeFigure1 = document.querySelector(
    ".crossfade > figure:nth-child(1)"
  );
  let crossFadeFigure2 = document.querySelector(
    ".crossfade > figure:nth-child(2)"
  );
  let crossFadeFigure3 = document.querySelector(
    ".crossfade > figure:nth-child(3)"
  );
  let crossFadeFigure4 = document.querySelector(
    ".crossfade > figure:nth-child(4)"
  );
  let crossFadeFigure5 = document.querySelector(
    ".crossfade > figure:nth-child(5)"
  );
  crossFadeFigure1.style.backgroundImage = `url(${
    savedCustomBackgroundImages[parseInt(Math.random() * length)].url
  })`;
  crossFadeFigure2.style.backgroundImage = `url(${
    savedCustomBackgroundImages[parseInt(Math.random() * length)].url
  })`;
  crossFadeFigure3.style.backgroundImage = `url(${
    savedCustomBackgroundImages[parseInt(Math.random() * length)].url
  })`;
  crossFadeFigure4.style.backgroundImage = `url(${
    savedCustomBackgroundImages[parseInt(Math.random() * length)].url
  })`;
  crossFadeFigure5.style.backgroundImage = `url(${
    savedCustomBackgroundImages[parseInt(Math.random() * length)].url
  })`;
}

input.addEventListener("change", saveImages);
input.addEventListener("change", updateImageDisplay);
backgroundSubmitBtn.addEventListener("click", updateBackgroundImage);

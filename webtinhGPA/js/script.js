var inputSTCTichLuy = document.getElementById("stcTichLuy");
var inputGPATichLuy = document.getElementById("gpaTichLuy");
var inputSTCYeuCau = document.getElementById("stcYeuCau");
var inputGPAMongMuon = document.getElementById("gpaMongMuon");
var input4HCT = document.getElementById("soMon4ChiHCT");
var input3HCT = document.getElementById("soMon3ChiHCT");
var input2HCT = document.getElementById("soMon2ChiHCT");

var chuaDien = document.querySelector(".chua-dien");
var ketQua = document.querySelector(".ket-qua");
var kiemTraButton = document.getElementById("kiemTraButton");

kiemTraButton.addEventListener("click", calculateGPA);

function calculateGPA() {
  var stcTichLuy = parseFloat(inputSTCTichLuy.value);
  var gpaTichLuy = parseFloat(inputGPATichLuy.value);
  var stcYeuCau = parseFloat(inputSTCYeuCau.value);
  var gpaMongMuon = parseFloat(inputGPAMongMuon.value);
  var soMon4HTC = input4HCT.value == "" ? 0 : parseInt(input4HCT.value);
  var soMon3HTC = input3HCT.value == "" ? 0 : parseInt(input3HCT.value);
  var soMon2HTC = input2HCT.value == "" ? 0 : parseInt(input2HCT.value);

  if (isNaN(stcTichLuy) || stcTichLuy <= 0 || !Number.isInteger(stcTichLuy)) {
    ketQua.innerHTML = "Vui lòng nhập đúng thông tin cho số tín chỉ tích lũy là một số nguyên dương";
    inputSTCTichLuy.focus();
    inputSTCTichLuy.value = "";
    return;
  }
  if (isNaN(gpaTichLuy) || gpaTichLuy < 0.0 || gpaTichLuy > 4.0) {
    ketQua.innerHTML = "Xem lại GPA tích lũy";
    inputGPATichLuy.focus(); 
    inputGPATichLuy.value = "";
    return;
  }

  if (isNaN(stcYeuCau) || stcYeuCau <= 0 || !Number.isInteger(stcYeuCau)) {
    ketQua.innerHTML = "Vui lòng nhập đúng thông tin cho số tín chỉ yêu cầu";
    inputSTCYeuCau.focus();
    inputSTCYeuCau.value = "";
    return;
  }

  if (stcTichLuy >= stcYeuCau + 5) {
    ketQua.innerHTML = "Số tín chỉ tích lũy và số tín chỉ yêu cầu chênh lệch nhau quá lớn";
    inputSTCTichLuy.focus();
    inputSTCTichLuy.value = "";
    inputSTCYeuCau.focus();
    inputSTCYeuCau.value = "";
    return;
  } 
  if (isNaN(gpaMongMuon) || gpaMongMuon < 0.0 || gpaMongMuon > 4.0) {
    ketQua.innerHTML = "Xem lại GPA mong muốn";
    inputGPAMongMuon.focus();
    inputGPAMongMuon.value = "";
    return;
  }

  if (soMon4HTC < 0) {
    ketQua.innerHTML = "Số môn học cải thiện 4 tín chỉ phải là số dương";
    input4HCT.focus();
    input4HCT.value = "";
    return;
  }

  if (soMon3HTC < 0) {
    ketQua.innerHTML = "Số môn học cải thiện 3 tín chỉ phải là số dương";
    input3HCT.focus();
    input3HCT.value = "";
    return;
  }

  if (soMon2HTC < 0) {
    ketQua.innerHTML = "Số môn học cải thiện 2 tín chỉ phải là số dương";
    input2HCT.focus();
    input2HCT.value = "";
    return;
  }  

if (soMon4HTC > 0) {
  var formSelect = input4HCT.nextElementSibling;
  gpaTichLuy =
    (gpaTichLuy * stcTichLuy + soMon4HTC * 4 * formSelect.value) /
    stcTichLuy;
}
if (soMon3HTC > 0) {
  var formSelect = input3HCT.nextElementSibling;
  gpaTichLuy =
    (gpaTichLuy * stcTichLuy + soMon3HTC * 3 * formSelect.value) /
    stcTichLuy;
}
if (soMon2HTC > 0) {
  var formSelect = input2HCT.nextElementSibling;
  gpaTichLuy =
    (gpaTichLuy * stcTichLuy + soMon2HTC * 2 * formSelect.value) /
    stcTichLuy;
}

var stcConLai = stcYeuCau - stcTichLuy;
ketQua.innerHTML = "Bạn cần đạt ít nhất ";
var span1 = document.createElement("span");
var span2 = document.createElement("span");
span1.className = "fw-bolder";
span2.className = "fw-bolder";

var a = Math.ceil(gpaMongMuon * stcYeuCau - gpaTichLuy * stcTichLuy - 3 * stcConLai);
if (a < 0) {
  var b = Math.ceil(gpaMongMuon * stcYeuCau - gpaTichLuy * stcTichLuy - 2 * stcConLai);
  if (b < 0) {
    var c = Math.ceil(gpaMongMuon * stcYeuCau - gpaTichLuy * stcTichLuy - 1 * stcConLai);
    if (c < 0) {
      var d = Math.ceil(gpaMongMuon * stcYeuCau - gpaTichLuy * stcTichLuy - 0 * stcConLai);
      if (d < 0) {
        ketQua.innerHTML = "Ăn chơi thôi có rớt hết cũng đạt yêu cầu :))";
      } else {
        var f = stcConLai - d;
        span1.innerHTML = d + " tín chỉ D và ";
        span2.innerHTML = "rớt " + f + " tín chỉ để được " + gpaMongMuon;
      }
    } else {
      var d = stcConLai - c;
      span1.innerHTML = c + " tín chỉ C và ";
      span2.innerHTML = d + " tín chỉ D để được " + gpaMongMuon;
    }
  } else {
    var c = stcConLai - b;
    span1.innerHTML = b + " tín chỉ B và ";
    span2.innerHTML = c + " tín chỉ C để được " + gpaMongMuon;
  }
} else {
  var b = stcConLai - a;
  if (b >= 0) {
    span1.innerHTML = a + " tín chỉ A và ";
    span2.innerHTML = b + " tín chỉ B để được " + gpaMongMuon;
  } else {
    var rs = (stcTichLuy * gpaTichLuy + stcConLai * 4) / stcYeuCau;
    ketQua.innerHTML = "Thôi xong, kiếp này coi như bỏ.</br> được A hết " + stcConLai + " tín chỉ còn lại thì cũng chỉ đạt " + rs;
    return;
  }
}
ketQua.appendChild(span1);
ketQua.appendChild(span2);
}

var resetButton = document.getElementById("resetButton");
  resetButton.addEventListener("click", function () {
    reset();
  });

  function reset() {
    inputSTCTichLuy.value = "";
    inputGPATichLuy.value = "";
    inputSTCYeuCau.value = "";
    inputGPAMongMuon.value = "";
    input4HCT.value = "";
    input3HCT.value = "";
    input2HCT.value = "";

    ketQua.innerHTML = "";
  }

//backtotop
var backToTop = document.getElementById("backToTopBtn");
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
}

backToTop.onclick = function () {
  window.scrollTo({
      top: 0,
      behavior: 'smooth'
  });
};


//chuyển đổi ngôn ngữ
// let lang = 'vi';

// async function translateText(text, sourceLang, targetLang) {
//   let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(text)}`;
//   let response = await fetch(url);
//   if (response.ok) {
//       let data = await response.json();
//       // Kiểm tra xem dữ liệu có đúng định dạng không
//       if (Array.isArray(data) && data[0] && Array.isArray(data[0]) && data[0][0] && typeof data[0][0][0] === 'string') {
//           return data[0][0][0];
//       } else {
//           console.log("Unexpected data format: ", data);
//       }
//   } else {
//       console.log("HTTP-Error: " + response.status);
//   }
// }

// async function translatePage(sourceLang, targetLang) {
//     let elementsToTranslate = document.querySelectorAll('.translate');
//     let promises = [];
//     for (let elem of elementsToTranslate) {
//         if (elem.placeholder) { 
//             promises.push(translateText(elem.placeholder, sourceLang, targetLang));
//         } else {
//             promises.push(translateText(elem.textContent, sourceLang, targetLang));
//         }
//     }
//     let results = await Promise.all(promises);
//     for (let i = 0; i < elementsToTranslate.length; i++) {
//         if (elementsToTranslate[i].placeholder) {
//             elementsToTranslate[i].placeholder = results[i];
//         } else {
//             elementsToTranslate[i].textContent = results[i];
//         }
//     }
// }


// document.getElementById('langSelect').addEventListener('change', async (e) => {
//     let newLang = e.target.value;
//     await translatePage(lang, newLang);
//     lang = newLang;
// });

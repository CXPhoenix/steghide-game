import "./index.css";

function windowModal(
  status = true,
  { title, body, checkBtnContent, cancelBtnContent, haveCancel, checkBtnAction }
) {
  const modal = document.querySelector("#modal");
  if (!status) {
    modal.classList.add("hidden");
    return;
  }
  modal.classList.remove("hidden");
  const modalTitle = document.querySelector("#modalTitle");
  const modalBody = document.querySelector("#modalBody");
  const modalCheckBtn = document.querySelector("#modalCheckBtn");
  const modalCancelBtn = document.querySelector("#modalCancelBtn");
  if (!haveCancel) {
    modalCancelBtn.classList.add("hidden");
  }
  modalTitle.innerText = title;
  modalBody.innerText = body;
  modalCheckBtn.innerText = checkBtnContent;
  modalCancelBtn.innerText = cancelBtnContent;

  if (!checkBtnAction) {
    modalCheckBtn.addEventListener("click", function () {
      modal.classList.add("hidden");
    });
    return;
  }
  modalCheckBtn.addEventListener("click", checkBtnAction);
}

async function getAnswer(uri) {
  let res = await fetch(uri);
  return await res.json();
}

function success(successURL) {
    const a = document.createElement('a');
    a.href = successURL;
    a.click();
}

const passInput = document.querySelector("#pass");
const submitBtn = document.querySelector("#pwdSubmit");
const loading = document.querySelector('#loading')
const baseURI =
  "https://script.google.com/macros/s/AKfycbxTsEZsnAzYlLkeoeK93cHBwN7_BXexS0kNSbWOKK4UrW34mWh_Ui7qIk5rRdYFNfmJMA/exec";
submitBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const warningImg = document.querySelector("#warning-img");
  if (passInput.value === "") {
    warningImg.classList.remove("hidden");
    const emptyWarning = {
      title: "這個地方必填",
      body: "這邊很重要，一定要填寫喔!",
      checkBtnContent: "確認",
    };
    windowModal(true, emptyWarning);
    return;
  }
  loading.classList.remove('hidden');
  const value = `?pwd=${passInput.value}`;
  const result = await getAnswer(baseURI + value);
  const resultAlert = result.isCorrect ? {
      title: "恭喜你答對了！",
      body: `你答對真是太好了！`,
      checkBtnContent: "立即前往填寫組員名單",
      checkBtnAction: function() {success(result.successURL)}
  } : {
      title: "喔喔，答錯了...",
      body: "你答錯囉...再試試看吧！不要放過任何線索喔！",
      checkBtnContent: "再試試看！"
  };
  windowModal(true, resultAlert);
  loading.classList.add('hidden');
});

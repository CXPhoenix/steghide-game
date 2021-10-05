import './index.css'

function windowModal(status=true, {title, body, checkBtnContent, cancelBtnContent, haveCancel, checkBtnAction}) {
    const modal = document.querySelector('#modal');
    if (!status) {
        modal.classList.add('hidden');
        return;
    }
    modal.classList.remove('hidden');
    const modalTitle = document.querySelector('#modalTitle');
    const modalBody = document.querySelector('#modalBody');
    const modalCheckBtn = document.querySelector('#modalCheckBtn');
    const modalCancelBtn = document.querySelector('#modalCancelBtn');
    if (!haveCancel) {
        modalCancelBtn.classList.add('hidden');
    }
    modalTitle.innerText = title;
    modalBody.innerText = body;
    modalCheckBtn.innerText = checkBtnContent;
    modalCancelBtn.innerText = cancelBtnContent;

    modalCheckBtn.addEventListener('click', checkBtnAction);
}

const passInput = document.querySelector('#pass');

const submitBtn = document.querySelector('#pwdSubmit');
submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    const warningImg = document.querySelector('#warning-img');
    if (passInput.value === "") {
        warningImg.classList.remove('hidden');
        windowModal(true, {title: 'testing', body: 'test', checkBtnContent: '確認', cancelBtnContent: '取消', haveCancel: true})
        return;
    }
})
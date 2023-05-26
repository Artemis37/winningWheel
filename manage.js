const textArea = document.getElementById('whitelist');
const btnSave = document.getElementById('save');
const btnReturn = document.getElementById('return');

const saveWhitelist = () => {
    let tempWhiteList = textArea.value;
    const regex = /\n{2,}/g;
    tempWhiteList = tempWhiteList.replaceAll(regex, "\n");
    //convert value to array
    const whitelist = tempWhiteList.split('\n');
    //save to local storage
    localStorage.setItem('whitelist', JSON.stringify(whitelist));
    //notify user
    btnSave.textContent = 'Saved!';
    setTimeout(() => {
        btnSave.textContent = 'Save';
    }, 1000);
};

btnReturn.addEventListener('click', () => {
    window.location.href = '/';
});

btnSave.addEventListener('click', () => {
    saveWhitelist();
});

const whitelist = JSON.parse(localStorage.getItem("whitelist"));
textArea.value = whitelist.join('\n');
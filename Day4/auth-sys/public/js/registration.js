window.onload = () => {
  const registrationForm = getElement('registration');

  if (registrationForm != undefined) {
    registrationForm.addEventListener('submit', Registration);
  }
};

const getElement = id => document.getElementById(id);

const Registration = e => {
  e.preventDefault();

  const message = getElement('message');
  const fullName = getElement('name');
  const Email = getElement('email');
  const tel = getElement('phone');
  const password = getElement('password');
  const repassword = getElement('repassword');

  if (!password.value && !repassword.value) {
    message.innerHTML = 'the password and re-password Required';
    showMessage(message, '');
    return;
  }

  if (password.value !== repassword.value) {
    message.innerHTML = 'the password not match , please re Enter password';
    password.innerHTML = null;
    repassword.innerHTML = null;
    showMessage(message);
    return;
  }

  hiddenMessage(message);
  const data = {
    name: fullName.value,
    email: Email.value,
    phone: tel.value,
    password: password.value,
    repassword: repassword.value
  };
  fetch('/api/user/registration', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === 200) {
        alert(data.messag);
        window.location.replace('/me');
      } else {
        message.innerHTML = data.messag;
        password.innerHTML = null;
        repassword.innerHTML = null;
        showMessage(message);
        return;
      }
    })
    .catch(err => {
      alert('Sorry Error happened , try again later');
      console.log(err);
    });
};

const showMessage = item => {
  if (!item) return;

  if (item.classList.contains('hidden') && !item.classList.contains('show')) {
    item.classList.remove('hidden');
    item.classList.add('show');
  }
};

const hiddenMessage = item => {
  if (item.classList.contains('show') && !item.classList.contains('hidden')) {
    item.classList.remove('show');
    item.classList.add('hidden');
  }
};

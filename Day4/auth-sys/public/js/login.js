const login = (e) => {
  e.preventDefault();
  const message = getElement('message');

  const email = getElement('email').value;
  const password = getElement('password').value;

  if (!email || !password) {
    message.innerHTML = 'the email and password Required';
    showMessage(message);
    return;
  }

  hiddenMessage(message);
  const obj = {
    email,
    password,
  };

  fetch('/auth/user/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        alert(data.messag);
        window.location.replace('/me');
      } else {
        message.innerHTML = data.messag;
        showMessage(message);
      }
    })
    .catch((err) => {
      alert('Sorry Error happened , try again later');
      console.log(err);
    });
};

window.onload = () => {
  const loginForm = getElement('login');

  if (loginForm) {
    loginForm.addEventListener('submit', login);
  }
};

// /api/user/userProfile

fetch('/api/user/userProfile')
  .then((res) => res.json())
  .then((result) => {
    if (result.satus === 401) {
      alert(result.messag);
      window.location.replace('/');
      return;
    }

    const userData = getElement('user-data');
    if (!userData) {
      alert('Sorry Some Error Happened');
      window.location.replace('/');
      return;
    }
    const { data } = result;
    userData.innerHTML = null;
    userData.innerHTML = `<ul>
                            <li><h1>name : ${data.name}  </h1></li>
                            <li><h1>email: ${data.email} </h1></li>
                            <li><h1>phone: ${data.phone} </h1></li>
                          </ul>`;
  })
  .catch((err) => {
    alert('Sorry Error happened , try again later');
    console.log(err);
  });

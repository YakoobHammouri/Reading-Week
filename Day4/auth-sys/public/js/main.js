const getElement = (id) => document.getElementById(id);

const showMessage = (item) => {
  if (!item) return;

  if (item.classList.contains('hidden') && !item.classList.contains('show')) {
    item.classList.remove('hidden');
    item.classList.add('show');
  }
};

const hiddenMessage = (item) => {
  if (item.classList.contains('show') && !item.classList.contains('hidden')) {
    item.classList.remove('show');
    item.classList.add('hidden');
  }
};

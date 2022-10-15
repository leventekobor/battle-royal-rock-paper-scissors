const button = document.getElementById('addUserNameButton')
button.addEventListener(
  "click",
  function(e) {
    e.preventDefault();
    console.log(window.location);
  },
  false
);

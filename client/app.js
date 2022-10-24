const button = document.getElementById('addUserNameButton')
const userNameInput = document.getElementById("userName")
button.addEventListener(
  "click",
  function(e) {
    e.preventDefault();
    if (window.localStorage.getItem("username") && confirm("sure?")) {
      window.localStorage.setItem("username", userNameInput.value);
    }
    location.href = "./game.html";
  },
  false
);

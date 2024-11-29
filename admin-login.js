document.getElementById("admin-login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "12345") {
        alert("ورود موفق!");
        window.location.href = "admin-panel.html";
    } else {
        document.getElementById("error-message").style.display = "block";
    }
});

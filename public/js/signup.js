// 회원가입 정보를 서버로 전송
async function signup(event) {
  event.preventDefault();
  try {
    // req.preventDefault();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const signUp = {
      email,
      name,
      password,
      confirmPassword,
    };

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUp),
    });
    const data = await response.json();
    console.log("data", data);

    if (!data.errorMessage) {
      alert(data.message);
      location.href = "/signIn.html";
    }
    alert(data.errorMessage);
  } catch (error) {
    console.log(error);
  }
}
const signupBtn = document.getElementById("signupSubmitButton");
signupBtn.addEventListener("click", signup);

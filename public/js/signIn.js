// 로그인
async function signIn(event) {
  event.preventDefault();
  try {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const signIn = {
      email,
      password,
    };

    const response = await fetch("/api/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signIn),
    });

    const data = await response.json();
    console.log("data", data);

    if (!data.errorMessage) {
      alert(data.message);
      location.href = "/index.html"; // 페이지 리다이렉션
    } else {
      alert(data.errorMessage);
    }
  } catch (error) {
    console.log(error);
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const signInBtn = document.getElementById("signInSubmitButton");
  signInBtn.addEventListener("click", signIn);
});

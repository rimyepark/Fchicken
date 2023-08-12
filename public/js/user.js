async function editpassword(event) {
  event.preventDefault();
  try {
    const currentPassword = document.getElementById("currentPassword").value;
    const editPassword = document.getElementById("editPassword").value;

    const editpasswordData = {
      currentPassword,
      editPassword,
    };

    const response = await fetch("/api/editpassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editpasswordData),
    });

    const data = await response.json();
    console.log("data", data);

    if (!data.errorMessage) {
      alert(data.message);
      window.location.href = "/signIn.html";
    } else {
      alert(data.errorMessage);
    }
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const changePasswordBtn = document.getElementById("userSubmitButton");
  changePasswordBtn.addEventListener("click", editpassword);
});

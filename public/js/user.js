async function getUserByUserId(event) {
  event.preventDefault();
  try {
    const currentPassword = document.getElementById("currentPassword").value;
    const editPassword = document.getElementById("editPassword").value;

    const passwordChangeData = {
      currentPassword,
      editPassword,
    };

    const response = await fetch("/api/getUserByUserId", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(passwordChangeData),
    });

    const data = await response.json();

    if (!data.errorMessage) {
      alert(data.message);
      location.href = "/signIn.html";
    } else {
      alert(data.errorMessage);
    }
  } catch (error) {
    console.log(error);
  }
}

const changePasswordBtn = document.getElementById("userSubmitButton");
changePasswordBtn.addEventListener("click", getUserByUserId);

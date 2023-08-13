// 로그인
async function createBoard(event) {
    event.preventDefault();
    try {
      const title = document.getElementById("title").value;
      const content = document.getElementById("content").value;
      const colors = document.getElementById("color").value;
      const color = colors.replace("#", "");

      console.log(color)

      const newdata = JSON.stringify({
          title, content, color
      });
  
      const response = await fetch("/api/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: newdata,
      });
  
      const data = await response.json();
      console.log("data", data);
  
      if (!data.errorMessage) {
        alert(data.message);
        location.href = "/createBoard.html"; // 페이지 리다이렉션
      } else {
        alert(data.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    const createBoardBtn = document.getElementById("createBoardSubmitButton");
    createBoardBtn.addEventListener("click", createBoard);
  });
  
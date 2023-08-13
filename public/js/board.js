document.getElementById("createBoardSubmitButton").addEventListener("click", async function () {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const color = document.getElementById("color").value;
  console.log(color)
  const newdata = JSON.stringify({
    title, content, color
  });

  console.log(newdata);

  try {
    const response = await fetch(`/api/boards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newdata,
    });

    if (response.ok) {
      // 칼럼 생성 성공
      // 팝업 창으로 완료 메시지 전송
      window.opener.postMessage("boardCreated", "*");
      window.close();
    } else {
      // 칼럼 생성 실패
      alert("칼럼 생성에 실패했습니다.");
    }
  } catch (error) {
    console.error("칼럼 생성 중 오류가 발생했습니다.", error);
    alert("칼럼 생성 중 오류가 발생했습니다.");
  }


window.addEventListener("DOMContentLoaded", async function () {
  try {
    const response = await fetch("/api/boards"
    ,{method: "GET",}
    ); 
    const {board} = await response.json();
    const boardData = board.data; // 가져온 보드 데이터
    console.log(board)
    
    const boardsList = document.getElementById("Boards");

    if (boardsList) {
      for (const board of boardData) {
        const title = board.title;
        const boardId = board.BoardId; // 가져온 보드의 고유 ID
        
        const temp_html = `
        <a class="btn btn-primary" id="${boardId}" href="#" role="button">${title}</a>`
        boardsList.innerHTML += temp_html;

        boardButton.addEventListener("click", function () {
          loadBoard(boardId);
        });

        boardsList.appendChild(boardButton);
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

function loadBoard(boardId) {
  // 컬럼를 불러오는 코드
  // 선택한 보드의 ID를 사용하여 보드를 불러오는 API 호출 등을 수행
  // 불러온 보드 데이터를 사용하여 해당 보드의 칼럼과 카드 등을 동적으로 생성하는 로직을 작성
}

});
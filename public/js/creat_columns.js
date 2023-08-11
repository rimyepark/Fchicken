document.getElementById("CreateColumn").addEventListener("click", async function () {
  const boardId = document.getElementById("boardId").value;
  const columnName = document.getElementById("columnName").value;
  const columnIndex = document.getElementById("columnIndex").value;

  const newdata = JSON.stringify({
    boardId,
    columnName,
    columnIndex,
  });

  console.log(newdata);

  try {
    const response = await fetch(`/api/boards/${boardId}/columns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newdata,
    });

    if (response.ok) {
      // 칼럼 생성 성공
      // 팝업 창으로 완료 메시지 전송
      window.opener.postMessage("columnCreated", "*");
      window.close();
    } else {
      // 칼럼 생성 실패
      alert("칼럼 생성에 실패했습니다.");
    }
  } catch (error) {
    console.error("칼럼 생성 중 오류가 발생했습니다.", error);
    alert("칼럼 생성 중 오류가 발생했습니다.");
  }
});

window.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("/api/columns");
        const dataResponse = await response.json();
        const data = dataResponse.data; // 주어진 데이터에서 배열 추출

        const columnsList = document.getElementById("Columns");

        if (columnsList) {
            for (const column of data) {
                const columnName = column.columnName;

                const temp_html = `
                    <li>
                    <div class="column">
                    <div class="column-header">
                      <input type="text" class="column-name-input" id="Columns" value="${columnName}"/>
                      <button class="edit-column-btn" id="updateColumnName" value= "updateColumnName">수정</button>
                    </div>
                    <button class="add-card-btn">Add Card</button>
                    <div class="card">Card 1</div>
                    <div class="card">Card 2</div>
                  </div>
                    </li>
                `;

                columnsList.innerHTML += temp_html;
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        console.log(error);
    }

    document
    .getElementById("updateColumnName")
    .addEventListener("click", async function () {
      // 컬럼 아이디를 생성하는 로직 추가
      const columnNameInput = document.getElementById("Columns");
      const ColumnId = generateColumnId(columnNameInput.value);
  
      const ColumnNames = columnNameInput.value;
      const newdata = JSON.stringify({
        ColumnNames,
      });
  
      console.log(newdata);
  
      fetch(`/api/columns/${ColumnId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: newdata,
      })
        .then(response => {
          if (response.ok) {
            // 칼럼 이름 수정 성공
            // 팝업 창으로 칼럼 수정 완료 메시지 전송
            window.opener.postMessage("칼럼 이름", "*");
            window.close();
          } else {
            // 칼럼 이름 수정 실패
            alert("칼럼 이름 수정에 실패했습니다.");
          }
        })
        .catch(error => {
          console.error("칼럼 이름 수정 중 오류가 발생했습니다.", error);
          alert("칼럼 이름 수정 중 오류가 발생했습니다.");
        });
  });
  
  function generateColumnId(columnName) {
    // 실제로는 더 복잡한 로직으로 컬럼 아이디를 생성해야 할 수도 있습니다.
    // 이 예시에서는 간단하게 columnName을 이용하여 해시값을 생성합니다.
    let hash = 0;
    for (let i = 0; i < columnName.length; i++) {
      hash = (hash << 5) - hash + columnName.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

});

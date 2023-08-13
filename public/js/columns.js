window.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("/api/columns");
        const dataResponse = await response.json();
        const data = dataResponse.data; // 주어진 데이터에서 배열 추출

        const columnsList = document.getElementById("Columns");

        if (columnsList) {
            for (const column of data) {
                const columnName = column.columnName;
                const ColumnId = column.columnId; // 칼럼 아이디 값을 추출

                const temp_html = `
                    <li>
                    <div class="column" draggable="true" ondragstart="dragStart(event)" data-ColumnId="${ColumnId}" >
                    <div class="column-header">
                      <div class="column-name-input" id="Columns">${columnName}</div>
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
    };

    const columnsList = document.getElementById("Columns");
    if (columnsList) {
        columnsList.addEventListener('click', async (e) => {
            if (e.target.classList.contains('edit-column-btn')) {
                const columnElement = e.target.closest('.column');
                const columnId = columnElement.getAttribute('data-ColumnId');

                console.log(columnId);

                const newColumnName = prompt('새로운 컬럼 이름을 입력하세요:');
                if (!newColumnName) return;

                const data = {
                    columnName: newColumnName
                };
                try {
                    const response = await updateColumn(`/api/columns/${columnId}`, data);
                    const result = await response.json();
                    if (result.message === '컬럼 이름이 업데이트되었습니다.') {
                        // 업데이트 성공 시 추가 로직을 작성하세요.
                    } else {
                        alert(result.message);
                    }
                } catch (error) {
                    console.error('컬럼 이름 업데이트 중 오류 발생:', error);
                }
            }
        });
    }

    async function updateColumn(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            return response;
        } catch (error) {
            throw error;
        }
    }
});
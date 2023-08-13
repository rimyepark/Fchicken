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
                                <button class="edit-column-btn" id="updateColumnName" value="updateColumnName">수정</button>
                            </div>
                            <button id="createCard" class="add-card-btn" onclick="createCardPoPup()">Add Card</button>
                            <div class="card-container"></div>
                        </div>
                    </li>
                `;

                columnsList.innerHTML += temp_html;
                await renderCards(ColumnId);
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }

    const columnsList = document.getElementById("Columns");
    if (columnsList) {
        columnsList.addEventListener('click', async (e) => {
            if (e.target.classList.contains('edit-column-btn')) {
                const columnElement = e.target.closest('.column');
                const columnId = columnElement.getAttribute('data-ColumnId');

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

    async function renderCards(columnId) {
        try {
            const response = await fetch(`/api/columns/${columnId}/cards`);
            const dataResponse = await response.json();
            const cards = dataResponse.data; // 칼럼에 해당하는 카드 데이터 배열

            const columnElement = document.querySelector(`[data-ColumnId="${columnId}"]`);
            const cardContainer = columnElement.querySelector('.card-container');

            if (cardContainer) {
                cardContainer.innerHTML = ''; // 기존 카드 삭제

                for (const card of cards) {
                    const cardName = card.cardName;
                    const cardId = card.cardId;

                    const cardHtml = `
                        <div class="card" data-CardId="${cardId}">
                            ${cardName}
                        </div>
                    `;

                    cardContainer.innerHTML += cardHtml;
                }
            }
        } catch (error) {
            console.error('Error fetching cards:', error);
        }
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

function createCardPoPup() {
    const popup = window.open('', '_blank', 'width=400,height=300');
    
    const popupContent = `
        <h2>새로운 카드 추가</h2>
        <label for="cardTitle">카드 제목:</label>
        <input type="text" id="cardTitle" name="cardTitle"><br><br>
        
        <label for="cardContent">카드 내용:</label>
        <input type="text" id="cardContent" name="cardContent"><br><br>
        
        <button onclick="addCard()">작성하기</button>
    `;
    
    popup.document.body.innerHTML = popupContent;
}

function addCard() {
    const cardTitle = document.getElementById('cardTitle').value;
    const cardContent = document.getElementById('cardContent').value;
    
    // 여기에서 가져온 cardTitle과 cardContent를 이용하여 카드 추가 작업 수행
    // ...
    
    // 팝업 창 닫기
    window.close();
}
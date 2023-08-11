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
                            <h2>${columnName}</h2>
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
});
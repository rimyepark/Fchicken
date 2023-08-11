window.addEventListener("DOMContentLoaded", async function(){
    fetch("/api/columns")
    .then((response) => {
        console.log(response);
        return response.json();
    })
    .then((data) => {
        let rows = data["Columns"];
        const ColumnsList = document.getElementById("Columns");
        rows.forEach(Columns => {
            const ColumnsName = Columns["columnsName"];
            console.log(Columns);
            const temp_html = `<div class="column">
            <h2>${ColumnsName}</h2>
            <button class="add-card-btn">Add Card</button>
            <div class="card">Card 1</div>
            <div class="card">Card 2</div>
          </div>
         `;

          ColumnsList.innerHTML = temp_html;
        });
    })
})
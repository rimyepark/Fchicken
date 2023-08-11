document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("comment-form");
  const commentInput = document.getElementById("comment-input");
  const commentList = document.querySelector("ul.list-group");

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const content = commentInput.value.trim();
    if (!content) return;

    createComment(content).then(() => {
      commentInput.value = "";
      loadComments();
    });
  });

  const loadComments = async () => {
    const comments = await getComments();
    commentList.innerHTML = comments.map((comment) => `<li class="list-group-item">${comment.content}</li>`).join("");
  };

  const getComments = async () => {
    const cardId = 1;
    const response = await fetch(`api/cards/${cardId}/comments`);
    const data = await response.json();
    return data.data;
  };

  const createComment = async (content) => {
    const cardId = 1;
    const response = await fetch(`/api/cards/${cardId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      const responseText = await response.text();
      console.error(`Response Text: ${responseText}`);
      throw new Error("Error creating comment");
    }

    return response.json();
  };

  loadComments();
});

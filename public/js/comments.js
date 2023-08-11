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
    const cardId = 1; // 카드 ID를 수정하거나 동적으로 설정하세요.
    const response = await fetch(`/cards/${cardId}/comments`);
    const data = await response.json();
    return data.data;
  };

  const createComment = async (content) => {
    const cardId = 1; // 카드 ID를 수정하거나 동적으로 설정하세요.
    const response = await fetch(`/cards/${cardId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    return response.json();
  };

  loadComments();
});

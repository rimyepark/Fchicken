document.addEventListener("DOMContentLoaded", () => {
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentList = document.getElementById("comment-list");
    
    const cardContainer = document.querySelector(".card");
    const cardId = parseInt(cardContainer.dataset.cardId, 10);
    console.log("cardId:", cardId);
    
    commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const content = commentInput.value.trim();
    if (!content) return;
    
    createComment(content).then(() => {
    commentInput.value = "";
    loadComments();
    });
    });
    
    commentList.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit-comment-btn") || e.target.classList.contains("delete-comment-btn")) {
    const commentElement = e.target.closest("li.list-group-item");
    const commentIdAttr = commentElement.getAttribute("data-comment-id");
    const commentId = commentIdAttr ? parseInt(commentIdAttr, 10) : null;
    
    if (e.target.classList.contains("edit-comment-btn")) {
    const content = prompt("수정할 내용을 입력해주세요");
    if (content !== null && commentId !== null) {
    await updateComment(commentId, content);
    await loadComments();
    }
    } else if (e.target.classList.contains("delete-comment-btn")) {
    if (confirm("댓글을 삭제하시겠습니까?")) {
    if (commentId) {
    await deleteComment(commentId);
    await loadComments();
    } else {
    console.error("댓글을 삭제할 수 없습니다. commentId가 정의되지 않았습니다.");
    }
    }
    }
    }
    });
    
    const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formatter = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    });
    return formatter.format(date);
    };
    
    const loadComments = async () => {
    const comments = await getComments();
    commentList.innerHTML = comments
    .map(
    (comment) =>
    `<li class="list-group-item" data-comment-id="${comment.CommentId}">
    ${comment.name}: ${comment.content}
    <span class="text-muted">${formatDate(comment.updatedAt)}</span>
    <button class="btn btn-sm btn-outline-secondary edit-comment-btn">수정</button>
    <button class="btn btn-sm btn-outline-danger delete-comment-btn">삭제</button>
    </li>`
    )
    .join("");
    
    console.log("Generated HTML:", commentList.innerHTML);
    };
    
    const getComments = async () => {
    const response = await fetch(`api/cards/${cardId}/comments`);
    const data = await response.json();
    console.log("comments data:", data);
    return data.data;
    };
    
    const createComment = async (content) => {
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
    
    const newComment = await response.json();
    return newComment.id;
    };
    
    const updateComment = async (commentId, content) => {
    const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
    });
    
    if (!response.ok) {
    console.error(`Error: ${response.status} ${response.statusText}`);
    const responseText = await response.text();
    console.error(`Response Text: ${responseText}`);
    throw new Error("Error updating comment");
    }
    
    const updatedComment = await response.json();
    return updatedComment;
    };
    
    const deleteComment = async (commentId) => {
    const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    });
    
    if (!response.ok) {
    console.error(`Error: ${response.status} ${response.statusText}`);
    const responseText = await response.text();
    console.error(`Response Text: ${responseText}`);
    throw new Error("Error deleting comment");
    }
    
    return response.json();
    };
    
    loadComments();
    });
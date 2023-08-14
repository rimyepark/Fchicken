const CommentsService = require("../services/comments.service");

class CommentsController {
commentsService = new CommentsService();

//댓글 등록
createComments = async (req, res, next) => {
try {
const { UserId, name } = req.session.user;
const { cardId } = req.params;
const { content } = req.body;
const { createCommentData, code, message } = await this.commentsService.createComments({
userId: UserId,
cardId,
content,
name,
});

return res.status(code).json({ message });
} catch (err) {
if (err.code) return res.status(err.code).json({ message: err.message });
console.error(err);
res.status(500).send("알 수 없는 에러 발생");
}
};
// 댓글 조회
getComments = async (req, res, next) => {
try {
const { cardId } = req.params;

const { comments, code, message, commentId } = await this.commentsService.findAllComments({ cardId });
return res.status(code).json({ message, data: comments, commentId }); // name: name 삭제
} catch (err) {
if (err.code) return res.status(err.code).json({ message: err.message });

console.error(err);
res.status(500).send("알 수 없는 에러 발생");
}
};
//댓글 수정
updateComments = async (req, res, next) => {
try {
const { UserId } = req.session.user;
const { commentId } = req.params;
const { content } = req.body;
const { code, message } = await this.commentsService.updateComment({
userId: UserId,
commentId,
content,
});
return res.status(code).json({ message });
} catch (err) {
console.error(err);
res.status(500).send("알 수 없는 에러 발생");
}
};
// 댓글 삭제
deleteComments = async (req, res, next) => {
try {
const { UserId } = req.session.user;
const { commentId } = req.params;
const { code, message } = await this.commentsService.deleteComment({
userId: UserId,
commentId,
});

return res.status(code).json({ message });
} catch (err) {
console.error(err);
res.status(500).send("알 수 없는 에러가 발생");
}
};
}

module.exports = CommentsController;
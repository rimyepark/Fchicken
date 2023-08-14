const CommentsRepository = require("../repositories/comments.repository");
const UsersRepository = require("../repositories/user.repository");

class CommentsService {
commentsRepository = new CommentsRepository();
usersRepository = new UsersRepository();

//댓글 생성
createComments = async ({ userId, cardId, content, name }) => {
if (!userId) throw { code: 401, message: "userId가 존재하지 않습니다." };

if (!cardId) throw { code: 401, message: "cardId가 존재하지 않습니다." };

if (!content) throw { code: 401, message: "댓글 내용을 입력해주세요." };

const createCommentData = await this.commentsRepository.createComments({
cardId,
content,
createUser: userId,
name,
});

if (!createCommentData) throw { code: 401, message: "댓글 등록이 실패하였습니다. 않습니다." };

return { createCommentData, code: 200, message: "게시글 작성이 완료되었습니다." };
};

//댓글 조회
findAllComments = async ({ cardId, commentId }) => {
// 매개변수 객체로 수정
if (!cardId) {
throw { code: 400, message: "실패하였습니다." };
}

const comments = await this.commentsRepository.findAllComments(cardId, commentId);
console.log(comments);
// 사용자 이름을 추가하기 위한 비동기 작업 처리
const commentsWithNames = await Promise.all(
comments.map(async (comment) => {
const user = await this.usersRepository.getUser({
where: { UserId: comment.createUser },
attributes: ["name"],
});
return { ...comment.dataValues, name: user.name };
})
);
console.log(commentsWithNames);
return {
comments: commentsWithNames,
code: 200,
message: "게시글 조회가 완료되었습니다.",
};
};
//댓글 수정
updateComment = async ({ userId, commentId, content }) => {
if (!userId) throw { code: 401, message: "사용자를 찾을 수 없습니다." };

const updatedComment = await this.commentsRepository.update({ createUser: userId, commentId, content }, [{ commentId }]);

return { code: 200, message: "수정완료" };

return updatedComment;
};
//댓글삭제
deleteComment = async ({ userId, commentId }) => {
if (!userId) throw { code: 401, message: "사용자를 찾을 수 없습니다." };

// commentId validation 추가
if (!commentId) throw { code: 400, message: "댓글 ID를 찾을 수 없습니다." };

const deletedComment = await this.commentsRepository.delete({ createUser: userId, commentId }, [{ commentId }]);
if (!deletedComment) {
throw { code: 400, message: "댓글 삭제가 실패했습니다." };
}
return { code: 200, message: "삭제완료" };
};
}

module.exports = CommentsService;
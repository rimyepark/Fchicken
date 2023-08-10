const CardService = require("../services/cards.service");

class CardController {
  cardService = new CardService();

  createCard = async (req, res, next) => {
    try {
      const { ColumnId } = req.params;
      const { UserId } = req.session.user;
      const { title, content, cardIndex, cardColor, endDate } = req.body;

      const createCardData = await this.cardService.createCard(ColumnId, UserId, title, content, cardIndex, cardColor, endDate);

      return res.status(201).json({ data: createCardData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errorMessage: "카드 생성에 실패하였습니다." });
    }
  };

  findOneCard = async (req, res) => {
    try {
      const { CardId } = req.params;

      const findOneCardData = await this.cardService.findOneCard(CardId);

      return res.status(200).json({ data: findOneCardData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errorMessage: "카드 상세 조회에 실패하였습니다." });
    }
  };

  deleteCard = async (req, res) => {
    try {
      const { CardId } = req.params;

      await this.cardService.deleteCard(CardId);

      return res.status(200).json({ message: "카드를 삭제하였습니다." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errorMessage: "카드 삭제에 실패하였습니다." });
    }
  };

  updateCard = async (req, res) => {
    try {
      const { CardId } = req.params;
      const { title, content, cardColor, endDate } = req.body;

      await this.cardService.updateCard(CardId, title, content, cardColor, endDate);

      return res.status(200).json({ message: "카드를 수정하였습니다." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errorMessage: "카드 수정에 실패하였습니다." });
    }
  };
}

module.exports = CardController;

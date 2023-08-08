const CardRepository = require('../repositories/cards.repository');

class CardService {
  cardsRepository = new CardRepository();

  createCard = async (
    ColumnId,
    UserId,
    title,
    content,
    cardIndex,
    cardColor,
    endDate
  ) => {
    const createCardData = await this.cardsRepository.createCard(
      ColumnId,
      UserId,
      title,
      content,
      cardIndex,
      cardColor,
      endDate
    );

    return createCardData;
  };

  findOneCard = async (CardId) => {
    const findOneCardData = await this.cardsRepository.findOneCard(CardId);

    return findOneCardData;
  };

  deleteCard = async (CardId) => {
    const deleteCardData = await this.cardsRepository.deleteCard(CardId);

    return deleteCardData;
  };

  updateCard = async (CardId, title, content, cardColor, endDate) => {
    const updateCardData = await this.cardsRepository.updateCard(
      CardId,
      title,
      content,
      cardColor,
      endDate
    );

    return updateCardData;
  };
}

module.exports = CardService;

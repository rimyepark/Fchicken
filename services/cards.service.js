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

    if (!findOneCardData) {
      throw new Error('해당 카드가 존재하지 않습니다.');
    }

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

  updateCardIndex = async (cardId1, cardId2) => {
    try {
      const card1 = await this.cardsRepository.findCardById(cardId1);
      const card2 = await this.cardsRepository.findCardById(cardId2);

      const tempIndex = card1.cardIndex;
      card1.cardIndex = card2.cardIndex;
      card2.cardIndex = tempIndex;

      await this.cardsRepository.updateColumn(card1);
      await this.cardsRepository.updateColumn(card2);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = CardService;

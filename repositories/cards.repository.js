const { Cards } = require('../models');

class CardRepository {
  createCard = async (
    ColumnId,
    UserId,
    title,
    content,
    cardIndex,
    cardColor,
    endDate
  ) => {
    const createCardData = await Cards.create({
      columnId: ColumnId,
      UserId,
      title,
      content,
      cardIndex,
      cardColor,
      endDate,
    });

    return createCardData;
  };

  findOneCard = async (CardId) => {
    const findOneCardData = await Cards.findOne({ where: { CardId } });

    return findOneCardData;
  };

  deleteCard = async (CardId) => {
    const deleteCardData = await Cards.destroy({ where: { CardId } });

    return deleteCardData;
  };

  updateCard = async (CardId, title, content, cardColor, endDate) => {
    const updateCardData = await Cards.update(
      { title, content, cardColor, endDate },
      { where: { CardId } }
    );

    return updateCardData;
  };
}

module.exports = CardRepository;

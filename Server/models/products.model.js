module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define("product", {
    Product_Code: {
      type: Sequelize.STRING,
    },

    Product_title: {
      type: Sequelize.STRING,
    },

    description: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue:true
    },
  });

  return product;
};

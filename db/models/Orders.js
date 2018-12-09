const Sequelize = require('sequelize')
const conn = require('../connection')

const Orders = conn.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true
  },
  status: {
    type: Sequelize.ENUM('cart', 'created', 'processing', 'cancelled', 'completed', 'delivered'),
    defaultValue: 'cart'
  },
  isPaid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
  },
  addressName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [4, 40],
        msg: 'Minimum of four characters required.'
      }
    }
  },
  addressLine: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [4, 40],
        msg: 'Minimum of four characters required.'
      }
    }
  },
  addressCity: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 20],
        msg: 'Minimum of two characters required.'
      }
    }
  },
  addressState: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 20],
        msg: 'Minimum of two characters required.'
      }
    }
  },
  addressZip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 20],
        msg: 'Minimum of ten characters required.'
      }
    }
  }
})

module.exports = Orders

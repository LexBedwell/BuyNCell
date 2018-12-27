const Sequelize = require('sequelize')
const conn = require('../connection')

const Orders = conn.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true
  },
  status: {
    type: Sequelize.ENUM('cart', 'processing', 'cancelled', 'completed', 'delivered'),
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
    defaultValue: '',
    validate: {
      len: {
        args: [0, 40],
        msg: 'Maximum forty characters allowed.'
      }
    }
  },
  addressLine: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      len: {
        args: [0, 40],
        msg: 'Maximum forty characters allowed.'
      }
    }
  },
  addressCity: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      len: {
        args: [0, 20],
        msg: 'Maximum twenty characters allowed.'
      }
    }
  },
  addressState: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      len: {
        args: [0, 20],
        msg: 'Maximum twenty characters allowed.'
      }
    }
  },
  addressZip: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      len: {
        args: [0, 10],
        msg: 'Maximum ten characters allowed.'
      }
    }
  }
})

module.exports = Orders

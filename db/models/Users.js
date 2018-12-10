const Sequelize = require('sequelize')
const conn = require('../connection')

const Users = conn.define('users', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [6, 20],
        msg: 'Must be between six to twenty characters.'
      }
    }
  },
  isAdmin: {
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
        msg: 'Must be between four to forty characters.'
      }
    }
  },
  addressLine: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [4, 40],
        msg: 'Must be between four to forty characters.'
      }
    }
  },
  addressCity: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 20],
        msg: 'Must be between two to twenty characters.'
      }
    }
  },
  addressState: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 20],
        msg: 'Must be between two to twenty characters.'
      }
    }
  },
  addressZip: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [5, 10],
        msg: 'Must be between five to ten characters.'
      }
    }
  }
})

module.exports = Users

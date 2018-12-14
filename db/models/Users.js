const Sequelize = require('sequelize')
const conn = require('../connection')

const Users = conn.define('users', {
  githubUserId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  addressName: {
    type: Sequelize.STRING,
    validate: {
      len: {
        args: [4, 40],
        msg: 'Must be between four to forty characters.'
      }
    }
  },
  addressLine: {
    type: Sequelize.STRING,
    validate: {
      len: {
        args: [4, 40],
        msg: 'Must be between four to forty characters.'
      }
    }
  },
  addressCity: {
    type: Sequelize.STRING,
    validate: {
      len: {
        args: [2, 20],
        msg: 'Must be between two to twenty characters.'
      }
    }
  },
  addressState: {
    type: Sequelize.STRING,
    validate: {
      len: {
        args: [2, 20],
        msg: 'Must be between two to twenty characters.'
      }
    }
  },
  addressZip: {
    type: Sequelize.STRING,
    validate: {
      len: {
        args: [5, 10],
        msg: 'Must be between five to ten characters.'
      }
    }
  }
})

module.exports = Users

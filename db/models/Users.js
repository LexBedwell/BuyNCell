const Sequelize = require('sequelize')
const conn = require('../connection')

const Users = conn.define('users', {
  email: {
    type: Sequelize.STRING,
    unique: true,
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
        msg: 'Minimum of six characters required.'
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
        args: [5, 10],
        msg: 'Minimum of five characters required.'
      }
    }
  }
})

module.exports = Users

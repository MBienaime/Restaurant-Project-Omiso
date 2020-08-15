const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const bcrypt = require('bcrypt');
const User = require("../Models/UserModel");
const Order = require('../Models/OrderModel');
const MenuItem = require("../Models/MenuItemModel");


AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  resources: [
    {resource: User,
      options:{
        properties:{
          _id:{
            isVisible:{list: false, filter: false, show: false, edit: false}, 
          },
          role:{
            isVisible:{list: false, filter: false, show: false, edit: true},
            availableValues: [
              {value: 'admin', label: 'Administrateur'},
              {value: 'user', label: 'Utilisateur'},
              {value: 'employé', label: 'Employée'},
            ]
          },
        },
      },
    },
    {resource: Order,
      options:{
        properties:{
          _id:{isVisible:{list: false, filter: false, show: false, edit: false},
          }
        },
      },
    },
    {resource: MenuItem,
      options:{
        properties:{
          _id:{isVisible:{list: false, filter: false, show: false, edit: false},
          }
        },
      },
    },],
  rootPath: '/admin',
})


const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME,
  authenticate: async (email, password) => {
    const user = await User.findOne({ email:email })
    if (user) {
      const matched = await bcrypt.compare(password, user.password)
      if (matched) {
        return user
      }
    }
    return false
  },
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD
})

module.exports = router
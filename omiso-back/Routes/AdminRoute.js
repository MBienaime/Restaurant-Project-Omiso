// imports
const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const bcrypt = require('bcrypt');
const User = require('../Models/UserModel');
const Order = require('../Models/OrderModel');
const MenuItem = require('../Models/MenuItemModel');

// Handles ressources
AdminBro.registerAdapter(AdminBroMongoose);

// Admin-bro parameters
const adminBro = new AdminBro({
  resources: [
    {
      resource: User,
      options: {
        properties: {
          _id: {
            isVisible: false,
          },
          role: {
            name: 'role',
            isVisible: {
              list: false, filter: false, show: false, edit: true,
            },
            availableValues: [
              { value: 'admin', label: 'Administrateur' },
              { value: 'user', label: 'Utilisateur' },
              { value: 'employé', label: 'Employée' },
            ],
          },
          password: {
            isVisible: false,
          },
          resetLinkToken: {
            isVisible: false,
          },
          postal_code: {
            isVisible: {
              list: false, filter: false, show: false, edit: true,
            },
          },
          address: {
            isVisible: {
              list: false, filter: false, show: false, edit: true,
            },
          },
          city: {
            isVisible: {
              list: false, filter: false, show: false, edit: true,
            },
          },

        },

      },
    },
    {
      resource: Order,
      options: {
        properties: {
          _id: {
            isVisible: false,
          },
          payment_id: {
            isVisible: false,
          },

        },
      },
    },

    {
      resource: MenuItem,
      options: {
        properties: {
          _id: {
            isVisible: false,
          },
          image: {
            isVisible: false,
          },
          category: {
            availableValues: [
              { value: 'Plat', label: 'Plat' },
              { value: 'Boisson', label: 'Boisson' },
              { value: 'Entree', label: 'Entree' },
              { value: 'Dessert', label: 'Dessert' },
            ],
          },
        },
      },
    }],
  branding: {
    companyName: 'OMISO',
  },
  rootPath: '/admin',
});

// To protect the routes with a session authentication
const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME,

  authenticate: async (email, password) => {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,

});

module.exports = router;

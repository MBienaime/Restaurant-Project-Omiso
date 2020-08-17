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
    {resource: User,
      options:{
        properties:{                  
          _id:{
            isVisible:{list: false, filter: false, show: false, edit: false}, 
          },
          role:{
            name:'role',
            isVisible:{list: false, filter: false, show: false, edit: true},
            availableValues: [
              {value: 'admin', label: 'Administrateur'},
              {value: 'user', label: 'Utilisateur'},
              {value: 'employé', label: 'Employée'},
            ]
          },
          password:{isVisible:{list: false, filter: false, show: false, edit: false},
          },
        },

      locale: {
        language: 'pl',
        translations: {
          actions: {
            new: 'Stwórz nowy',
            edit: 'Edytuj',
            show: 'Detale',            
          },
          resources:{
            User:{
              properties: {
                lastname: 'Tytuł',
              }
            }
          },
        }
      }


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

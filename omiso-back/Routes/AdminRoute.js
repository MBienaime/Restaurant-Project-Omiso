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

            isVisible: {
              list: false, filter: false, show: false, edit: true,
            },
            availableValues: [
              { value: 'admin', label: 'Administrateur' },
              { value: 'client', label: 'Utilisateur' },
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
        actions: { edit: { isVisible: false }, new: { isVisible: false } },
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
          order_Menu: { },

        },
        actions: {
          edit: { }, new: { }, show: { isVisible: false }, delete: { isVisible: false },
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

  //
  locale: {
    language: 'fr',
    translations: {
      actions: {
        new: 'Nouveau',
        edit: 'Editer',
        show: 'Afficher',
        delete: 'Suprimer',
        bulkDelete: 'Tout suprimer',
        list: 'Liste',
      },
      buttons: {
        save: 'Sauvegarder',
        filter: 'Filtrer',
        applyChanges: 'Appliquer changement',
        resetFilter: 'Remise a zero',
        confirmRemovalMany: 'Confirmer la suppression de {{count}} enregistrement',
        confirmRemovalMany_plural: 'Confirmer la suppression de {{count}} enregistrement',
        logout: 'Deconnexion',
        seeTheDocumentation: 'Voir: <1>la documentation</1>',
        createFirstRecord: 'Créer le premier enregistrement',
      },
      labels: {
        navigation: 'Navigation',
        pages: 'Pages',
        selectedRecords: 'Selectionner ({{selected}})',
        filters: 'Filtrer',
        adminVersion: 'Admin: {{version}}',
        appVersion: 'App: {{version}}',
        loginWelcome: 'Bonjour',
        User: 'Utilisateur',
        Order: 'Commande',
        Menu: 'Carte menu',

        password: 'Mots de passe',
        email: 'Adresse mail',

      },
      properties: {
        lastname: 'Prenom',
        email: 'Adresse mail',
        firstname: 'Nom',
        phone_number: 'Telephone',
        id_User: 'Email',
        date_Order: 'Date de la commande',
        total_Price: 'Prix Totale',
        total_Items: 'Nombre de plats',
        name: 'Nom',
        description: 'Description',
        price: 'Price',
        category: 'Categorie',

      },
      resources: {

      },
      messages: {
        successfullyBulkDeleted: ' enregistrement de {{count}} supprimé avec succès',
        successfullyBulkDeleted_plural: 'enregistrement de {{count}} supprimé avec succès',
        successfullyDeleted: 'Enregistrement supprimé avec succès',
        successfullyUpdated: 'Enregistrement mis à jour avec succès',
        thereWereValidationErrors: 'Il y a des erreurs de validation - vérifiez-les ci-dessous',
        successfullyCreated: 'Création d\'un nouvel enregistrement avec succès',
        bulkDeleteError: 'Une erreur s\'est produite lors de la suppression des enregistrements. Consultez la console pour plus d\'informations',
        errorFetchingRecords: 'Une erreur s\'est produite lors de la récupération des enregistrements. Consultez la console pour en savoir plus',
        errorFetchingRecord: 'Une erreur s\'est produite lors de la récupération de l\'enregistrement. Consultez la console pour plus d\'informations',
        noRecordsSelected: 'Vous n\'avez sélectionné aucun enregistrement',
        theseRecordsWillBeRemoved: 'L\'enregistrement suivant sera supprimé',
        theseRecordsWillBeRemoved_plural: 'Les enregistrements suivants seront supprimés',
        pickSomeFirstToRemove: 'Pour supprimer des enregistrements, vous devez d\'abord les sélectionner',
        error404Resource: 'La ressource de l\'ID donné: {{resourceId}} est introuvable',
        error404Action: 'La ressource de l\'ID donné: {{resourceId}} n\'a pas d\'action avec le nom: {{actionName}}',
        error404Record: 'La ressource de l\'ID donné: {{resourceId}} n\'a pas d\'enregistrement avec l\'ID: {{recordId}}',
        seeConsoleForMore: 'Voir la console de développement pour plus de détails ...',
        noActionComponent: 'Vous devez implémenter un composant d\'action pour votre action',
        noRecordsInResource: 'Il n\'y a aucun enregistrement dans cette ressource',
        confirmDelete: 'Voulez-vous vraiment supprimer cet élément?',
        welcomeOnBoard_title: 'Bienvenue à bord!',
        welcomeOnBoard_subtitle: 'Maintenant tu es l\'un de nous! Nous vous avons préparé quelques conseils pour commencer:',
        loginWelcome: 'To AdminBro - le meilleur cadre d\'administration pour les applications Node.js, basé sur React.',
        addingResources_title: 'Ajouter des ressources',
        addingResources_subtitle: 'Comment ajouter de nouvelles ressources à la barre latérale',
        customizeResources_title: 'Personnaliser les ressources',
        customizeResources_subtitle: 'Définition du comportement, ajout de propriétés et plus encore ...',
        customizeActions_title: 'Personnaliser les actions',
        customizeActions_subtitle: 'Modifier les actions existantes et en ajouter de nouvelles',
        writeOwnComponents_title: 'Écrire des composants',
        writeOwnComponents_subtitle: 'Comment modifier l\'apparence d\'AdminBro',
        customDashboard_title: 'Tableau de bord personnalisé',
        customDashboard_subtitle: 'Comment modifier cette vue et ajouter de nouvelles pages dans la barre latérale',
        roleBasedAccess_title: 'Contrôle d\'accès basé sur les rôles',
        roleBasedAccess_subtitle: 'Créer des rôles d\'utilisateur et des autorisations dans AdminBro',
        checkoutBlog_title: 'Consultez notre blog',
        checkoutBlog_subtitle: 'Pour les dernières informations sur AdminBro et d\'autres nouvelles technologiques',
        foundBug_title: 'Vous avez trouvé un bug? besoin d\'amélioration?',
        foundBug_subtitle: 'Soulever un problème sur notre dépôt GitHub',
        needMoreSolutions_title: 'Besoin de solutions plus avancées?',
        needMoreSolutions_subtitle: 'Nous sommes là pour vous fournir une belle conception UX / UI et un logiciel sur mesure basé (pas seulement) sur AdminBro',
        invalidCredentials: 'Email et / ou mot de passe incorrect',
      },
    },

  },

  ///

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

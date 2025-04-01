import { icon } from 'leaflet';
import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
   //superadmin -> operational
   
    {
        id: 1,
        label: 'OPERATIONAL',
        isTitle: true,
        roles: ['super_admin']
    },
    {
        id: 2,
        label: 'Overview',
        icon: 'bxs-dashboard',
        link: 'enterprise-management',
        roles: ['super_admin','operator']

    },
    {
        id: 3,
        label: 'Orders',
        icon: 'bxs-package',
        link: 'orders-management',
        roles: ['super_admin','operator']

    },
    {
        id: 4,
        label: 'Subscriptions',
        icon: 'bxs-cart-alt',
        link: 'subscription-management',
        roles: ['super_admin','operator']

    },
    {
        id: 5,
        label: 'Customer Management',
        icon: 'bxs-user-pin',
        link: 'enterprise-management',
        roles: ['super_admin','operator']

    },
    {
        id: 6,
        label: 'Payment Gateways',
        icon: 'bxs-wallet',
        link: 'payment-gateway-management',
        roles: ['super_admin','operator']

    },
    {
        id: 7,
        label: 'Cron Jobs',
        icon: 'bxs-timer',
        link: 'cron-job-management',
        roles: ['super_admin','operator']

    },
    {
        id: 8,
        label: 'Help & Support',
        icon: 'bxs-conversation',
        link: 'support-management',
        roles: ['super_admin','operator']

    },
    //superadmin -> settings
    {
        id: 8,
        label: 'APP SETTINGS',
        isTitle: true,
        roles: ['super_admin','admin']

    },
    {
        id: 9,
        label: 'Page Settings',
        icon: 'bxs-cog',
        link: 'page-settings',
        roles: ['super_admin']

    },
    {
        id: 10,
        icon: 'bxs-check-shield',
        label: 'Admin & Role',
        roles: ['super_admin'],
        subItems: [
            {
                id: 11,
                label: 'Admin',
                link: 'tables/basic',
                parentId: 10
            },
            {
                id: 12,
                label: 'Roles',
                link: 'tables/advanced',
                parentId: 10
            }
        ]
    },
    {
        id: 13,
        icon: 'bxs-user',
        label: 'Developper Settings',
        roles: ['super_admin','admin'],
        subItems: [
            {
                id: 14,
                label: 'App Settings',
                link: 'tables/basic',
                parentId: 13
            },
            {
                id: 15,
                label: 'SMTP Settings',
                link: 'tables/advanced',
                parentId: 13
            },
            {
                id: 16,
                label: 'Storage Settings',
                link: 'tables/advanced',
                parentId: 13
            }
        ]
    },
  
    //enterprise -> Operational

    {
        id: 17,
        label: 'OPERATIONAL',
        isTitle: true,
        roles: ['enterprise_admin','solo_business_developer']

    },
    {
        id: 18,
        label: 'Portfolio Overview',
        icon: 'bxs-dashboard',
        link: 'enterprise-management',
        roles: ['enterprise_admin']

    },

    {
        id: 22,
        label: 'Enterprise Management',
        icon: 'bxs-buildings',
        link: 'enterprise-management',
        roles: ['enterprise_admin'],
        subItems: [
            {
                id: 40,
                label: 'Organization',
                link: 'dashboard',
                parentId: 2
            },
            {
                id: 41,
                label: 'Team',
                link: 'dashboard',
                parentId: 2
            },
        ]

    },
    {
        id: 21,
        label: 'Competitors',
        icon: 'bxs-cart-alt',
        link: 'competitor-management',
        roles: ['enterprise_admin']

    },
    {
        id: 23,
        icon: 'bxs-store',
        label: 'Products',
        roles: ['enterprise_admin','solo_business_developer'],
        subItems: [
            {
                id: 26,
                label: 'Category',
                link: 'tables/basic',
                parentId: 23
            },
            {
                id: 27,
                label: 'Products',
                link: 'tables/advanced',
                parentId: 23
            }
        ]
    },
    {
        id: 24,
        label: 'Business Sectors',
        icon: 'bxs-pie-chart',
        link: 'cron-job-management',
        roles: ['enterprise_admin','solo_business_developer']

    },
  
    //enterprise_admin -> settings
    {
        id: 28,
        label: 'SETTINGS',
        isTitle: true,
        roles: ['enterprise_admin']

    },
    {
        id: 29,
        label: 'Subscription',
        icon: 'bxs-cart',
        link: 'page-settings',
        roles: ['enterprise_admin','solo_business_developer']


    },
   
  
 //Biz developper -> Operational

 {
    id: 33,
    label: 'OPERATIONAL',
    isTitle: true,
    roles: ['business_developer','solo_business_developer']

},
{
    id: 34,
    label: 'My Portfolio Dashboard',
    icon: 'bxs-chart',
    link: 'business-dev-dashboard',
    roles: ['business_developer','solo_business_developer']

},
{
    id: 37,
    label: 'Followups',
    icon: 'bxs-traffic',
    link: 'follow-ups',
    roles: ['business_developer','solo_business_developer']

},
{
    id: 36,
    label: 'Activity Management',
    icon: 'bxs-folder-open',
    link: 'activity-management',
    roles: ['business_developer','solo_business_developer']

},

{
    id: 35,
    label: 'Porfolio Management',
    icon: 'bxs-briefcase',
    link: 'bizdev-client',
    roles: ['business_developer','solo_business_developer']

},


// (common to all users)
{
    id: 30,
    label: 'Help & Support',
    icon: 'bx-headphone',
    link: 'page-',
    roles: ['enterprise_admin','business_developer','solo_business_developer']


},
{
    id: 31,
    label: 'Profile Settings',
    icon: 'bxs-user-circle',
    link: 'page-earphone',
    roles: ['super_admin','enterprise_admin','business_developer','solo_business_developer','operator','admin']


},
{
    id: 32,
    label: 'Logout',
    icon: 'bxs-log-out',
    link: 'page-earphone',
    roles: ['super_admin','enterprise_admin','business_developer','solo_business_developer','operator','admin']


},

    // END
    {
        id: 131,
        label: '##TEMPLATE###',
        icon: '',
        link: 'schedule-management',
        
    },
    {
        id: 132,
        label: 'Manage Services',
        icon: 'bx-store-alt',
        link: 'schedule-management',
        roles: ['super_admin']

        
    },
  
    
    {
        id: 130,
        label: 'ADMIN',
        isTitle: true
    },
    {
        id: 131,
        label: 'Manage Industries',
        icon: 'bxs-factory',
        link: 'industry-management',

        
    },
    {
        id: 131,
        label: 'Manage Users',
        icon: 'bx-user-circle',
        link: 'user-management',
        
    },
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        badge: {
            variant: 'info',
            text: 'MENUITEMS.DASHBOARDS.BADGE',
        },
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
                link: 'dashboard',
                parentId: 2
            },
            {
                id: 4,
                label: 'MENUITEMS.DASHBOARDS.LIST.SAAS',
                link: 'dashboards/saas',
                parentId: 2
            },
            {
                id: 5,
                label: 'MENUITEMS.DASHBOARDS.LIST.CRYPTO',
                link: 'dashboards/crypto',
                parentId: 2
            },
            {
                id: 6,
                label: 'MENUITEMS.DASHBOARDS.LIST.BLOG',
                link: 'dashboards/blog',
                parentId: 2
            },
        ]
    },
    {
        id: 7,
        isLayout: true
    },
    {
        id: 9,
        label: 'MENUITEMS.CALENDAR.TEXT',
        icon: 'bx-calendar',
        link: 'calendar',
    },
    {
        id: 10,
        label: 'MENUITEMS.CHAT.TEXT',
        icon: 'bx-chat',
        link: 'chat',
        
    },
    {
        id: 11,
        label: 'MENUITEMS.FILEMANAGER.TEXT',
        icon: 'bx-file',
        link: 'filemanager',
        badge: {
            variant: 'success',
            text: 'MENUITEMS.FILEMANAGER.BADGE',
        },
    },
    {
        id: 12,
        label: 'MENUITEMS.ECOMMERCE.TEXT',
        icon: 'bx-store',
        subItems: [
            {
                id: 13,
                label: 'MENUITEMS.ECOMMERCE.LIST.PRODUCTS',
                link: 'ecommerce/products',
                parentId: 12
            },
            {
                id: 14,
                label: 'MENUITEMS.ECOMMERCE.LIST.PRODUCTDETAIL',
                link: 'ecommerce/product-detail/1',
                parentId: 12
            },
            {
                id: 15,
                label: 'MENUITEMS.ECOMMERCE.LIST.ORDERS',
                link: 'ecommerce/orders',
                parentId: 12
            },
            {
                id: 16,
                label: 'MENUITEMS.ECOMMERCE.LIST.CUSTOMERS',
                link: 'ecommerce/customers',
                parentId: 12
            },
            {
                id: 17,
                label: 'MENUITEMS.ECOMMERCE.LIST.CART',
                link: 'ecommerce/cart',
                parentId: 12
            },
            {
                id: 18,
                label: 'MENUITEMS.ECOMMERCE.LIST.CHECKOUT',
                link: 'ecommerce/checkout',
                parentId: 12
            },
            {
                id: 19,
                label: 'MENUITEMS.ECOMMERCE.LIST.SHOPS',
                link: 'ecommerce/shops',
                parentId: 12
            },
            {
                id: 20,
                label: 'MENUITEMS.ECOMMERCE.LIST.ADDPRODUCT',
                link: 'ecommerce/add-product',
                parentId: 12
            },
        ]
    },
    {
        id: 21,
        label: 'MENUITEMS.CRYPTO.TEXT',
        icon: 'bx-bitcoin',
        subItems: [
            {
                id: 22,
                label: 'MENUITEMS.CRYPTO.LIST.WALLET',
                link: 'crypto/wallet',
                parentId: 21
            },
            {
                id: 23,
                label: 'MENUITEMS.CRYPTO.LIST.BUY/SELL',
                link: 'crypto/buy-sell',
                parentId: 21
            },
            {
                id: 24,
                label: 'MENUITEMS.CRYPTO.LIST.EXCHANGE',
                link: 'crypto/exchange',
                parentId: 21
            },
            {
                id: 25,
                label: 'MENUITEMS.CRYPTO.LIST.LENDING',
                link: 'crypto/lending',
                parentId: 21
            },
            {
                id: 26,
                label: 'MENUITEMS.CRYPTO.LIST.ORDERS',
                link: 'crypto/orders',
                parentId: 21
            },
            {
                id: 27,
                label: 'MENUITEMS.CRYPTO.LIST.KYCAPPLICATION',
                link: 'crypto/kyc-application',
                parentId: 21
            },
            {
                id: 28,
                label: 'MENUITEMS.CRYPTO.LIST.ICOLANDING',
                link: 'crypto-ico-landing',
                parentId: 21
            }
        ]
    },
    {
        id: 29,
        label: 'MENUITEMS.EMAIL.TEXT',
        icon: 'bx-envelope',
        subItems: [
            {
                id: 30,
                label: 'MENUITEMS.EMAIL.LIST.INBOX',
                link: 'email/inbox',
                parentId: 29
            },
            {
                id: 31,
                label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
                link: 'email/read/1',
                parentId: 29
            },
            {
                id: 32,
                label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.TEXT',
                badge: {
                    variant: 'success',
                    text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
                },
                parentId: 29,
                subItems: [
                    {
                        id:33 ,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BASIC',
                        link: 'email/basic',
                        parentId:32 
                    },
                    {
                        id:34 ,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.ALERT',
                        link: 'email/alert',
                        parentId:32 
                    },
                    {
                        id:35 ,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BILLING',
                        link: 'email/billing',
                        parentId:32 
                    }
                ]
            }
        ]
    },
    {
        id: 36,
        label: 'MENUITEMS.INVOICES.TEXT',
        icon: 'bx-receipt',
        subItems: [
            {
                id: 37,
                label: 'MENUITEMS.INVOICES.LIST.INVOICELIST',
                link: 'invoices/list',
                parentId: 36
            },
            {
                id: 38,
                label: 'MENUITEMS.INVOICES.LIST.INVOICEDETAIL',
                link: 'invoices/detail',
                parentId: 36
            },
        ]
    },
    {
        id: 39,
        label: 'MENUITEMS.PROJECTS.TEXT',
        icon: 'bx-briefcase-alt-2',
        subItems: [
            {
                id: 40,
                label: 'MENUITEMS.PROJECTS.LIST.GRID',
                link: 'projects/grid',
                parentId: 38
            },
            {
                id: 41,
                label: 'MENUITEMS.PROJECTS.LIST.PROJECTLIST',
                link: 'projects/list',
                parentId: 38
            },
            {
                id: 42,
                label: 'MENUITEMS.PROJECTS.LIST.OVERVIEW',
                link: 'projects/overview',
                parentId: 38
            },
            {
                id: 43,
                label: 'MENUITEMS.PROJECTS.LIST.CREATE',
                link: 'projects/create',
                parentId: 38
            }
        ]
    },
    {
        id: 44,
        label: 'MENUITEMS.TASKS.TEXT',
        icon: 'bx-task',
        subItems: [
            {
                id: 45,
                label: 'MENUITEMS.TASKS.LIST.TASKLIST',
                link: 'tasks/list',
                parentId: 44
            },
            {
                id: 46,
                label: 'MENUITEMS.TASKS.LIST.KANBAN',
                link: 'tasks/kanban',
                parentId: 44
            },
            {
                id: 47,
                label: 'MENUITEMS.TASKS.LIST.CREATETASK',
                link: 'tasks/create',
                parentId: 44
            }
        ]
    },
    {
        id: 48,
        label: 'MENUITEMS.CONTACTS.TEXT',
        icon: 'bxs-user-detail',
        subItems: [
            {
                id: 49,
                label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
                link: 'contacts/grid',
                parentId: 48
            },
            {
                id: 50,
                label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                link: 'contacts/list',
                parentId: 48
            },
            {
                id: 51,
                label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
                link: 'contacts/profile',
                parentId: 48
            }
        ]
    },
    {
        id: 52,
        label: 'MENUITEMS.BLOG.TEXT',
        icon: 'bx-file',
        badge: {
            variant: 'success',
            text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
        },
        subItems: [
            {
                id: 53,
                label: 'MENUITEMS.BLOG.LIST.BLOGLIST',
                link: 'blog/list',
                parentId: 52
            },
            {
                id: 54,
                label: 'MENUITEMS.BLOG.LIST.BLOGGRID',
                link: 'blog/grid',
                parentId: 52
            },
            {
                id: 55,
                label: 'MENUITEMS.BLOG.LIST.DETAIL',
                link: 'blog/detail',
                parentId: 52
            },
        ]
    },
    {
        id: 56,
        label: 'MENUITEMS.PAGES.TEXT',
        isTitle: true
    },
    {
        id: 57,
        label: 'MENUITEMS.AUTHENTICATION.TEXT',
        icon: 'bx-user-circle',
        badge: {
            variant: 'success',
            text: 'MENUITEMS.AUTHENTICATION.BADGE',
        },
        subItems: [
            {
                id: 58,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN',
                link: 'account/login',
                parentId: 57
            },
            {
                id: 59,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN2',
                link: 'account/login-2',
                parentId: 57
            },
            {
                id: 60,
                label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER',
                link: 'account/signup',
                parentId: 57
            },
            {
                id: 61,
                label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER2',
                link: 'account/signup-2',
                parentId: 57
            },
            {
                id: 62,
                label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD',
                link: 'account/reset-password',
                parentId: 57
            },
            {
                id: 63,
                label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD2',
                link: 'account/recoverpwd-2',
                parentId: 57
            },
            {
                id: 64,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
                link: 'pages/lock-screen-1',
                parentId: 57
            },
            {
                id: 65,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN2',
                link: 'pages/lock-screen-2',
                parentId: 57
            },
            {
                id: 66,
                label: 'MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL',
                link: 'pages/confirm-mail',
                parentId: 57
            },
            {
                id: 67,
                label: 'MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL2',
                link: 'pages/confirm-mail-2',
                parentId: 57
            },
            {
                id: 68,
                label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION',
                link: 'pages/email-verification',
                parentId: 57
            },
            {
                id: 69,
                label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION2',
                link: 'pages/email-verification-2',
                parentId: 57
            },
            {
                id: 70,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
                link: 'pages/two-step-verification',
                parentId: 57
            },
            {
                id: 71,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION2',
                link: 'pages/two-step-verification-2',
                parentId: 57
            }
        ]
    },
    {
        id: 72,
        label: 'MENUITEMS.UTILITY.TEXT',
        icon: 'bx-file',
        subItems: [
            {
                id: 73,
                label: 'MENUITEMS.UTILITY.LIST.STARTER',
                link: 'pages/starter',
                parentId: 72
            },
            {
                id: 74,
                label: 'MENUITEMS.UTILITY.LIST.MAINTENANCE',
                link: 'pages/maintenance',
                parentId: 72
            },
            {
                id: 74,
                label: 'Coming Soon',
                link: 'pages/coming-soon',
                parentId: 72
            },
            {
                id: 75,
                label: 'MENUITEMS.UTILITY.LIST.TIMELINE',
                link: 'pages/timeline',
                parentId: 72
            },
            {
                id: 76,
                label: 'MENUITEMS.UTILITY.LIST.FAQS',
                link: 'pages/faqs',
                parentId: 72
            },
            {
                id: 77,
                label: 'MENUITEMS.UTILITY.LIST.PRICING',
                link: 'pages/pricing',
                parentId: 72
            },
            {
                id: 78,
                label: 'MENUITEMS.UTILITY.LIST.ERROR404',
                link: 'pages/404',
                parentId: 72
            },
            {
                id: 79,
                label: 'MENUITEMS.UTILITY.LIST.ERROR500',
                link: 'pages/500',
                parentId: 72
            },
        ]
    },
    {
        id: 80,
        label: 'MENUITEMS.COMPONENTS.TEXT',
        isTitle: true
    },
    {
        id: 81,
        label: 'MENUITEMS.UIELEMENTS.TEXT',
        icon: 'bx-tone',
        subItems: [
            {
                id: 82,
                label: 'MENUITEMS.UIELEMENTS.LIST.ALERTS',
                link: 'ui/alerts',
                parentId: 81
            },
            {
                id: 83,
                label: 'MENUITEMS.UIELEMENTS.LIST.BUTTONS',
                link: 'ui/buttons',
                parentId: 81
            },
            {
                id: 84,
                label: 'MENUITEMS.UIELEMENTS.LIST.CARDS',
                link: 'ui/cards',
                parentId: 81
            },
            {
                id: 85,
                label: 'MENUITEMS.UIELEMENTS.LIST.CAROUSEL',
                link: 'ui/carousel',
                parentId: 81
            },
            {
                id: 86,
                label: 'MENUITEMS.UIELEMENTS.LIST.DROPDOWNS',
                link: 'ui/dropdowns',
                parentId: 81
            },
            {
                id: 87,
                label: 'MENUITEMS.UIELEMENTS.LIST.GRID',
                link: 'ui/grid',
                parentId: 81
            },
            {
                id: 88,
                label: 'MENUITEMS.UIELEMENTS.LIST.IMAGES',
                link: 'ui/images',
                parentId: 81
            },
            {
                id: 88,
                label: 'MENUITEMS.UIELEMENTS.LIST.LIGHTBOX',
                link: 'ui/lightbox',
                parentId: 81
            },
            {
                id: 89,
                label: 'MENUITEMS.UIELEMENTS.LIST.MODALS',
                link: 'ui/modals',
                parentId: 81
            },
            {
                id: 90,
                label: 'MENUITEMS.UIELEMENTS.LIST.RANGESLIDER',
                link: 'ui/rangeslider',
                parentId: 81
            },
            {
                id: 91,
                label: 'MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR',
                link: 'ui/progressbar',
                parentId: 81
            },
            {
                id: 92,
                label: 'MENUITEMS.UIELEMENTS.LIST.PLACEHOLDER',
                link: 'ui/placeholder',
                parentId: 81
            },
            {
                id: 93,
                label: 'MENUITEMS.UIELEMENTS.LIST.SWEETALERT',
                link: 'ui/sweet-alert',
                parentId: 81
            },
            {
                id: 94,
                label: 'MENUITEMS.UIELEMENTS.LIST.TABS',
                link: 'ui/tabs-accordions',
                parentId: 81
            },
            {
                id: 95,
                label: 'MENUITEMS.UIELEMENTS.LIST.TYPOGRAPHY',
                link: 'ui/typography',
                parentId: 81
            },
            {
                id: 96,
                label: 'MENUITEMS.UIELEMENTS.LIST.VIDEO',
                link: 'ui/video',
                parentId: 81
            },
            {
                id: 97,
                label: 'MENUITEMS.UIELEMENTS.LIST.GENERAL',
                link: 'ui/general',
                parentId: 81
            },
            {
                id: 98,
                label: 'MENUITEMS.UIELEMENTS.LIST.COLORS',
                link: 'ui/colors',
                parentId: 81
            },
            {
                id: 99,
                label: 'MENUITEMS.UIELEMENTS.LIST.CROPPER',
                link: 'ui/image-crop',
                parentId: 81
            },
        ]
    },
    {
        id: 100,
        label: 'MENUITEMS.FORMS.TEXT',
        icon: 'bxs-eraser',
        badge: {
            variant: 'danger',
            text: 'MENUITEMS.FORMS.BADGE',
        },
        subItems: [
            {
                id: 101,
                label: 'MENUITEMS.FORMS.LIST.ELEMENTS',
                link: 'form/elements',
                parentId: 100
            },
            {
                id: 102,
                label: 'MENUITEMS.FORMS.LIST.LAYOUTS',
                link: 'form/layouts',
                parentId: 100
            },
            {
                id: 103,
                label: 'MENUITEMS.FORMS.LIST.VALIDATION',
                link: 'form/validation',
                parentId: 100
            },
            {
                id: 104,
                label: 'MENUITEMS.FORMS.LIST.ADVANCED',
                link: 'form/advanced',
                parentId: 100
            },
            {
                id: 105,
                label: 'MENUITEMS.FORMS.LIST.EDITOR',
                link: 'form/editor',
                parentId: 100
            },
            {
                id: 106,
                label: 'MENUITEMS.FORMS.LIST.FILEUPLOAD',
                link: 'form/uploads',
                parentId: 100
            },
            {
                id: 107,
                label: 'MENUITEMS.FORMS.LIST.REPEATER',
                link: 'form/repeater',
                parentId: 100
            },
            {
                id: 108,
                label: 'MENUITEMS.FORMS.LIST.WIZARD',
                link: 'form/wizard',
                parentId: 100
            },
            {
                id: 109,
                label: 'MENUITEMS.FORMS.LIST.MASK',
                link: 'form/mask',
                parentId: 100
            }
        ]
    },
    {
        id: 110,
        icon: 'bx-list-ul',
        label: 'MENUITEMS.TABLES.TEXT',
        subItems: [
            {
                id: 111,
                label: 'MENUITEMS.TABLES.LIST.BASIC',
                link: 'tables/basic',
                parentId: 110
            },
            {
                id: 112,
                label: 'MENUITEMS.TABLES.LIST.ADVANCED',
                link: 'tables/advanced',
                parentId: 110
            }
        ]
    },
    {
        id: 113,
        icon: 'bxs-bar-chart-alt-2',
        label: 'MENUITEMS.CHARTS.TEXT',
        subItems: [
            {
                id: 114,
                label: 'MENUITEMS.CHARTS.LIST.APEX',
                link: 'charts/apex',
                parentId: 113
            },
            {
                id: 115,
                label: 'MENUITEMS.CHARTS.LIST.CHARTJS',
                link: 'charts/chartjs',
                parentId: 113
            },
            {
                id: 116,
                label: 'MENUITEMS.CHARTS.LIST.CHARTIST',
                link: 'charts/chartist',
                parentId: 113
            },
            {
                id: 117,
                label: 'MENUITEMS.CHARTS.LIST.ECHART',
                link: 'charts/echart',
                parentId: 113
            }
        ]
    },
    {
        id: 118,
        label: 'MENUITEMS.ICONS.TEXT',
        icon: 'bx-aperture',
        subItems: [
            {
                id: 119,
                label: 'MENUITEMS.ICONS.LIST.BOXICONS',
                link: 'icons/boxicons',
                parentId: 118
            },
            {
                id: 120,
                label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
                link: 'icons/materialdesign',
                parentId: 118
            },
            {
                id: 121,
                label: 'MENUITEMS.ICONS.LIST.DRIPICONS',
                link: 'icons/dripicons',
                parentId: 118
            },
            {
                id: 122,
                label: 'MENUITEMS.ICONS.LIST.FONTAWESOME',
                link: 'icons/fontawesome',
                parentId: 118
            },
        ]
    },
    {
        id: 123,
        label: 'MENUITEMS.MAPS.TEXT',
        icon: 'bx-map',
        subItems: [
            {
                id: 124,
                label: 'MENUITEMS.MAPS.LIST.GOOGLEMAP',
                link: 'maps/google',
                parentId: 123
            }
        ]
    },
    {
        id: 125,
        label: 'MENUITEMS.MULTILEVEL.TEXT',
        icon: 'bx-share-alt',
        subItems: [
            {
                id: 126,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
                link: '#',
                parentId: 125
            },
            {
                id: 127,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
                parentId: 125,
                subItems: [
                    {
                        id: 128,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
                        parentId: 127,
                    },
                    {
                        id: 129,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
                        parentId: 127,
                    }
                ]
            },
        ]
    }
];



/*export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
                link: '/dashboard',
                parentId: 2
            },
            {
                id: 4,
                label: 'MENUITEMS.DASHBOARDS.LIST.SAAS',
                link: '/dashboards/saas',
                parentId: 2
            },
            {
                id: 5,
                label: 'MENUITEMS.DASHBOARDS.LIST.CRYPTO',
                link: '/dashboards/crypto',
                parentId: 2
            },
            {
                id: 6,
                label: 'MENUITEMS.DASHBOARDS.LIST.BLOG',
                link: '/dashboards/blog',
                parentId: 2
            },
            {
                id: 7,
                label: 'MENUITEMS.DASHBOARDS.LIST.JOBS',
                link: '/dashboards/jobs',
                parentId: 2,
            },
        ]
    },
    {
        id: 8,
        isLayout: true
    },
    {
        id: 9,
        label: 'MENUITEMS.APPS.TEXT',
        isTitle: true
    },
    {
        id: 10,
        label: 'MENUITEMS.CALENDAR.TEXT',
        icon: 'bx-calendar',
        link: '/calendar',
    },
    {
        id: 11,
        label: 'MENUITEMS.CHAT.TEXT',
        icon: 'bx-chat',
        link: '/chat',
        
    },
    {
        id: 12,
        label: 'MENUITEMS.FILEMANAGER.TEXT',
        icon: 'bx-file',
        link: '/filemanager',
    },
    {
        id: 13,
        label: 'MENUITEMS.ECOMMERCE.TEXT',
        icon: 'bx-store',
        subItems: [
            {
                id: 14,
                label: 'MENUITEMS.ECOMMERCE.LIST.PRODUCTS',
                link: '/ecommerce/products',
                parentId: 13
            },
            {
                id: 15,
                label: 'MENUITEMS.ECOMMERCE.LIST.PRODUCTDETAIL',
                link: '/ecommerce/product-detail/1',
                parentId: 13
            },
            {
                id: 16,
                label: 'MENUITEMS.ECOMMERCE.LIST.ORDERS',
                link: '/ecommerce/orders',
                parentId: 13
            },
            {
                id: 17,
                label: 'MENUITEMS.ECOMMERCE.LIST.CUSTOMERS',
                link: '/ecommerce/customers',
                parentId: 13
            },
            {
                id: 18,
                label: 'MENUITEMS.ECOMMERCE.LIST.CART',
                link: '/ecommerce/cart',
                parentId: 13
            },
            {
                id: 19,
                label: 'MENUITEMS.ECOMMERCE.LIST.CHECKOUT',
                link: '/ecommerce/checkout',
                parentId: 13
            },
            {
                id: 20,
                label: 'MENUITEMS.ECOMMERCE.LIST.SHOPS',
                link: '/ecommerce/shops',
                parentId: 13
            },
            {
                id: 21,
                label: 'MENUITEMS.ECOMMERCE.LIST.ADDPRODUCT',
                link: '/ecommerce/add-product',
                parentId: 13
            },
        ]
    },
    {
        id: 22,
        label: 'MENUITEMS.CRYPTO.TEXT',
        icon: 'bx-bitcoin',
        subItems: [
            {
                id: 23,
                label: 'MENUITEMS.CRYPTO.LIST.WALLET',
                link: '/crypto/wallet',
                parentId: 22
            },
            {
                id: 24,
                label: 'MENUITEMS.CRYPTO.LIST.BUY/SELL',
                link: '/crypto/buy-sell',
                parentId: 22
            },
            {
                id: 25,
                label: 'MENUITEMS.CRYPTO.LIST.EXCHANGE',
                link: '/crypto/exchange',
                parentId: 22
            },
            {
                id: 26,
                label: 'MENUITEMS.CRYPTO.LIST.LENDING',
                link: '/crypto/lending',
                parentId: 22
            },
            {
                id: 27,
                label: 'MENUITEMS.CRYPTO.LIST.ORDERS',
                link: '/crypto/orders',
                parentId: 22
            },
            {
                id: 28,
                label: 'MENUITEMS.CRYPTO.LIST.KYCAPPLICATION',
                link: '/crypto/kyc-application',
                parentId: 22
            },
            {
                id: 29,
                label: 'MENUITEMS.CRYPTO.LIST.ICOLANDING',
                link: '/crypto-ico-landing',
                parentId: 22
            }
        ]
    },
    {
        id: 30,
        label: 'MENUITEMS.EMAIL.TEXT',
        icon: 'bx-envelope',
        subItems: [
            {
                id: 31,
                label: 'MENUITEMS.EMAIL.LIST.INBOX',
                link: '/email/inbox',
                parentId: 30
            },
            {
                id: 32,
                label: 'MENUITEMS.EMAIL.LIST.READEMAIL',
                link: '/email/read/1',
                parentId: 30
            },
            {
                id: 33,
                label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.TEXT',
                badge: {
                    variant: 'success',
                    text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
                },
                parentId: 30,
                subItems: [
                    {
                        id:34,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BASIC',
                        link: '/email/basic',
                        parentId:30 
                    },
                    {
                        id:35,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.ALERT',
                        link: '/email/alert',
                        parentId:30
                    },
                    {
                        id:36,
                        label: 'MENUITEMS.EMAIL.LIST.TEMPLATE.LIST.BILLING',
                        link: '/email/billing',
                        parentId:30
                    }
                ]
            }
        ]
    },
    {
        id: 37,
        label: 'MENUITEMS.INVOICES.TEXT',
        icon: 'bx-receipt',
        subItems: [
            {
                id: 38,
                label: 'MENUITEMS.INVOICES.LIST.INVOICELIST',
                link: '/invoices/list',
                parentId: 37
            },
            {
                id: 39,
                label: 'MENUITEMS.INVOICES.LIST.INVOICEDETAIL',
                link: '/invoices/detail',
                parentId: 37
            },
        ]
    },
    {
        id: 40,
        label: 'MENUITEMS.PROJECTS.TEXT',
        icon: 'bx-briefcase-alt-2',
        subItems: [
            {
                id: 41,
                label: 'MENUITEMS.PROJECTS.LIST.GRID',
                link: '/projects/grid',
                parentId: 40
            },
            {
                id: 42,
                label: 'MENUITEMS.PROJECTS.LIST.PROJECTLIST',
                link: '/projects/list',
                parentId: 40
            },
            {
                id: 43,
                label: 'MENUITEMS.PROJECTS.LIST.OVERVIEW',
                link: '/projects/overview',
                parentId: 40
            },
            {
                id: 44,
                label: 'MENUITEMS.PROJECTS.LIST.CREATE',
                link: '/projects/create',
                parentId: 40
            }
        ]
    },
    {
        id: 45,
        label: 'MENUITEMS.TASKS.TEXT',
        icon: 'bx-task',
        subItems: [
            {
                id: 46,
                label: 'MENUITEMS.TASKS.LIST.TASKLIST',
                link: '/tasks/list',
                parentId: 45
            },
            {
                id: 47,
                label: 'MENUITEMS.TASKS.LIST.KANBAN',
                link: '/tasks/kanban',
                parentId: 45
            },
            {
                id: 48,
                label: 'MENUITEMS.TASKS.LIST.CREATETASK',
                link: '/tasks/create',
                parentId: 45
            }
        ]
    },
    {
        id: 49,
        label: 'MENUITEMS.CONTACTS.TEXT',
        icon: 'bxs-user-detail',
        subItems: [
            {
                id: 50,
                label: 'MENUITEMS.CONTACTS.LIST.USERGRID',
                link: '/contacts/grid',
                parentId: 49
            },
            {
                id: 51,
                label: 'MENUITEMS.CONTACTS.LIST.USERLIST',
                link: '/contacts/list',
                parentId: 49
            },
            {
                id: 52,
                label: 'MENUITEMS.CONTACTS.LIST.PROFILE',
                link: '/contacts/profile',
                parentId: 49
            }
        ]
    },
    {
        id: 53,
        label: 'MENUITEMS.BLOG.TEXT',
        icon: 'bx-file',
        subItems: [
            {
                id: 54,
                label: 'MENUITEMS.BLOG.LIST.BLOGLIST',
                link: '/blog/list',
                parentId: 53
            },
            {
                id: 55,
                label: 'MENUITEMS.BLOG.LIST.BLOGGRID',
                link: '/blog/grid',
                parentId: 53
            },
            {
                id: 56,
                label: 'MENUITEMS.BLOG.LIST.DETAIL',
                link: '/blog/detail',
                parentId: 53
            },
        ]
    },
    {
        id: 57,
        label: 'MENUITEMS.JOBS.TEXT',
        icon: 'bx-briefcase-alt',
        subItems: [
            {
                id: 58,
                label: 'MENUITEMS.JOBS.LIST.JOBLIST',
                link: '/jobs/list',
                parentId: 57
            },
            {
                id: 59,
                label: 'MENUITEMS.JOBS.LIST.JOBGRID',
                link: '/jobs/grid',
                parentId: 57
            },
            {
                id: 60,
                label: 'MENUITEMS.JOBS.LIST.APPLYJOB',
                link: '/jobs/apply',
                parentId: 57
            },
            {
                id: 61,
                label: 'MENUITEMS.JOBS.LIST.JOBDETAILS',
                link: '/jobs/details',
                parentId: 57
            },
            {
                id: 62,
                label: 'MENUITEMS.JOBS.LIST.JOBCATEGORIES',
                link: '/jobs/categories',
                parentId: 57
            },
            {
                id: 63,
                label: 'MENUITEMS.JOBS.LIST.CANDIDATE.TEXT',
                badge: {
                    variant: 'success',
                    text: 'MENUITEMS.EMAIL.LIST.TEMPLATE.BADGE',
                },
                parentId: 57,
                subItems: [
                    {
                        id:64,
                        label: 'MENUITEMS.JOBS.LIST.CANDIDATE.LIST.LIST',
                        link: '/jobs/candidate-list',
                        parentId:57 
                    },
                    {
                        id:65,
                        label: 'MENUITEMS.JOBS.LIST.CANDIDATE.LIST.OVERVIEW',
                        link: '/jobs/candidate-overview',
                        parentId:57
                    }
                ]
            }
        ]
    },
    {
        id: 66,
        label: 'MENUITEMS.PAGES.TEXT',
        isTitle: true
    },
    {
        id: 67,
        label: 'MENUITEMS.AUTHENTICATION.TEXT',
        icon: 'bx-user-circle',
        subItems: [
            {
                id: 68,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN',
                link: '/account/login',
                parentId: 67
            },
            {
                id: 69,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOGIN2',
                link: '/account/login-2',
                parentId: 67
            },
            {
                id: 70,
                label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER',
                link: '/account/signup',
                parentId: 67
            },
            {
                id: 71,
                label: 'MENUITEMS.AUTHENTICATION.LIST.REGISTER2',
                link: '/account/signup-2',
                parentId: 67
            },
            {
                id: 72,
                label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD',
                link: '/account/reset-password',
                parentId: 67
            },
            {
                id: 73,
                label: 'MENUITEMS.AUTHENTICATION.LIST.RECOVERPWD2',
                link: '/account/recoverpwd-2',
                parentId: 67
            },
            {
                id: 74,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN',
                link: '/pages/lock-screen-1',
                parentId: 67
            },
            {
                id: 75,
                label: 'MENUITEMS.AUTHENTICATION.LIST.LOCKSCREEN2',
                link: '/pages/lock-screen-2',
                parentId: 67
            },
            {
                id: 76,
                label: 'MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL',
                link: '/pages/confirm-mail',
                parentId: 67
            },
            {
                id: 77,
                label: 'MENUITEMS.AUTHENTICATION.LIST.CONFIRMMAIL2',
                link: '/pages/confirm-mail-2',
                parentId: 67
            },
            {
                id: 78,
                label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION',
                link: '/pages/email-verification',
                parentId: 67
            },
            {
                id: 79,
                label: 'MENUITEMS.AUTHENTICATION.LIST.EMAILVERIFICATION2',
                link: '/pages/email-verification-2',
                parentId: 67
            },
            {
                id: 80,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION',
                link: '/pages/two-step-verification',
                parentId: 67
            },
            {
                id: 81,
                label: 'MENUITEMS.AUTHENTICATION.LIST.TWOSTEPVERIFICATION2',
                link: '/pages/two-step-verification-2',
                parentId: 67
            }
        ]
    },
    {
        id: 82,
        label: 'MENUITEMS.UTILITY.TEXT',
        icon: 'bx-file',
        subItems: [
            {
                id: 83,
                label: 'MENUITEMS.UTILITY.LIST.STARTER',
                link: '/pages/starter',
                parentId: 82
            },
            {
                id: 84,
                label: 'MENUITEMS.UTILITY.LIST.MAINTENANCE',
                link: '/pages/maintenance',
                parentId: 82
            },
            {
                id: 85,
                label: 'Coming Soon',
                link: '/pages/coming-soon',
                parentId: 82
            },
            {
                id: 86,
                label: 'MENUITEMS.UTILITY.LIST.TIMELINE',
                link: '/pages/timeline',
                parentId: 82
            },
            {
                id: 87,
                label: 'MENUITEMS.UTILITY.LIST.FAQS',
                link: '/pages/faqs',
                parentId: 82
            },
            {
                id: 88,
                label: 'MENUITEMS.UTILITY.LIST.PRICING',
                link: '/pages/pricing',
                parentId: 82
            },
            {
                id: 89,
                label: 'MENUITEMS.UTILITY.LIST.ERROR404',
                link: '/pages/404',
                parentId: 82
            },
            {
                id: 90,
                label: 'MENUITEMS.UTILITY.LIST.ERROR500',
                link: '/pages/500',
                parentId: 82
            },
        ]
    },
    {
        id: 91,
        label: 'MENUITEMS.COMPONENTS.TEXT',
        isTitle: true
    },
    {
        id: 92,
        label: 'MENUITEMS.UIELEMENTS.TEXT',
        icon: 'bx-tone',
        subItems: [
            {
                id: 93,
                label: 'MENUITEMS.UIELEMENTS.LIST.ALERTS',
                link: '/ui/alerts',
                parentId: 92
            },
            {
                id: 94,
                label: 'MENUITEMS.UIELEMENTS.LIST.BUTTONS',
                link: '/ui/buttons',
                parentId: 92
            },
            {
                id: 95,
                label: 'MENUITEMS.UIELEMENTS.LIST.CARDS',
                link: '/ui/cards',
                parentId: 92
            },
            {
                id: 96,
                label: 'MENUITEMS.UIELEMENTS.LIST.CAROUSEL',
                link: '/ui/carousel',
                parentId: 92
            },
            {
                id: 97,
                label: 'MENUITEMS.UIELEMENTS.LIST.DROPDOWNS',
                link: '/ui/dropdowns',
                parentId: 92
            },
            {
                id: 98,
                label: 'MENUITEMS.UIELEMENTS.LIST.GRID',
                link: '/ui/grid',
                parentId: 92
            },
            {
                id: 99,
                label: 'MENUITEMS.UIELEMENTS.LIST.IMAGES',
                link: '/ui/images',
                parentId: 92
            },
            {
                id: 100,
                label: 'MENUITEMS.UIELEMENTS.LIST.LIGHTBOX',
                link: '/ui/lightbox',
                parentId: 92
            },
            {
                id: 101,
                label: 'MENUITEMS.UIELEMENTS.LIST.MODALS',
                link: '/ui/modals',
                parentId: 92
            },
            {
                id: 102,
                label: 'MENUITEMS.UIELEMENTS.LIST.RANGESLIDER',
                link: '/ui/rangeslider',
                parentId: 92
            },
            {
                id: 103,
                label: 'MENUITEMS.UIELEMENTS.LIST.PROGRESSBAR',
                link: '/ui/progressbar',
                parentId: 92
            },
            {
                id: 104,
                label: 'MENUITEMS.UIELEMENTS.LIST.PLACEHOLDER',
                link: '/ui/placeholder',
                parentId: 92
            },
            {
                id: 105,
                label: 'MENUITEMS.UIELEMENTS.LIST.SWEETALERT',
                link: '/ui/sweet-alert',
                parentId: 92
            },
            {
                id: 106,
                label: 'MENUITEMS.UIELEMENTS.LIST.TABS',
                link: '/ui/tabs-accordions',
                parentId: 92
            },
            {
                id: 107,
                label: 'MENUITEMS.UIELEMENTS.LIST.TYPOGRAPHY',
                link: '/ui/typography',
                parentId: 92
            },
            {
                id: 108,
                label: 'MENUITEMS.UIELEMENTS.LIST.TOASTS',
                link: '/ui/toasts',
                parentId: 92
            },
            {
                id: 109,
                label: 'MENUITEMS.UIELEMENTS.LIST.VIDEO',
                link: '/ui/video',
                parentId: 92
            },
            {
                id: 110,
                label: 'MENUITEMS.UIELEMENTS.LIST.GENERAL',
                link: '/ui/general',
                parentId: 92
            },
            {
                id: 111,
                label: 'MENUITEMS.UIELEMENTS.LIST.COLORS',
                link: '/ui/colors',
                parentId: 92
            },
            {
                id: 112,
                label: 'MENUITEMS.UIELEMENTS.LIST.RATING',
                link: '/ui/rating',
                parentId: 92
            },
            {
                id: 113,
                label: 'MENUITEMS.UIELEMENTS.LIST.NOTIFICATION',
                link: '/ui/notification',
                parentId: 92
            },
            {
                id: 114,
                label: 'MENUITEMS.UIELEMENTS.LIST.UTILITIES',
                link: '/ui/utilities',
                parentId: 92
            },
            {
                id: 115,
                label: 'MENUITEMS.UIELEMENTS.LIST.CROPPER',
                link: '/ui/image-crop',
                parentId: 92
            },
        ]
    },
    {
        id: 116,
        label: 'MENUITEMS.FORMS.TEXT',
        icon: 'bxs-eraser',
        badge: {
            variant: 'danger',
            text: 'MENUITEMS.FORMS.BADGE',
        },
        subItems: [
            {
                id: 117,
                label: 'MENUITEMS.FORMS.LIST.ELEMENTS',
                link: '/form/elements',
                parentId: 116
            },
            {
                id: 118,
                label: 'MENUITEMS.FORMS.LIST.LAYOUTS',
                link: '/form/layouts',
                parentId: 116
            },
            {
                id: 119,
                label: 'MENUITEMS.FORMS.LIST.VALIDATION',
                link: '/form/validation',
                parentId: 116
            },
            {
                id: 120,
                label: 'MENUITEMS.FORMS.LIST.ADVANCED',
                link: '/form/advanced',
                parentId: 116
            },
            {
                id: 121,
                label: 'MENUITEMS.FORMS.LIST.EDITOR',
                link: '/form/editor',
                parentId: 116
            },
            {
                id: 122,
                label: 'MENUITEMS.FORMS.LIST.FILEUPLOAD',
                link: '/form/uploads',
                parentId: 116
            },
            {
                id: 123,
                label: 'MENUITEMS.FORMS.LIST.REPEATER',
                link: '/form/repeater',
                parentId: 116
            },
            {
                id: 124,
                label: 'MENUITEMS.FORMS.LIST.WIZARD',
                link: '/form/wizard',
                parentId: 116
            },
            {
                id: 125,
                label: 'MENUITEMS.FORMS.LIST.MASK',
                link: '/form/mask',
                parentId: 116
            }
        ]
    },
    {
        id: 126,
        icon: 'bx-list-ul',
        label: 'MENUITEMS.TABLES.TEXT',
        subItems: [
            {
                id: 127,
                label: 'MENUITEMS.TABLES.LIST.BASIC',
                link: '/tables/basic',
                parentId: 126
            },
            {
                id: 128,
                label: 'MENUITEMS.TABLES.LIST.DataTables',
                link: '/tables/advanced',
                parentId: 126
            }
        ]
    },
    {
        id: 130,
        icon: 'bxs-bar-chart-alt-2',
        label: 'MENUITEMS.CHARTS.TEXT',
        subItems: [
            {
                id: 131,
                label: 'MENUITEMS.CHARTS.LIST.APEX',
                link: '/charts/apex',
                parentId: 130
            },
            {
                id: 132,
                label: 'MENUITEMS.CHARTS.LIST.CHARTJS',
                link: '/charts/chartjs',
                parentId: 131
            },
            {
                id: 133,
                label: 'MENUITEMS.CHARTS.LIST.CHARTIST',
                link: '/charts/chartist',
                parentId: 131
            },
            {
                id: 134,
                label: 'MENUITEMS.CHARTS.LIST.ECHART',
                link: '/charts/echart',
                parentId: 131
            }
        ]
    },
    {
        id: 135,
        label: 'MENUITEMS.ICONS.TEXT',
        icon: 'bx-aperture',
        subItems: [
            {
                id: 136,
                label: 'MENUITEMS.ICONS.LIST.BOXICONS',
                link: '/icons/boxicons',
                parentId: 135
            },
            {
                id: 137,
                label: 'MENUITEMS.ICONS.LIST.MATERIALDESIGN',
                link: '/icons/materialdesign',
                parentId: 135
            },
            {
                id: 138,
                label: 'MENUITEMS.ICONS.LIST.DRIPICONS',
                link: '/icons/dripicons',
                parentId: 135
            },
            {
                id: 139,
                label: 'MENUITEMS.ICONS.LIST.FONTAWESOME',
                link: '/icons/fontawesome',
                parentId: 135
            },
        ]
    },
    {
        id: 140,
        label: 'MENUITEMS.MAPS.TEXT',
        icon: 'bx-map',
        subItems: [
            // {
            //     id: 141,
            //     label: 'MENUITEMS.MAPS.LIST.GOOGLEMAP',
            //     link: '/maps/google',
            //     parentId: 140
            // },
            {
                id: 142,
                label: 'MENUITEMS.MAPS.LIST.LEAFLETMAP',
                link: '/maps/leaflet',
                parentId: 140
            }
        ]
    },
    {
        id: 143,
        label: 'MENUITEMS.MULTILEVEL.TEXT',
        icon: 'bx-share-alt',
        subItems: [
            {
                id: 144,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
                parentId: 143
            },
            {
                id: 145,
                label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
                parentId: 143,
                subItems: [
                    {
                        id: 146,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
                        parentId: 145,
                    },
                    {
                        id: 147,
                        label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
                        parentId:145,
                    }
                ]
            },
        ]
    }
];*/


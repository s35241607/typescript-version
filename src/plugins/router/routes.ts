export const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/pages/Home.vue'),
        meta: { breadcrumb: 'Home' },
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/dashboard.vue'),
        meta: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'account-settings',
        name: 'AccountSettings',
        component: () => import('@/pages/account-settings.vue'),
        meta: { breadcrumb: 'Account Settings' },
      },
      {
        path: 'typography',
        name: 'Typography',
        component: () => import('@/pages/typography.vue'),
        meta: { breadcrumb: 'Typography' },
      },
      {
        path: 'users',
        name: 'UserList',
        component: () => import('@/pages/User/UserListPage.vue'),
        meta: { breadcrumb: 'Users' },
      },
      {
        path: 'users/:username',
        name: 'UserDetail',
        component: () => import('@/pages/User/UserDetailPage.vue'),
        meta: { breadcrumb: ':username' },
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/pages/Test/TestPage.vue'),
        meta: { breadcrumb: 'Test' },
      },
      {
        path: 'test/price-table',
        name: 'TestPriceTable',
        component: () => import('@/pages/Test/TestPriceTablePage.vue'),
        meta: { breadcrumb: 'TestPriceTable' },
      },
      {
        path: 'test/price-table/:id',
        name: 'TestPriceTableDetail',
        component: () => import('@/pages/Test/TestPriceTableDetailPage.vue'),
        meta: { breadcrumb: 'Detail' },
      },
      {
        path: 'icons',
        name: 'Icons',
        component: () => import('@/pages/icons.vue'),
        meta: { breadcrumb: 'Icons' },
      },
      {
        path: 'cards',
        name: 'Cards',
        component: () => import('@/pages/cards.vue'),
        meta: { breadcrumb: 'Cards' },
      },
      {
        path: 'tables',
        name: 'Tables',
        component: () => import('@/pages/tables.vue'),
        meta: { breadcrumb: 'Tables' },
      },
      {
        path: 'form-layouts',
        name: 'FormLayouts',
        component: () => import('@/pages/form-layouts.vue'),
        meta: { breadcrumb: 'Form Layouts' },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/login.vue'),
        meta: { breadcrumb: 'Login' },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/pages/register.vue'),
        meta: { breadcrumb: 'Register' },
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'Error',
        component: () => import('@/pages/[...error].vue'),
        meta: { breadcrumb: 'Error' },
      },
    ],
  },
]

const MainLayout = () => import('@/layout/MainLayout')

export default [
  {
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/modules/home')
  },
  {
    path: '/article',
    component: MainLayout,
    children: [
      {
        path: 'list/:workspace',
        name: 'article',
        component: () => import('@/modules/article'),
        props: true
      }
    ]
  }
]
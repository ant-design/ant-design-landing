module.exports = {
  routes:
  {
    path: '/',
    component: './template/index',
    childRoutes: [
      {
        path: 'index-cn',
        component: './template/index',
      },
    ],
  },
};

/// / 새로고침&url직접 접근 불가 체크 필요시 호출
// import RoutePramGoverness from '@/kindergarten/governesses/RoutePramGoverness'

function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ '@/views/' + view + '.vue')
}

function loadLayout (layout) {
  return () => import(`@/components/layout/${layout}.vue`)
}

const loadViewHeaderFooterSide = view => {
  return {
    default: loadView(view),
    sidebar: loadLayout('main-sidebar'),
    footer: loadLayout('main-footer'),
    header: loadLayout('main-navbar')
  }
}

const parent = (parentName) => {
  return {
    default: {
      name: parentName,
      template: '<router-view></router-view>'
    },
    header: loadLayout('main-navbar'),
    footer: loadLayout('main-footer')
  }
}

// 라우트 대상 정의 (url추가시 여기에)
let routes = [
  {
    path: '/',
    name: 'user-board',
    components: loadViewHeaderFooterSide('user-board'),
    props: {
      header: {},
      sidebar: {},
      footer: {}
    },
    meta: {
      title: 'home.title'
    }
  },
  {
    path: '/user',
    name: 'user',
    components: parent('user'),
    props: {
      header: {},
      footer: {}
    },
    children: [{
      path: 'register',
      name: 'user-register',
      component: loadView('user-register'),
      meta: {
        title: 'user.register'
      }
    },
    {
      path: 'login',
      name: 'user-login',
      component: loadView('user-login'),
      meta: {
        title: 'user.login'
      }
    },
    {
      path: 'post',
      name: 'user-post',
      component: loadView('user-post'),
      meta: {
        title: 'user.post'
      }
    },
    {
      path: 'bookmark',
      name: 'user-bookmark',
      component: loadView('user-bookmark'),
      meta: {
        title: 'user.bookmark'
      }
    },
    {
      path: 'my-page',
      name: 'user-my-page',
      component: loadView('user-my-page'),
      meta: {
        title: 'user.my-page'
      }
    }
    // {
    //   path: 'agree',
    //   name: 'user-agree',
    //   component: loadView('user-agree'),
    //   meta: {
    //     title: 'user.register'
    //   }
    // },
    // {
    //   path: 'find/id',
    //   name: 'user-find-id',
    //   component: loadView('user-find-id'),
    //   meta: {
    //     title: 'user.find.id'
    //   }
    // },
    // {
    //   path: 'find/pwd',
    //   name: 'user-find-pwd',
    //   component: loadView('user-find-pwd'),
    //   meta: {
    //     title: 'user.find.pw'
    //   }
    // },
    // {
    //   path: 'modify/pwd/:userId/:expireDate/:hash',
    //   name: 'user-modify-pwd',
    //   component: loadView('user-modify-pwd'),
    //   meta: {
    //     title: 'user.change_password'
    //   }
    // }
    ]
  }
]

routes.push({
  path: '*',
  redirect: {
    name: 'user-board'
  }
})

export default routes

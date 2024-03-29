function loadView (view) {
  return () => import(/* webpackChunkName: "view-[request]" */ '@/views/' + view + '.vue')
}

function loadLayout (layout) {
  return () => import(`@/components/layout/${layout}.vue`)
}

// const loadViewHeaderFooterSide = view => {
//   return {
//     default: loadView(view),
//     sidebar: loadLayout('main-sidebar'),
//     footer: loadLayout('main-footer'),
//     header: loadLayout('main-navbar')
//   }
// }

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
    name: 'user-load-page',
    component: loadView('user-load-page'),
    meta: {
      title: 'user-load-page'
    }
  },
  {
    path: '/user/login',
    name: 'user-login',
    component: loadView('user-login'),
    meta: {
      title: '로그인'
    }
  },
  {
    path: '/user/register',
    name: 'user-register',
    component: loadView('user-register'),
    meta: {
      title: '회원가입'
    }
  },
  {
    path: '/user/reset-password',
    name: 'user-reset-password',
    component: loadView('user-reset-password'),
    meta: {
      title: '비밀번호 찾기'
    }
  },
  {
    path: '/user/my-board',
    name: 'user-my-board',
    component: loadView('user-my-board'),
    meta: {
      title: '내가 쓴 글',
      perimeter: 'userPerimeter'
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
    children: [
      {
        path: 'board',
        name: 'user-board',
        component: loadView('user-board'),
        meta: {
          title: '책장',
          perimeter: 'userPerimeter'
        }
      },
      {
        path: 'post',
        name: 'user-post',
        component: loadView('user-post'),
        meta: {
          title: '글쓰기'
        }
      },
      {
        path: 'bookmark',
        name: 'user-bookmark',
        component: loadView('user-bookmark'),
        meta: {
          title: '책갈피'
        }
      },
      {
        path: 'my-page',
        name: 'user-my-page',
        component: loadView('user-my-page'),
        meta: {
          title: '마이페이지'
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    components: parent('admin'),
    props: {
      header: {},
      footer: {}
    },
    meta: {
    },
    children: [{
      path: 'board',
      name: 'admin-board',
      component: loadView('admin-board'),
      meta: {
        title: '[관리자] 책 목록 조회',
        perimeter: 'adminPerimeter'
      }
    },
    {
      path: 'my-page',
      name: 'admin-my-page',
      component: loadView('admin-my-page'),
      meta: {
        title: '[관리자] 마이페이지'
      }
    }]
  }
]

routes.push({
  path: '*',
  redirect: {
    name: 'user-login'
  }
})

export default routes

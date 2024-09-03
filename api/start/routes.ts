import router from '@adonisjs/core/services/router'

const CategoriesController = () => import('#controllers/categories_controller')
const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/signup', [AuthController, 'signup'])
    router.get('/check', [AuthController, 'check'])
    router.get('/me', [AuthController, 'me'])

    router.get('/categories', [CategoriesController, 'index'])
    router.get('/categories/:id', [CategoriesController, 'show'])
    router.post('/categories', [CategoriesController, 'store'])
    router.patch('/categories/:id', [CategoriesController, 'update'])
    router.delete('/categories/:id', [CategoriesController, 'destroy'])
  })
  .prefix('api')

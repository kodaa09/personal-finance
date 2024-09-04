import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const TransactionsController = () => import('#controllers/transactions_controller')
const GoalsController = () => import('#controllers/goals_controller')
const GoalTransactionsController = () => import('#controllers/goal_transactions_controller')
const CategoriesController = () => import('#controllers/categories_controller')
const AuthController = () => import('#controllers/auth_controller')

router
  .group(() => {
    router.post('/login', [AuthController, 'login'])
    router.post('/signup', [AuthController, 'signup'])
    router.get('/check', [AuthController, 'check'])
    router.get('/me', [AuthController, 'me'])

    router.get('/categories', [CategoriesController, 'index']).use(middleware.auth())
    router.get('/categories/:id', [CategoriesController, 'show']).use(middleware.auth())
    router.post('/categories', [CategoriesController, 'store']).use(middleware.auth())
    router.patch('/categories/:id', [CategoriesController, 'update']).use(middleware.auth())
    router.delete('/categories/:id', [CategoriesController, 'destroy']).use(middleware.auth())

    router.get('/transactions', [TransactionsController, 'index']).use(middleware.auth())
    router.get('/transactions/:id', [TransactionsController, 'show']).use(middleware.auth())
    router.post('/transactions', [TransactionsController, 'store']).use(middleware.auth())
    router.patch('/transactions/:id', [TransactionsController, 'update']).use(middleware.auth())
    router.delete('/transactions/:id', [TransactionsController, 'destroy']).use(middleware.auth())

    router.get('/goals', [GoalsController, 'index']).use(middleware.auth())
    router.get('/goals/:id', [GoalsController, 'show']).use(middleware.auth())
    router.post('/goals', [GoalsController, 'store']).use(middleware.auth())
    router.patch('/goals/:id', [GoalsController, 'update']).use(middleware.auth())
    router.delete('/goals/:id', [GoalsController, 'destroy']).use(middleware.auth())

    // router.get('/goal-transactions', [GoalTransactionsController, 'index'])
    router
      .get('/goal-transactions/:id', [GoalTransactionsController, 'show'])
      .use(middleware.auth())
    router.post('/goal-transactions', [GoalTransactionsController, 'store']).use(middleware.auth())
    router
      .patch('/goal-transactions/:id', [GoalTransactionsController, 'update'])
      .use(middleware.auth())
    router
      .delete('/goal-transactions/:id', [GoalTransactionsController, 'destroy'])
      .use(middleware.auth())
  })
  .prefix('api')

import router from '@adonisjs/core/services/router'

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

    router.get('/categories', [CategoriesController, 'index'])
    router.get('/categories/:id', [CategoriesController, 'show'])
    router.post('/categories', [CategoriesController, 'store'])
    router.patch('/categories/:id', [CategoriesController, 'update'])
    router.delete('/categories/:id', [CategoriesController, 'destroy'])

    router.get('/transactions', [TransactionsController, 'index'])
    router.get('/transactions/:id', [TransactionsController, 'show'])
    router.post('/transactions', [TransactionsController, 'store'])
    router.patch('/transactions/:id', [TransactionsController, 'update'])
    router.delete('/transactions/:id', [TransactionsController, 'destroy'])

    router.get('/goals', [GoalsController, 'index'])
    router.get('/goals/:id', [GoalsController, 'show'])
    router.post('/goals', [GoalsController, 'store'])
    router.patch('/goals/:id', [GoalsController, 'update'])
    router.delete('/goals/:id', [GoalsController, 'destroy'])

    // router.get('/goal-transactions', [GoalTransactionsController, 'index'])
    router.get('/goal-transactions/:id', [GoalTransactionsController, 'show'])
    router.post('/goal-transactions', [GoalTransactionsController, 'store'])
    router.patch('/goal-transactions/:id', [GoalTransactionsController, 'update'])
    router.delete('/goal-transactions/:id', [GoalTransactionsController, 'destroy'])
  })
  .prefix('api')

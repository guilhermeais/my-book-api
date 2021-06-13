import Route from '@ioc:Adonis/Core/Route'

Route.post('/users/register', 'User/Register.store')
Route.get('/users/register/:key', 'User/Register.show')

Route.post('/users/forgot-password', 'User/ForgotPassword.store')
Route.get('/users/forgot-password/:key', 'User/ForgotPassword.show')
Route.put('/users/forgot-password', 'User/ForgotPassword.update')

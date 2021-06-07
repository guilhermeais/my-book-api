import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {User} from 'App/Models'
import {StoreValidator} from 'App/Validators/User/Register'
import faker from 'faker'
import Mail from '@ioc:Adonis/Addons/Mail'
import DataBase from '@ioc:Adonis/Lucid/Database'

export default class UserRegisterController {
  public async store ({request}: HttpContextContract) {
    const {username, name, email,password, redirectUrl} = await request.validate(StoreValidator)
    const response = DataBase.transaction(async(trans)=>{
     
      const user = await (await User.create({username, name,email, password})).useTransaction(trans)
      await user.save()
      const key = faker.datatype.uuid()+user.id
      user.related('keys').create({key})
  
      const linkEmail = `${redirectUrl.replace(/\/$/, '')}/${key}`
  
      await Mail.send((message)=>{
        message.to(user.email)
        message.from('contato@mybook.com', 'MyBook')
        message.subject('Confirmação de E-mail')
        message.htmlView('emails/verify_email', {linkEmail})
      })

      return user
    })
   return response
  }

  public async edit ({}: HttpContextContract) {
  }

  public async update ({}: HttpContextContract) {
  }

  public async destroy ({}: HttpContextContract) {
  }
}

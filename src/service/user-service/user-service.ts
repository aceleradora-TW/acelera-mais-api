import {
  inviteEmailContent,
  rememberEmailContent,
} from "@messages/email/content"
import { User } from "@models/entity/User"
import { EmailService } from "@service/email/EmailService"
import { HttpError, HttpStatusCode } from "@service/HttpError"
import { validate } from "class-validator"
import { getRepository } from "typeorm"
import { UserRequest } from "./user-request"
import md5 from "md5"
import { getSkip } from "../../utils/getSkip"

export const userService = (request) => {
  const userRepository = getRepository(User)
  const sendEmail = (user, context) => {
    const { from, subject, content } = context
    EmailService().send(from, subject, user.email, content(user))
  }

  const resendEmail = async () => {
    const { id, encryptedPassword, decodedPassword, flag } =
      UserRequest(request).getUserForResendEmail()

    const userEntity = await userRepository.findOneOrFail({ where: { id } })
    userEntity.password = encryptedPassword
    userEntity.flag = flag
    await userRepository.save(userEntity)

    return sendEmail(
      { ...userEntity, password: decodedPassword },
      rememberEmailContent
    )
  }

  const validateEntity = async (entity) => {
    const errors = await validate(entity)

    if (errors.length > 0) {
      throw new HttpError(
        "Errors validating the user:" + errors,
        HttpStatusCode.NOT_FOUND
      )
    }
  }

  const createUser = async () => {
    const { name, email, telephone, type, flag, password, decodedPassword } =
      UserRequest(request).firstLogin()
    const findUser = await userRepository.findOne({ where: { email } })
    if (findUser) {
      throw new HttpError(
        "User already exist in database",
        HttpStatusCode.CONFLICT
      )
    }
    const user = userRepository.create({
      name,
      email,
      telephone,
      type,
      flag,
      password,
    })

    validateEntity(user)
    const saveUser = await userRepository.save(user)

    sendEmail(
      {
        name,
        email,
        password: decodedPassword,
      },
      inviteEmailContent
    )

    return saveUser
  }

  const updateUser = async () => {
    const { name, email, telephone, type, flag, password, id } =
      UserRequest(request).getUserUpdate()

    let userEntity = await userRepository.findOne({ where: { id } })

    if (!userEntity) {
      throw new HttpError(
        `User not found with: ${id}`,
        HttpStatusCode.BAD_REQUEST
      )
    }

    if (password) {
      userEntity.password = md5(password)
    }
    if (name) {
      userEntity.name = name
    }
    if (email) {
      userEntity.email = email
    }
    if (telephone) {
      userEntity.telephone = telephone
    }
    if (type) {
      userEntity.type = type
    }
    if (flag) {
      userEntity.flag = flag
    }

    return await userRepository.save(userEntity)
  }

  const getAllUser = async () => {
    const {
      orderBy = "name",
      orientation = "ASC",
      page = 0,
      limit = 20,
    } = request.query

    const [list, count] = await userRepository.findAndCount({
      select: [
        "id",
        "name",
        "email",
        "telephone",
        "flag",
        "type",
        "createdAt",
        "updatedAt",
      ],
      order: {
        [orderBy]: orientation,
      },
      skip: getSkip(page - 1, limit),
      take: limit,
    })
    return {
      users: list,
      count: count,
    }
  }

  return {
    createUser,
    updateUser,
    getAllUser,
    resendEmail,
  }
}

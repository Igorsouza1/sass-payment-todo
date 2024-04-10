import type { Request, Response } from "express"
import { prisma } from "../lib/prisma"


export const listUsersController = async (request: Request, response: Response) => {
    const users = await prisma.user.findMany()

    response.send(users)

}

export const findOneUserController = async (request: Request, response: Response) => {
    const { userId } = request.params


    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })

    if(!user){
        return response.status(404).send({
            error: 'Not Found'
        })
    }

    response.send(user)

}


export const createUserController = async (request: Request, response: Response) => {
    const { name, email } = request.body

    if(!name || !email) {
        return response.send({
            error: "Name or email is invalid"
        })
    }

    const userEmailAlreadyExistis = await prisma.user.findFirst({
        where: {
            email
        },
        select: {
            id: true
        }
    })

    if(userEmailAlreadyExistis){
        return response.status(400).send({
            error: 'Email Already Exist'
        })
    }

    const user = await prisma.user.create({
        data:{
            name,
            email
        }
    })

    response.send(user)

}
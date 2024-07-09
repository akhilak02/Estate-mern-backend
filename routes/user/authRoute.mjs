import { Router } from "express";
import { signIn, signUp } from "../../controller/user/auth-controller.mjs";




const route =Router()

route.post('/signup',signUp)
route.post('/signin',signIn)

export default route;
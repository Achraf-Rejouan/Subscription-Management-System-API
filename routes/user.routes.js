import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { getUsers, getUser } from '../controllers/user.controller.js';
const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id',authorize, getUser);


userRouter.post('/', (req, res) => {
  res.send({title: 'Create a new user'});
});
userRouter.put('/:id', (req, res) => {
  res.send({title: 'Update user details'});
});
userRouter.delete('/:id', (req, res) => {
  res.send({title: 'Delete a user'});
});

export default userRouter;
// This code defines a set of routes for managing users in an Express application.
import express, { Router, Request, Response } from 'express';
import { TodoController } from '../controller/TodoController';

export const TodoRoute: Router = express.Router();

TodoRoute.get('/', TodoController.viewTodo)
TodoRoute.get('/:id', TodoController.getTodoById)
TodoRoute.post('/', TodoController.createTodo)
TodoRoute.patch('/:id', TodoController.updateTodo)
TodoRoute.delete('/:id', TodoController.deleteTodo)
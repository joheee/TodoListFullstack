import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export class TodoController {
    static async viewTodo(req:Request, res:Response){
        try {
            const data = await prisma.menu.findMany()
            res.status(200).send(data)
        } catch (error) {
            console.error('Error retrieving menu:', error)
            res.status(500).json({ message: 'Internal Server Error' })
        } 
    }

    static async getTodoById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            const todo = await prisma.menu.findUnique({
                where: { id: parseInt(id) },
            });

            if (!todo) {
                return res.status(404).json({ message: 'To do not found' });
            }

            res.status(200).json(todo);
        } catch (error) {
            console.error('Error retrieving todo by ID:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    
    static async createTodo(req: Request, res: Response) {
        try {
            const { nama, deksripsi, selesai } = req.body
            const newData = await prisma.menu.create({
                data: {
                    nama,
                    deksripsi,
                    selesai
                }, 
            })
            res.status(200).json({ message: 'To do created successfully', data: newData })
        } catch (error) {
            console.error('Error creating menu:', error)
            res.status(500).json({ message: 'Internal Server Error' })
        } 
    }

    static async updateTodo(req: Request, res: Response) {
        try {
            const { id } = req.params
            const existingMenu = await prisma.menu.findUnique({
                where: { id: parseInt(id) },
            })
        
            if (!existingMenu) {
                return res.status(404).json({ message: 'To do not found' })
            }
        
            const { nama, deksripsi, selesai } = req.body

            const updatedMenu = await prisma.menu.update({
                where: { id: parseInt(id) },
                data: {
                    nama,
                    deksripsi,
                    selesai
                },
            })
        
            res.status(200).json({ message: 'To do updated successfully', data: updatedMenu })
        } catch (error) {
            console.error('Error updating menu:', error)
            res.status(500).json({ message: 'Internal Server Error' })
        } 
    }

    static async deleteTodo(req: Request, res: Response) {
        try {
            const { id } = req.params
        
            const existingMenu = await prisma.menu.findUnique({
                where: { id: parseInt(id) },
            });
        
            if (!existingMenu) {
                return res.status(404).json({ message: 'To do not found' })
            }
        
            await prisma.menu.delete({
                where: { id: parseInt(id) },
            });
        
            res.status(204).json({ message: 'To do deleted successfully' })
        } catch (error) {
            console.error('Error deleting menu:', error);
            res.status(500).json({ message: 'Internal Server Error' })
        } 
    }
}
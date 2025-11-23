import { Router } from "express";
import { UserController } from "../controllers";
import { UserService } from "../services";
import { UserRepository } from "../repositories";
import { db } from "../db";
const router = Router();
const userRepository = new UserRepository(db);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obter todos os usuários
 *     description: Retorna uma lista de todos os usuários
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Lista de usuários obtida com sucesso
 */
router.get("/users", userController.getAllUsers.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obter um usuário por ID
 *     description: Retorna um usuário específico pelo seu ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário obtido com sucesso
 */
router.get("/users/:id", userController.getUserById.bind(userController));

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Criar um novo usuário
 *     description: Cria um novo usuário no banco de dados
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post("/users", userController.createUser.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     description: Atualiza os dados de um usuário existente
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
router.put("/users/:id", userController.updateUser.bind(userController));

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deletar um usuário
 *     description: Remove um usuário do banco de dados
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 */
router.delete("/users/:id", userController.deleteUser.bind(userController));

export default router;

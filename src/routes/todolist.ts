import { Router } from "express";
import TodoListController from "../controllers/todoListContoller";
import { TodoListService } from "../services";
import { TodoListRepository, UserRepository } from "../repositories";
import { db } from "../db";

const router = Router();
const todoListRepository = new TodoListRepository(db);
const userRepository = new UserRepository(db);
const todoListService = new TodoListService(todoListRepository, userRepository);
const todoListController = new TodoListController(todoListService);

/**
 * @swagger
 * /api/todolists:
 *   post:
 *     summary: Criar uma nova lista de tarefas
 *     description: Cria uma nova lista de tarefas no banco de dados
 *     tags:
 *       - TodoLists
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - deliverySchedule
 *               - userName
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titulo da lista de tarefas
 *               description:
 *                 type: string
 *                 description: Descricao da lista de tarefas
 *               deliverySchedule:
 *                 type: string
 *                 description: "Data ou periodo de entrega (ex.: 2024-12-31)"
 *               userName:
 *                 type: string
 *                 description: Nome do usuario dono da lista
 *     responses:
 *       201:
 *         description: Lista de tarefas criada com sucesso
 */
router.post(
  "/todolists",
  todoListController.createTodoList.bind(todoListController)
);

/**
 * @swagger
 * /api/todolists/{id}:
 *   get:
 *     summary: Obter uma lista de tarefas por ID
 *     description: Retorna uma lista de tarefas específica pelo seu ID
 *     tags:
 *       - TodoLists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista de tarefas
 *     responses:
 *       200:
 *         description: Lista de tarefas obtida com sucesso
 */
router.get(
  "/todolists/:id",
  todoListController.getTodoListById.bind(todoListController)
);

/**
 * @swagger
 * /api/todolists/user/{userId}:
 *   get:
 *     summary: Obter todas as listas de tarefas por ID do usuário
 *     description: Retorna todas as listas de tarefas associadas a um usuário específico
 *     tags:
 *       - TodoLists
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Listas de tarefas obtidas com sucesso
 */
router.get(
  "/todolists/user/:userId",
  todoListController.getAllByUserId.bind(todoListController)
);

/**
 * @swagger
 * /api/todolists/due-today/{userId}:
 *   get:
 *     summary: Obter todas as tarefas com vencimento hoje por ID do usuário
 *     description: Retorna todas as tarefas que vencem hoje para um usuário específico
 *     tags:
 *       - TodoLists
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Tarefas com vencimento hoje obtidas com sucesso
 */
router.get(
  "/todolists/due-today/:userId",
  todoListController.getAllTasksDueToday.bind(todoListController)
);

/**
 * @swagger
 * /api/todolists/{id}:
 *   put:
 *     summary: Atualizar uma lista de tarefas por ID
 *     description: Atualiza uma lista de tarefas específica pelo seu ID
 *     tags:
 *       - TodoLists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista de tarefas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Titulo da lista de tarefas
 *               description:
 *                 type: string
 *                 description: Descricao da lista de tarefas
 *               deliverySchedule:
 *                 type: string
 *                 description: "Data ou periodo de entrega (ex.: 2024-12-31)"
 *               isCompleted:
 *                 type: boolean
 *                 description: Marca a lista como concluida
 *     responses:
 *       200:
 *         description: Lista de tarefas atualizada com sucesso
 */
router.put(
  "/todolists/:id",
  todoListController.updateTodoList.bind(todoListController)
);

/**
 * @swagger
 * /api/todolists/{id}:
 *   delete:
 *     summary: Deletar uma lista de tarefas por ID
 *     description: Deleta uma lista de tarefas específica pelo seu ID
 *     tags:
 *       - TodoLists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da lista de tarefas
 *     responses:
 *       200:
 *         description: Lista de tarefas deletada com sucesso
 */
router.delete(
  "/todolists/:id",
  todoListController.deleteTodoList.bind(todoListController)
);

export default router;

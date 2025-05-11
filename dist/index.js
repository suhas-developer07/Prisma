"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const express_1 = __importDefault(require("express"));
const prisma = new prisma_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect()
                .then(() => {
                console.log('Connected to the database');
            });
        }
        catch (error) {
            console.log('Error connecting to the database:', error);
            process.exit(1);
        }
    });
}
main();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.post("/createtodos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, title, done } = req.body;
        const todo = yield prisma.user.create({
            data: {
                email,
                password,
                todos: {
                    create: {
                        title,
                        done
                    }
                }
            }
        });
        res.status(201).json(todo);
        return;
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating todo', details: error.message });
        return;
    }
}));
app.get("/gettodos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const todos = yield prisma.user.findUnique({
            where: {
                email: email
            },
            include: {
                todos: true
            }
        });
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching todos' });
        return;
    }
}));
app.get("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.create({
            data: {
                email,
                password
            }
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user' });
        return;
    }
}));
app.post("/addtodo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, done, email } = req.body;
    const todo = yield prisma.todo.create({
        data: {
            title,
            done,
            user: {
                connect: {
                    email: email
                }
            }
        }
    });
    res.status(201).json({ message: "Todo created successfully", todo });
}));
app.get("/gettodos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const todos = yield prisma.todo.findMany({
        where: {
            user: {
                email: email
            }
        }
    });
    res.status(200).json(todos);
}));
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

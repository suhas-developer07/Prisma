import { connect } from 'http2';
import { PrismaClient } from '../generated/prisma'
import  express  from 'express';

const prisma = new PrismaClient()

async function main() {
    try {
        await prisma.$connect()
        .then(()=>{
            console.log('Connected to the database');
        }
    )
    } catch (error) {
        console.log('Error connecting to the database:', error);
        process.exit(1);
    }
}
main();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get("/signup", async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await prisma.user.create({
            data:{
                email,
                password
            }
        });
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({ error: 'Error creating user' });
        return;
    }
})

app.post("/addtodo", async (req,res)=>{
    const {title,done,email}= req.body;
    const todo = await prisma.todo.create({
        data:{
            title,
            done,
            user:{
                connect:{
                    email:email
                }
            }
        }
    });
    res.status(201).json({message : "Todo created successfully",todo});
}
);

app.get("/gettodos", async (req, res)=>{
    const {email} = req.body;
    const todos = await prisma.todo.findMany({
        where:{
            user:{
                email:email
            }
        }
    });
    res.status(200).json(todos);
})


app.listen(3000, ()=>{
    console.log(`Server is running on port 3000`);
}
);
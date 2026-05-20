import express from 'express';
import { db } from '../db/index.js';
import { usersTable } from '../model/index.js';
import { eq } from 'drizzle-orm';
import {randomBytes , createHash} from 'crypto';

const router = express.Router();


router.post('/signup', (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    const [existingUser] = await db.select({id: usersTable.id}).from(usersTable).where(eq(usersTable.email, email));

    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

  const salt = randomBytes(256).toString('hex');
  const hashedPassword = createHash('sha256',salt).update(password + salt).digest('hex');

 const user = await db.insert(usersTable).values({
        firstname,
        lastname,
        email,
        salt,       
        password: hashedPassword,
 }).returning({id: usersTable.id
 });
 return res.status(201).json({ message: 'User created successfully', userId: {id: user.id} });
 
});
export default router;
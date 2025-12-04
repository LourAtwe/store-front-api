import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.TOKEN_SECRET as string
const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    // في حال عدم وجود التوكن
    if (!token) {
        res.status(401).json({ message: 'Unauthorized - Token missing' })
        return
    }
    try {
        // التحقق من صلاحية التوكن
        const decoded = jwt.verify(token, SECRET_KEY)
        // @ts-ignore
        req.user=decoded.user
        console.log('Token verified, user:', decoded)
        next()
    } catch (error) {
        // لو التوكن غير صالح أو منتهي
        res.status(403).json({ message: 'Forbidden - Invalid token' })
    }
}


export default verifyAuthToken;

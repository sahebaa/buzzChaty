
const authMiddleware=(req,res,next)=>{
    const token=req.cookie.token;
    
    if(!token)
        return res.status(401).json({ message: 'Missing or invalid token' });

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // attach decoded user data to the request
        next(); // proceed to next middleware or route
    }catch{
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

export default authMiddleware;
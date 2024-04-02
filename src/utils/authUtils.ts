import jwt from 'jsonwebtoken';

interface User {
  id: string;
  username: string;
  role: string;
}

const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  const token = jwt.sign(payload, 'chave_secreta', { expiresIn: '1h' }); 

  return token;
};

export { generateToken };

import { NextApiRequest, NextApiResponse } from 'next';
import { User, UserSchema } from '../../../models/User';
import connectDB from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    await connectDB();

    const validation = UserSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ 
        message: 'Dados inválidos',
        errors: validation.error.errors 
      });
    }

    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      preferences: {
        theme: 'light',
        notifications: true,
        focusMode: false,
        taskView: 'list',
      },
      healthProfile: {
        medications: [],
        dietaryRestrictions: [],
        exercisePreferences: [],
      },
      studyPreferences: {
        preferredStudyTime: [],
        breakDuration: 15,
        studyDuration: 45,
        preferredMaterials: [],
      },
    });

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences,
      healthProfile: user.healthProfile,
      studyPreferences: user.studyPreferences,
    };

    res.status(201).json({ user: userResponse });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
} 
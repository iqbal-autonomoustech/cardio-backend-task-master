import { Request, Response } from 'express';
import ProfileService from '../services/profileService';

const profileService = new ProfileService();

class ProfileController {
  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const profile = await profileService.getProfileById(+req.params.id);
      if (!profile) {
        res.status(404).json({ message: 'Profile not found' });
        return;
      }

      res.json(profile);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new ProfileController();

import ProfileService from '../services/profileService';

const profileService = new ProfileService();

const getProfile = async (req: any, res: any, next: any) => {
  const profileId = req.headers.profile_id;

  if (!profileId) {
    return res.status(400).json({ error: 'Profile ID is required' });
  }

  const profile = await profileService.getProfileById(+profileId);
  if (!profile) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.profile = profile;
  next();
};

export default getProfile;

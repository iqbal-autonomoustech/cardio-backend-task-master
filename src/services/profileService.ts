import Profile from '../models/profile';

class ProfileService {
  async getProfileById(id: number) {
    return Profile.findByPk(id);
  }
}

export default ProfileService;

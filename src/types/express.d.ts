// types/express.d.ts
import { Profile } from '../models/profile'; // Adjust path as needed

declare global {
  namespace Express {
    interface Request {
      profile?: Profile; // Adjust type as needed
    }
  }
}

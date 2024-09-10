import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Profile from '../models/profile'; // Ensure this path is correct
import Job from '../models/job';         // Ensure this path is correct
import sequelize from '../config/database'; // Ensure this path is correct

class AdminController {
  async getBestProfession(req: Request, res: Response): Promise<void> {
    try {
      const { start, end } = req.query;

      // Validate date inputs
      const startDate = new Date(start as string);
      const endDate = new Date(end as string);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        res.status(400).json({ error: 'Invalid date format' });
        return;
      }

      // Fetch the best profession
      const result = await Profile.findAll({
        attributes: [
          'profession',
          [sequelize.fn('sum', sequelize.col('jobs.price')), 'total_earned']
        ],
        include: [
          {
            model: Job,
            attributes: [],
            where: {
              paid: true,
              paymentDate: {
                [Op.between]: [startDate, endDate]
              }
            }
          }
        ],
        group: ['Profile.profession'],
        order: [[sequelize.literal('total_earned'), 'DESC']],
        limit: 1
      });

      const professionResult = result[0] ? {
        profession: result[0].profession,
        total_earned: result[0].get('total_earned')
      } : {};

      res.json(professionResult);
    } catch (error) {
      console.error('Error fetching best profession:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getBestClients(req: Request, res: Response): Promise<void> {
    try {
      const { start, end, limit } = req.query;

      // Validate date inputs
      const startDate = new Date(start as string);
      const endDate = new Date(end as string);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        res.status(400).json({ error: 'Invalid date format' });
        return;
      }

      // Determine limit value
      let parsedLimit = 2; // Default limit
      if (typeof limit === 'string') {
        parsedLimit = parseInt(limit, 10) || 2;
      } else if (Array.isArray(limit) && typeof limit[0] === 'string') {
        parsedLimit = parseInt(limit[0], 10) || 2;
      } else if (typeof limit === 'object' && 'value' in limit && typeof (limit as { value: string }).value === 'string') {
        parsedLimit = parseInt((limit as { value: string }).value, 10) || 2;
      }

      // Fetch the best clients
      const result = await Profile.findAll({
        attributes: [
          'id',
          ['firstName', 'name'], // Assuming you want to combine firstName and lastName for name
          [sequelize.fn('sum', sequelize.col('jobs.price')), 'total_paid']
        ],
        include: [
          {
            model: Job,
            attributes: [],
            where: {
              paid: true,
              paymentDate: {
                [Op.between]: [startDate, endDate]
              }
            }
          }
        ],
        group: ['Profile.id'],
        order: [[sequelize.literal('total_paid'), 'DESC']],
        limit: parsedLimit
      });

      const clients = result.map(profile => ({
        id: profile.id,
        name: `${profile.firstName} ${profile.lastName}`, // Combining names
        paid: profile.get('total_paid')
      }));

      res.json(clients);
    } catch (error) {
      console.error('Error fetching best clients:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new AdminController();

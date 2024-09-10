// scripts/seedDb.js
const { Profile, Job, Contract } = require('../models'); // Ensure the path is correct

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Profile.destroy({ where: {} });
    await Contract.destroy({ where: {} });
    await Job.destroy({ where: {} });

    // Create profiles
    await Profile.bulkCreate([
      { firstName: 'John', lastName: 'Doe', profession: 'Engineer', balance: 1000.00, type: 'contractor', createdAt: new Date(), updatedAt: new Date() },
      { firstName: 'Jane', lastName: 'Smith', profession: 'Designer', balance: 1500.00, type: 'client', createdAt: new Date(), updatedAt: new Date() },
      // Add more profiles as needed
    ]);

    // Create contracts
    const profiles = await Profile.findAll();
    await Contract.bulkCreate([
      { terms: 'Standard', status: 'Active', ContractorId: profiles[0].id, ClientId: profiles[1].id, createdAt: new Date(), updatedAt: new Date() },
      // Add more contracts as needed
    ]);

    // Create jobs
    const contracts = await Contract.findAll();
    await Job.bulkCreate([
      { description: 'Website Design', price: 500.00, paid: true, paymentDate: new Date(), ContractId: contracts[0].id, createdAt: new Date(), updatedAt: new Date() },
      { description: 'App Development', price: 1000.00, paid: false, paymentDate: null, ContractId: contracts[0].id, createdAt: new Date(), updatedAt: new Date() },
      // Add more jobs as needed
    ]);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedDatabase();

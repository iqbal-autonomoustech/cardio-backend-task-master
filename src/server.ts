import app from './app';
import sequelize from './config/database'; // Import default export

const PORT = 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

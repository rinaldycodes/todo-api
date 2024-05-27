const TestController = {
    getAllProducts: async (req, res) => {
        const data = {};
        // Logic to fetch all products from the database
        // data.user = await db.query('SELECT * FROM users');
        data.user = 'test';
        res.status(200).json({ 
            message: 'Get all products',
            data: data
        });
    },
  };
  
  module.exports = TestController;
  
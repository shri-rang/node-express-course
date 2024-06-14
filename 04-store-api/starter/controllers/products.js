const Product = require('../models/product')

const getAllproductsStatic = async(req,res)=>{
 
      const products = await Product.find({
        //  featured: true,
        name: 'vase table'
         
      });
  //  throw new Error("testing aysnc error")

   res.status(200).json({products, nbHits:products.length })
}


const getAllproducts = async(req,res)=>{
      console.log(req.query);
      const { featured} = req.query
       const queryObject = {}

        if(featured){
        queryObject.featured = featured === 'true' ? true : false 
        }

       const products = await Product.find(queryObject);
    // throw   Error("testing aysnc error");
 res.status(200).json({products, nbHits:products.length})
}


module.exports = {
    getAllproducts,getAllproductsStatic
}
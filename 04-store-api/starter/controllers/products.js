const Product = require('../models/product')

const getAllproductsStatic = async(req,res)=>{
      const search = 'ab';
      const products = await Product.find({ }).sort('-name price');
  //  throw new Error("testing aysnc error")

   res.status(200).json({products, nbHits:products.length })
}


const getAllproducts = async(req,res)=>{
      console.log(req.query);
      const { featured, company, name, sort,fields} = req.query
       const queryObject = {}

        if(featured){
        queryObject.featured = featured === 'true' ? true : false 
        }
        if(company){
         queryObject.company =  company
        }

        if(name){
            queryObject.name = {$regex:name,$options:'i'}
        }

      
        
       let result =  Product.find(queryObject)
       //sort
        if(sort){
       //  products = products.sort();
         const sortList = sort.split(',').join(' ');
         console.log(sortList);
         result = await result.sort(sortList);
        }else{
          result = await result.sort('createdAt');   
        }

         if(fields){
          const fieldsList = fields.split(',').join(' ');
         console.log(fieldsList);
         result = await result.select(fieldsList);
         }
        const products = await result;
    // throw   Error("testing aysnc error");
       res.status(200).json({products, nbHits:products.length})
}


module.exports = {
    getAllproducts,getAllproductsStatic
}
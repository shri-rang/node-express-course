const Product = require('../models/product')

const getAllproductsStatic = async(req,res)=>{
      const search = 'ab';
      const products = await Product.find({price:{$gt:30}}).sort('price').limit(10);
  //  throw new Error("testing aysnc error")

   res.status(200).json({products, nbHits:products.length })
}


const getAllproducts = async(req,res)=>{
      console.log(req.query);
      const { featured, company, name, sort,fields, numricFilters} = req.query
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
          
        if(numricFilters){
           const opratorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
           }
           const regEx = /\b(<|>|>=|=|<|<=)\b/g

           let filters = numricFilters.replace(regEx,(match)=> `-${opratorMap[match]}-`);
           console.log(filters);
           const options = ['price', 'rating'];
           filters = filters.split(',').forEach(item => {
               const [field,oprator,value] = item.split('-');
                if(options.includes(field)){
                   queryObject[field] = {[oprator]:Number(value)}
                }
           });
            console.log(filters);
        }
      
         console.log(queryObject);
       let result =  Product.find(queryObject)
       //sort
        if(sort){
       //  products = products.sort();
         const sortList = sort.split(',').join(' ');
         console.log(sortList);
         result =  result.sort(sortList);
        }else{
          result =  result.sort('createdAt');   
        }

         if(fields){
          const fieldsList = fields.split(',').join(' ');
         console.log(fieldsList);
         result =  result.select(fieldsList);
         }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page-1) * limit;

         result = result.skip(skip).limit(limit);
          // 23 
          
          
 



        const products = await result;
    // throw   Error("testing aysnc error");
       res.status(200).json({products, nbHits:products.length})
}


module.exports = {
    getAllproducts,getAllproductsStatic
}
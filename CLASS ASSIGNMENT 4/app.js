const express = require('express');

const app = express();
 
// app.get('/', (req, res)=> {
//      res.send('hello from express js')
// });
// app.listen(3000, (req,res)=>{
      // console.log('server is running on port 3000');
// })

app.use(express.json())


const allProducts = [
        {
            "id": 1,
            "title": "Product 1",
            "price": 109.95,
        },
                {
            "id": 2,
            "title": "Product 2",
            "price": 190.95,
        },
        {
            "id": 3,
            "title": "Product 3",
            "price": 109.95,
        },
    
    {
        "id": 4,
        "title": "Product 4",
        "price": 190.95,
    },
    {
        "id": 5,
        "title": "Product 5",
        "price": 109.95,
    }
]
//get all products
app.get('/products', (req, res) => {
      res.send(allProducts)
})

//post all products
const user = true


app.post('/addProduct', (req, res) => {

    if (user) {

        const product = req.body

        allProducts.push(product)


        res.send({
            message: 'Product Added sucessfully',
            addedProduct: product
        })
    } else {
        res.status(401).send('Product added failed !')

    }
})


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
//update product by ID
app.put('/allproducts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = allProducts.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }

  const updatedProduct = { ...allProducts[productIndex], ...req.body };
  allProducts[productIndex] = updatedProduct;
  res.send(updatedProduct);
});


// DELETE product by ID
app.delete('/allproducts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productIndex = allProducts.findIndex(p => p.id === id);

  if (productIndex === -1) {
    return res.status(404).send('Product not found');
  }

  const deletedProduct = allProducts.splice(productIndex, 1);
  res.send(deletedProduct);
});

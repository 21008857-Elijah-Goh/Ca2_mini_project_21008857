//Importing Frameworks, body parser and view engine
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine","ejs");

//Setting In-Memory Data
let products = [ 
    { id: 1,image: 'D:\Visual Studio\Ca2_mini_project_21008857\images\Pathology.jpg', name: 'Oxford Handbook of Clinical Pathology'  ,quantity: 20 ,price: 65},
    { id: 2,image: 'D:\Visual Studio\Ca2_mini_project_21008857\images\pharmacy.jpg' , name: 'Oxford Handbook of Clinical Pharmacy'   ,quantity: 20  ,price: 70},
    { id: 3,image: 'D:\Visual Studio\Ca2_mini_project_21008857\images\medicine.jpg' , name: 'Oxford Handbook of Clinical Medicine'   ,quantity: 20  ,price: 80},
    { id: 4,image: 'D:\Visual Studio\Ca2_mini_project_21008857\images\dentistry.jpg', name: 'Oxford Handbook of Clinical Dentisry'   ,quantity: 20  ,price: 75}
  ];

//Routing

app.get('/', function(req, res) {
  res.render("index", {products});
});

app.get('/products/:id', function(req, res) {
  const productId = parseInt(req.params.id);
  const product = products.find((product) => product.id === productId);
  if (product) {
      res.render("productInfo", {product});
  } 
});


app.get('/addProductForm', function(req, res) {
  res.render("addProduct");
});



app.post('/products', function(req, res) {  
  const image = req.body.image;
  const name = req.body.name;
  const quantity = req.body.quantity;
  const price = req.body.price;
  
  const id = products[products.length - 1].id + 1;

  const newProduct = {id,image, name, quantity, price};
  
  products.push(newProduct);
  
  res.redirect("/");

});

//Update Product
app.get('/products/:id/update', function(req, res)  {
  const id = parseInt(req.params.id);
  const product = products.find((product) => product.id === id);
  res.render("updateProduct", {product});
});

//Update Product by ID
app.post('/products/:id/update', function(req, res) {
  const id = req.params.id;
  const image = req.body.image;
  const name = req.body.name;
  const quantity = req.body.quantity;
  const price = req.body.price;
  console.log(id,image,name,quantity,price);
  const updatedProduct = {id,image,name,quantity,price}
  products = products.map((product) => {
      if (product.id == id){
          return{...product,...updatedProduct};
      }else{
          return product;
      }
  });
  res.redirect("/");
});







//Server Porting and listen
const port= 3000;
app.listen(port, () => {
    console.log("Server is running at localhost: " + port);
});


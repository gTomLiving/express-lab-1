import express, { response } from 'express';

const cartRoutes = express.Router();

//mock data?? 

interface cartItem {
    id: number,
    product: string,
    price: number,
    quantity: number
} 

//mock cart 

let cart: cartItem[] = [
    {
        id: 1,
        product: "computer",
        price: 200,
        quantity: 1
    },
    {
        id: 2,
        product: "lampshade",
        price: 10,
        quantity: 2
    },
    {
        id: 3,
        product: "sunglasses",
        price: 750,
        quantity: 3
    }

]
let nextId = cart.length + 1;

//get all items in cart

cartRoutes.get("/cart", (req, res) => {
   
    let pageSizeArray: cartItem[] = []
    const pageSize: number = Number(req.query.pageSize);
    const prefix: string = String(req.query.prefix);
    //get max price
    const maxPrice: number  = Number(req.query.maxPrice);
    if (maxPrice) {
        let maxPriceArray: cartItem[] = cart.filter((x) => x.price >= maxPrice);
         res.json(maxPriceArray);  
    } else if (prefix && prefix != "undefined") {  
        let prefixArray: cartItem[] = cart.filter((x) => x.product.startsWith(prefix));
        res.json(prefixArray);
    } else if(pageSize) {
        for(let i: number = 0; i < pageSize; i++) {
            pageSizeArray.push(cart[i]);
        }
        res.json(pageSizeArray);
    }

    res.json(cart);



    



   
})


//get card by id 

cartRoutes.get("/cart/:id", (req, res) => {
    let foundcardID = cart.find((x) => {
        return x.id === parseInt(req.params.id);
    })
    if(foundcardID) {
        //have an apple
        res.json(foundcardID);
    } // send a 204 
    else {
        res.sendStatus(204);

    }
    
})

// add new item to the cart 

cartRoutes.post("/cart", (req, res) => {
    let newCartItem = {
        id: nextId,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity
        
    }
    nextId++
//add the newcartItem to the cart Array
    cart.push(newCartItem);

    //respond with the cart object 
    res.status(201)
    res.json(newCartItem);
    
})
//update card item by id 


cartRoutes.put("/cart/:id", (req, res) => {
    let foundCartIndex = cart.findIndex((x) => {
        return x.id === parseInt(req.params.id);
    })
    if(foundCartIndex > -1) {
        
        //send the updated
        cart[foundCartIndex] = {
            id: cart[foundCartIndex].id,
            product: req.body.product,
            price: req.body.price,
            quantity: req.body.quantity
        }
        //send the new array
        res.json(cart);
    } // send a 204 
    else {
        res.sendStatus(204);

    }
})

//delete by id

cartRoutes.delete("/cart/:id", (req, res) => {
    let foundCartIndex = cart.findIndex((x) => {
        return x.id === parseInt(req.params.id);
    })
    if(foundCartIndex > -1) {
        //have an apple
        //delete the apple
        cart.splice(foundCartIndex, 1);
        

        res.status(204);
       
    } // send a 204 
    else {
        //send a 400 bad request
        res.sendStatus(400);

    } 
})


export default cartRoutes;



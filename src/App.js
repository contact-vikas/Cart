import React from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from 'firebase/compat/app';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading:true
    }
    this.db=firebase.firestore();
    
  }
  
  componentDidMount(){
    // firebase
    // .firestore()
    // .collection('products')
    // .get()
    // .then((snapshot)=>{
    // const products=snapshot.docs.map((doc)=>{
    //   const data=doc.data();
    //   data['id']=doc.id;
    //   return data;
    //   })
    //    this.setState({
    //     products:products,
    //     loading:false
    //    })
    // })


     
    this.db
      .collection("products")
      .onSnapshot((snapshot) => {
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });
        this.setState({
          products: products,
          loading: false,
        });
      });

  }

  handleIncreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products,
    // });

    const docRef=this.db
    .collection('products')
    .doc(products[index].id);

    docRef
    .update({
      qty:products[index].qty+1
    })
    .then(()=>{
      console.log("Updated Successfully");
    })
    .catch((err)=>{
      console.log('Error ',err);
    })
  };
  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 0) {
      return;
    }

    // products[index].qty -= 1;

    // this.setState({
    //   products,
    // });

     const docRef = this.db.collection("products").doc(products[index].id);

     docRef
       .update({
         qty: products[index].qty-1 ,
       })
       .then(() => {
         console.log("Updated Successfully");
       })
       .catch((err) => {
         console.log("Error ", err);
       });
  };

  onDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id); // [{}]

    // this.setState({
    //   products: items,
    // });

     const docRef = this.db.collection("products").doc(id);
     docRef
       .delete()
       .then(() => {
         console.log("Deleted Successfully");
       })
       .catch((err) => {
         console.log("Error ", err);
       });
  };

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    });

    return count;
  };

  getCartTotal = () => {
    const { products } = this.state;

    let cartTotal = 0;

    products.map((product) => {
      cartTotal = cartTotal + product.qty * product.price;
      return '';
    });

    return cartTotal;
  };

  addProduct=()=>{
    this.db
    .collection('products')
    .add({
      img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
      price: 40000,
      qty: 1,
      title: "Laptop"
    })
    .then((docRef)=>{
      console.log("Product has been added",docRef);
    })
    .catch((error)=>{
      console.log("Error in adding the Product",error);
    });
  }

  render() {
    const { products,loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{padding:20,fontsiz
        :20}}>Add a product</button> */}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.onDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{ padding: 10, fontSize: 20 }}>
          TOTAL: {this.getCartTotal()}{" "}
        </div>
      </div>
    );
  }
}

export default App;

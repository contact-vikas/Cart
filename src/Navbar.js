import React from "react";

const Navbar = (props) => {
  return (
    <div style={styles.nav}>
      <div>
        <h1 style={{color:"white"}}>Cart</h1>
      </div>
      <div>
        <div style={styles.cartIconContainer}>
          <img
            style={styles.cartIcon}
            src="https://www.svgrepo.com/show/509786/cart.svg"
          />
          <span style={styles.cartCount}>{props.count}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  cartIcon: {
    height: 32,
    marginRight: 20,
  },
  nav: {
    height: 70,
    background: "#4267b2",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartIconContainer: {
    position: "relative",
  },
  cartCount: {
    background: "yellow",
    borderRadius: "50%",
    padding: "4px 8px",
    position: "absolute",
    right: 0,
    top: -9,
  },
};

export default Navbar;

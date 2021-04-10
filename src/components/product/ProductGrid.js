import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

import { setProduct } from "../../redux/product/product.actions";

import DefaultImage from "../../assets/defaultProduct.jpg";
import "./ProductGrid.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: 0.8,
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflowY: "scroll",
    backgroundColor: theme.palette.background.paper,
    paddingTop: 56,
    overflowX: "hidden",
  },
  gridList: {
    width: 800,
    // height: 800,
    padding: 20,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

function ProductGrid({ data, setProduct }) {
  const classes = useStyles();
  function handleSelect(product) {
    setProduct(product);
  }

  // const matches = useMediaQuery("(min-width:800px)");

  return (
    <div className={classes.root}>
      <GridList
        style={{ margin: 0 }}
        cellHeight={240}
        className={classes.gridList}
        cols={useMediaQuery("(min-width:800px)") ? 4 : 1}
      >
        {data &&
          data.length > 0 &&
          data.map((tile) => (
            <Link
              key={tile._id}
              style={{ textDecoration: "none" }}
              to={{ pathname: `/products/${tile._id}` }}
              onClick={(e) => handleSelect(tile)}
            >
              <GridListTile key={tile._id} className="tile-cell">
                <div>
                  <img
                    src={tile.img ? tile.img : DefaultImage}
                    alt={tile.name}
                  />
                  <div className="product-name">{tile.name}</div>
                  
                  <div className={classes.productDescription}>
                    {tile.description}
                  </div>
                  <div>${tile.price}</div>
                </div>
              </GridListTile>
            </Link>
          ))}
      </GridList>
    </div>
  );
}

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { setProduct })(ProductGrid);

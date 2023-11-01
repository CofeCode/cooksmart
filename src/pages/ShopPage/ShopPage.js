import React from "react";
import PageContainer from "../../components/PageContainer/PageContainer";
import Shop from "../../components/Shop/Shop";

const ShopPage = ({
  shoppingList,
  setShoppingList,
  handleDeleteFromShoppingList,
  handleClearClick,
}) => {
  return (
    <PageContainer title="Shopping List">
      <Shop
        shoppingList={shoppingList}
        setShoppingList={setShoppingList}
        handleDeleteFromShoppingList={handleDeleteFromShoppingList}
        handleClearClick={handleClearClick}
      />
    </PageContainer>
  );
};

export default ShopPage;

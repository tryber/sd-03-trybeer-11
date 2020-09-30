import React from 'react';

const CheckoutForm = ({ submitPurchase, onChangeStreet, onChangeNumber, disableButton }) => {
  return (
    <form onSubmit={(event) => submitPurchase(event)}>
      <div className="street-number-checkout">
        <label htmlFor="address">
          Rua:
          <input
            onChange={(event) => onChangeStreet(event)}
            data-testid="checkout-street-input"
            type="text"
            id="address"
            name="deliveryAddress"
          />
        </label>
        <label htmlFor="address-number">
          Número da casa:
          <input
            onChange={(event) => onChangeNumber(event)}
            data-testid="checkout-house-number-input"
            type="text"
            id="address-number"
            name="deliveryNumber"
          />
        </label>
      </div>
      <div className="checkout-button-page-container">
        <button
          className="checkout-page-button"
          disabled={disableButton()}
          data-testid="checkout-finish-btn"
          type="submit"
        >
          Finalizar Compra
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;

import React from "react";
import { Router } from "react-router-dom";
import renderWithRouter from "./renderWithRouter";
import CheckoutPage from "../Pages/Client/Checkout/index";
import axios from "./mocks/axios";
import { cleanup, fireEvent, waitForDomChange } from "@testing-library/react";

const localStorageMock = [
  {
    id: 1,
    name: "Skol Lata 250ml",
    price: 2.2,
    photo: "http://localhost:3001/images/Skol Lata 350ml.jpg",
    sellingQnt: 2,
  },
  {
    id: 2,
    name: "Heineken 600ml",
    price: 7.5,
    photo: "http://localhost:3001/images/Heineken 600ml.jpg",
    sellingQnt: 2,
  },
];

describe("testing checkout page", () => {

  afterEach(() => cleanup());

  beforeEach(() => {
    localStorage.setItem('sellingProducts', JSON.stringify([]));
    localStorage.setItem('sellingProducts', JSON.stringify(localStorageMock));
    window.location.reload = jest.fn();
  })

  it('testing if page reloads products stay there', () => {
    const { getByTestId } = renderWithRouter(<CheckoutPage />);

    const product = getByTestId('0-product-name');
    const productQnt = getByTestId('0-product-qtd-input');
    const ProductTotalValue = getByTestId('0-product-total-value')
    const unitPrice = getByTestId('0-product-unit-price')
    expect(product.innerHTML).toBe('Skol Lata 250ml');
    expect(productQnt.innerHTML).toBe('2');
    expect(unitPrice.innerHTML).toContain('2.20');
    expect(ProductTotalValue.innerHTML).toContain('4.40');

    window.location.reload;
    expect(product.innerHTML).toBe('Skol Lata 250ml');
    expect(productQnt.innerHTML).toBe('2');
    expect(unitPrice.innerHTML).toContain('2.20');
    expect(ProductTotalValue.innerHTML).toContain('4.40');

  })

  it("testing if total price is correct", () => {
    const { getByTestId } = renderWithRouter(<CheckoutPage />);

    const orderValue = getByTestId('order-total-value');

    expect(orderValue.innerHTML).toContain('19.40');

    const deleteItem = getByTestId('0-removal-button');
    fireEvent.click(deleteItem);

    expect(orderValue.innerHTML).toContain('15.00');

    window.location.reload;
    expect(orderValue.innerHTML).toContain('15.00');
  });

  it('testing message when there is no products in the cart', () => {
    localStorage.setItem('sellingProducts', JSON.stringify([]));
    const { getByText } = renderWithRouter(<CheckoutPage />);
    const message = getByText(/Não há produtos no carrinho/i);
    expect(message).toBeTruthy();
  })

  it('testing purchase action', async () => {
    const { getByTestId, history } = renderWithRouter(<CheckoutPage />);

    const street = getByTestId('checkout-street-input');
    const houseNumber = getByTestId('checkout-house-number-input');
    const purchaseButton = getByTestId('checkout-finish-btn');

    // expect(purchaseButton).toHaveAttribute('disabled');

    expect(street).toBeTruthy();
    expect(houseNumber).toBeTruthy();
    expect(purchaseButton).toBeTruthy();

    fireEvent.change(street, { target: { value: 'Rua Brasil' } });
    // expect(purchaseButton).toHaveAttribute('disabled')
    fireEvent.change(houseNumber, { target: { value: '38' } });
    // expect(purchaseButton).not.toHaveAttribute('disabled')

    // expect(street.innerHTML).toContain('Rua Brasil');
    // expect(houseNumber.innerHTML).toContain('38');
    fireEvent.submit(purchaseButton, {
      target: {
        deliveryAddress: { value: street },
        deliveryNumber: { value: houseNumber },
      },
    });

    await waitForDomChange();

    expect(history.location.pathname).toBe('/products');
  });
});

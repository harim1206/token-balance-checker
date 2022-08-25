import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import Dashboard from "./Dashboard";

describe("Initial Rendering", () => {
  let submit, TokenAddressInput, UserAddressInput;

  beforeEach(() => {
    render(<Dashboard />);
    submit = screen.getByRole("button");
    TokenAddressInput = screen.getByTestId("token-address");
    UserAddressInput = screen.getByTestId("user-address");
  });

  test("Token address input is rendered and blank", () => {
    expect(TokenAddressInput).toBeInTheDocument();
    expect(TokenAddressInput.value).toBe("");
  });

  test("User address input is rendered and blank", () => {
    expect(UserAddressInput).toBeInTheDocument();
    expect(UserAddressInput.value).toBe("");
  });

  test("Submit button is disabled", () => {
    expect(submit).toBeInTheDocument();
    expect(submit).toBeDisabled();
  });

  test("Balance display is hidden", () => {
    render(<Dashboard />);
    const TokenBalance = screen.queryByTestId("token-balance");

    expect(TokenBalance).toBeNull();
  });
});

describe("Input Validation", () => {
  let submit,
    TokenAddressInput,
    UserAddressInput,
    TokenAddressInputError,
    UserAddressInputError,
    validEthAddress,
    invalidEthAddress;

  beforeEach(() => {
    render(<Dashboard />);
    submit = screen.getByRole("button");
    TokenAddressInput = screen.getByTestId("token-address");
    UserAddressInput = screen.getByTestId("user-address");
    TokenAddressInputError = screen.getByText(
      /Please enter a valid token address/
    );
    UserAddressInputError = screen.getByText(
      /Please enter a valid user address/
    );
    validEthAddress = `0x994da0c3437a823F9e47dE448B62397D1bDfDdBa`;
    invalidEthAddress = `test`;
  });

  test("Token Address Input: Error message shows and submit is disabled when the input is invalid", () => {
    userEvent.type(TokenAddressInput, invalidEthAddress);

    expect(TokenAddressInputError).not.toHaveClass("hidden");
    expect(submit).toBeDisabled();
  });

  test("Token Address Input: Error message is hidden when the input is valid", () => {
    userEvent.clear(TokenAddressInput);
    userEvent.type(TokenAddressInput, validEthAddress);

    expect(TokenAddressInputError).toHaveClass("hidden");
  });

  test("User Address Input: Error message shows and submit is disabled when the input is invalid", () => {
    userEvent.type(UserAddressInput, invalidEthAddress);

    expect(UserAddressInputError).not.toHaveClass("hidden");
    expect(submit).toBeDisabled();
  });

  test("User Address Input: Error message is hidden when the input is valid", () => {
    userEvent.type(UserAddressInput, validEthAddress);

    expect(UserAddressInputError).toHaveClass("hidden");
  });
});

describe("Submit Validation", () => {
  let submit, TokenAddressInput, UserAddressInput, validEthAddress;

  beforeEach(() => {
    render(<Dashboard />);
    submit = screen.getByRole("button");
    TokenAddressInput = screen.getByTestId("token-address");
    UserAddressInput = screen.getByTestId("user-address");
    validEthAddress = `0x994da0c3437a823F9e47dE448B62397D1bDfDdBa`;
  });

  test("Submit button is enabled when both of the inputs are valid", () => {
    userEvent.type(TokenAddressInput, validEthAddress);
    userEvent.type(UserAddressInput, validEthAddress);

    expect(submit).toBeEnabled();
  });

  test("Submit button is disabled when the inputs are blank", () => {
    userEvent.clear(TokenAddressInput);
    userEvent.clear(UserAddressInput);

    expect(submit).toBeDisabled();
  });
});

describe("Token Balance", () => {
  test("If there is no result, error message is displayed", () => {});

  test("If there is a result, tokenbalance is displayed", () => {});

  test("Token decimals are displayed correctly for different tokens", () => {});

  test("Displays an ENS name if it exists", () => {});

  test("Displays the address if ENS name does not exist", () => {});
});

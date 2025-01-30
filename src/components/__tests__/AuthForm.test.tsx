import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import AuthForm from "../AuthForm";
import "@testing-library/jest-dom";
import { supabase } from "../../lib/supabase";
import { BrowserRouter } from "react-router-dom";

// On mock Supabase pour éviter d'appeler le vrai backend.
jest.mock("../../lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
    },
    from: jest.fn(() => ({
      insert: jest.fn(),
    })),
  },
}));

describe("AuthForm component", () => {
  test('affiche les champs email et mot de passe pour le mode "login"', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthForm mode="login" />
        </BrowserRouter>
      );
    });

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Se connecter/i })
    ).toBeInTheDocument();
  });

  test('appelle supabase.auth.signInWithPassword lors de la soumission en mode "login"', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <AuthForm mode="login" />
        </BrowserRouter>
      );
    });

    const emailField = screen.getByLabelText(/Email/i);
    const passwordField = screen.getByLabelText(/Mot de passe/i);
    const submitButton = screen.getByRole("button", { name: /Se connecter/i });

    await act(async () => {
      fireEvent.change(emailField, { target: { value: "test@example.com" } });
      fireEvent.change(passwordField, { target: { value: "password123" } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext } from "../../contexts/AuthContext";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Home from "../../pages/Home";
import '@testing-library/jest-dom';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// Mock supabase
jest.mock("../../lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    },
  },
}));

describe("Home page", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test("redirection si utilisateur connecté (mock)", () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const mockAuthContext = {
      user: { id: "fake-id", email: "test@example.com" },
      loading: false,
      signOut: jest.fn(),
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test('affiche un bouton "Commencer maintenant" si pas connecté', () => {
    const mockAuthContext = {
      user: null,
      loading: false,
      signOut: jest.fn(),
    };

    render(
      <AuthContext.Provider value={mockAuthContext}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText(/Commencer maintenant/i)).toBeInTheDocument();
  });
});

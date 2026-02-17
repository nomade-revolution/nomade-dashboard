import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ReadCheckbox from "./ReadCheckbox";
import { LeadsContext } from "../../LeadsContext/LeadsContext";
import { Lead } from "modules/leads/domain/Leads";
import { CompanyRegisterStructure } from "modules/user/domain/User";
import { PaginationStucture } from "sections/shared/interfaces/interfaces";
import { OrderItem } from "sections/user/UserContext/UserContext";

// Mock the context
const mockMarkLeadRead = vi.fn();
const mockContextValue = {
  markLeadRead: mockMarkLeadRead,
  createLead: vi.fn(),
  leads: [],
  lead: {} as CompanyRegisterStructure,
  loading: false,
  error: null,
  isSuccess: false,
  pagination: {} as PaginationStucture,
  getLeadsPaginated: vi.fn(),
  setOrder: vi.fn(),
  order: {} as OrderItem,
  sendLinkForLead: vi.fn(),
  getLeadFromHash: vi.fn(),
  badgeCount: 0,
  getLeadsStatusBadge: vi.fn(),
  setBadgeCount: vi.fn(),
};

const renderReadCheckbox = (lead: Lead) => {
  return render(
    <LeadsContext.Provider value={mockContextValue}>
      <ReadCheckbox row={lead} />
    </LeadsContext.Provider>,
  );
};

describe("ReadCheckbox", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders a checkbox", () => {
    const lead: Lead = {
      id: 1,
      company_name: "Test Company",
      contact_name: "Test Contact",
      phone: "+1234567890",
      email: "test@example.com",
      message: "Test message",
      created_at: "2024-01-01T00:00:00Z",
      sent_at: "2024-01-01T00:00:00Z",
      link_sent: false,
    };

    renderReadCheckbox(lead);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("shows checked state when lead is read", () => {
    const lead: Lead = {
      id: 1,
      company_name: "Test Company",
      contact_name: "Test Contact",
      phone: "+1234567890",
      email: "test@example.com",
      message: "Test message",
      created_at: "2024-01-01T00:00:00Z",
      sent_at: "2024-01-01T00:00:00Z",
      link_sent: false,
      is_read: true,
    };

    renderReadCheckbox(lead);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("shows unchecked state when lead is not read", () => {
    const lead: Lead = {
      id: 1,
      company_name: "Test Company",
      contact_name: "Test Contact",
      phone: "+1234567890",
      email: "test@example.com",
      message: "Test message",
      created_at: "2024-01-01T00:00:00Z",
      sent_at: "2024-01-01T00:00:00Z",
      link_sent: false,
      is_read: false,
    };

    renderReadCheckbox(lead);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("calls markLeadRead when toggled", async () => {
    const lead: Lead = {
      id: 1,
      company_name: "Test Company",
      contact_name: "Test Contact",
      phone: "+1234567890",
      email: "test@example.com",
      message: "Test message",
      created_at: "2024-01-01T00:00:00Z",
      sent_at: "2024-01-01T00:00:00Z",
      link_sent: false,
      is_read: false,
    };

    mockMarkLeadRead.mockResolvedValue({ success: true });

    renderReadCheckbox(lead);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockMarkLeadRead).toHaveBeenCalledWith(1);
    });
  });

  it("rolls back on API failure", async () => {
    const lead: Lead = {
      id: 1,
      company_name: "Test Company",
      contact_name: "Test Contact",
      phone: "+1234567890",
      email: "test@example.com",
      message: "Test message",
      created_at: "2024-01-01T00:00:00Z",
      sent_at: "2024-01-01T00:00:00Z",
      link_sent: false,
      is_read: false,
    };

    mockMarkLeadRead.mockRejectedValue(new Error("API Error"));

    renderReadCheckbox(lead);
    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).not.toBeChecked(); // Should rollback to unchecked
    });
  });

  it("has correct accessibility label", () => {
    const lead: Lead = {
      id: 1,
      company_name: "Test Company",
      contact_name: "Test Contact",
      phone: "+1234567890",
      email: "test@example.com",
      message: "Test message",
      created_at: "2024-01-01T00:00:00Z",
      sent_at: "2024-01-01T00:00:00Z",
      link_sent: false,
    };

    renderReadCheckbox(lead);
    const checkbox = screen.getByRole("checkbox");

    // Check if the aria-label is set correctly
    expect(checkbox).toHaveAttribute(
      "aria-label",
      "Marcar como leído: Test Company",
    );
  });

  it("falls back to email when company_name is not available", () => {
    const lead: Lead = {
      id: 1,
      company_name: "",
      contact_name: "Test Contact",
      phone: "+1234567890",
      email: "test@example.com",
      message: "Test message",
      created_at: "2024-01-01T00:00:00Z",
      sent_at: "2024-01-01T00:00:00Z",
      link_sent: false,
    };

    renderReadCheckbox(lead);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute(
      "aria-label",
      "Marcar como leído: test@example.com",
    );
  });

  it("falls back to ID when neither company_name nor email is available", () => {
    const lead: Lead = {
      id: 1,
      company_name: "",
      contact_name: "Test Contact",
      phone: "+1234567890",
      email: "",
      message: "Test message",
      created_at: "2024-01-01T00:00:00Z",
      sent_at: "2024-01-01T00:00:00Z",
      link_sent: false,
    };

    renderReadCheckbox(lead);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-label", "Marcar como leído: 1");
  });
});

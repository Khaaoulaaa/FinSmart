import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BadgeCheck,
  Ban,
  Building2,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  FileText,
  Filter,
  LayoutDashboard,
  LogIn,
  LogOut,
  Plus,
  ReceiptText,
  RefreshCw,
  Search,
  Send,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

const demoUsers = [
  {
    email: "gerant@alphasarl.be",
    name: "Nadia Benali",
    pme: "Alpha SARL",
    pme_id: 1,
    role: "gerant_pme",
  },
  {
    email: "comptable@expertise.be",
    name: "Sarah Martin",
    pme: "Expertise & Conseil",
    pme_id: 1,
    role: "comptable",
  },
  {
    email: "admin@finsmart.be",
    name: "Khaoula Admin",
    pme: "FinSmart Pro",
    pme_id: 1,
    role: "admin",
  },
];

const roleLabels = {
  admin: "Admin",
  comptable: "Comptable",
  gerant_pme: "Gerant PME",
};

const initialLogin = {
  email: demoUsers[0].email,
  password: "demo1234",
};

const initialForm = {
  pme_id: 1,
  title: "",
  description: "",
  category: "Fournitures",
  amount: "",
  expense_date: new Date().toISOString().slice(0, 10),
  receipt_url: "",
  created_by_name: "",
};

const fallbackExpenseCategories = ["Fournitures", "Logiciel", "Transport", "Reception", "Autre"];

const initialInvoiceForm = {
  pme_id: 1,
  invoice_number: "",
  client_name: "",
  subject: "",
  amount_ht: "",
  vat_rate: "21.00",
  issue_date: new Date().toISOString().slice(0, 10),
  due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  status: "draft",
  notes: "",
};

const statusLabels = {
  pending: "En attente",
  approved: "Validee",
  rejected: "Refusee",
};

const invoiceStatusLabels = {
  draft: "Brouillon",
  sent: "Envoyee",
  paid: "Payee",
  overdue: "En retard",
};

const statusIcons = {
  pending: Clock3,
  approved: BadgeCheck,
  rejected: Ban,
};

const invoiceStatusIcons = {
  draft: FileText,
  sent: Send,
  paid: BadgeCheck,
  overdue: Ban,
};

function formatCurrency(value) {
  return new Intl.NumberFormat("fr-BE", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value));
}

function formatDate(value) {
  return new Intl.DateTimeFormat("fr-BE").format(new Date(value));
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [loginError, setLoginError] = useState("");
  const [activeView, setActiveView] = useState("expenses");
  const [expenses, setExpenses] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState(fallbackExpenseCategories);
  const [form, setForm] = useState(initialForm);
  const [invoiceForm, setInvoiceForm] = useState(initialInvoiceForm);
  const [statusFilter, setStatusFilter] = useState("all");
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [invoiceSaving, setInvoiceSaving] = useState(false);
  const [error, setError] = useState("");

  const canCreateExpense = currentUser?.role === "gerant_pme" || currentUser?.role === "admin";
  const canDecideExpense = currentUser?.role === "comptable" || currentUser?.role === "admin";
  const canManageInvoices = currentUser?.role === "comptable" || currentUser?.role === "admin";

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesStatus = statusFilter === "all" || expense.status === statusFilter;
      const searchable = `${expense.title} ${expense.category} ${expense.created_by_name}`.toLowerCase();
      const matchesSearch = searchable.includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [expenses, search, statusFilter]);

  const summary = useMemo(() => {
    return expenses.reduce(
      (acc, expense) => {
        acc.total += Number(expense.amount);
        acc[expense.status] += 1;
        return acc;
      },
      { total: 0, pending: 0, approved: 0, rejected: 0 },
    );
  }, [expenses]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((invoice) => {
      const matchesStatus = invoiceStatusFilter === "all" || invoice.status === invoiceStatusFilter;
      const searchable = `${invoice.invoice_number} ${invoice.client_name} ${invoice.subject}`.toLowerCase();
      const matchesSearch = searchable.includes(invoiceSearch.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [invoices, invoiceSearch, invoiceStatusFilter]);

  const invoiceSummary = useMemo(() => {
    return invoices.reduce(
      (acc, invoice) => {
        const amountHt = Number(invoice.amount_ht);
        const vatRate = Number(invoice.vat_rate);

        acc.total += amountHt * (1 + vatRate / 100);
        acc[invoice.status] += 1;
        return acc;
      },
      { total: 0, draft: 0, sent: 0, paid: 0, overdue: 0 },
    );
  }, [invoices]);

  const loadExpenses = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/expenses`);

      if (!response.ok) {
        throw new Error("Impossible de charger les depenses");
      }

      const data = await response.json();
      setExpenses(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadInvoices = useCallback(async () => {
    setInvoiceLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/invoices`);

      if (!response.ok) {
        throw new Error("Impossible de charger les factures");
      }

      const data = await response.json();
      setInvoices(data);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setInvoiceLoading(false);
    }
  }, []);

  const loadExpenseCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/expense-categories`);

      if (!response.ok) {
        throw new Error("Impossible de charger les categories");
      }

      const data = await response.json();
      const categoryNames = data.map((category) => category.name);
      setExpenseCategories(categoryNames.length > 0 ? categoryNames : fallbackExpenseCategories);
    } catch {
      setExpenseCategories(fallbackExpenseCategories);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadExpenseCategories();
      loadExpenses();
      loadInvoices();
    }
  }, [currentUser, loadExpenseCategories, loadExpenses, loadInvoices]);

  function updateLoginForm(event) {
    const { name, value } = event.target;
    setLoginForm((currentForm) => ({ ...currentForm, [name]: value }));
    setLoginError("");
  }

  function chooseDemoUser(user) {
    setLoginForm({ email: user.email, password: "demo1234" });
    setLoginError("");
  }

  function login(event) {
    event.preventDefault();

    if (loginForm.password.trim().length < 4) {
      setLoginError("Le mot de passe doit contenir au moins 4 caracteres pour la demo.");
      return;
    }

    const user = demoUsers.find((demoUser) => demoUser.email === loginForm.email);

    if (!user) {
      setLoginError("Choisis un compte de demonstration pour ce prototype frontend.");
      return;
    }

    setCurrentUser(user);
    setForm((currentForm) => ({
      ...currentForm,
      pme_id: user.pme_id,
      created_by_name: user.name,
    }));
    setInvoiceForm((currentForm) => ({
      ...currentForm,
      pme_id: user.pme_id,
    }));
  }

  function logout() {
    setCurrentUser(null);
    setExpenses([]);
    setInvoices([]);
    setError("");
    setStatusFilter("all");
    setInvoiceStatusFilter("all");
    setSearch("");
    setInvoiceSearch("");
    setActiveView("expenses");
  }

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  function updateInvoiceForm(event) {
    const { name, value } = event.target;
    setInvoiceForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  async function createExpense(event) {
    event.preventDefault();

    if (!canCreateExpense) {
      setError("Seul un gerant PME ou un admin peut creer une depense.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      ...form,
      pme_id: Number(form.pme_id),
      amount: Number(form.amount).toFixed(2),
      receipt_url: form.receipt_url || null,
      description: form.description || null,
      created_by_name: form.created_by_name || currentUser.name,
    };

    try {
      const response = await fetch(`${API_URL}/expenses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("La depense n'a pas pu etre creee");
      }

      setForm({ ...initialForm, pme_id: currentUser.pme_id, created_by_name: currentUser.name });
      await loadExpenses();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function decideExpense(expenseId, action) {
    if (!canDecideExpense) {
      setError("Seul un comptable ou un admin peut valider ou refuser une depense.");
      return;
    }

    setError("");

    const comment = window.prompt("Commentaire", action === "approve" ? "Depense conforme" : "Justificatif manquant");

    try {
      const response = await fetch(`${API_URL}/expenses/${expenseId}/${action}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision_by_name: currentUser.name, comment }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail ?? "Decision impossible");
      }

      await loadExpenses();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function createInvoice(event) {
    event.preventDefault();

    if (!canManageInvoices) {
      setError("Seul un comptable ou un admin peut creer une facture.");
      return;
    }

    setInvoiceSaving(true);
    setError("");

    const payload = {
      ...invoiceForm,
      pme_id: Number(invoiceForm.pme_id),
      amount_ht: Number(invoiceForm.amount_ht).toFixed(2),
      vat_rate: Number(invoiceForm.vat_rate).toFixed(2),
      notes: invoiceForm.notes || null,
    };

    try {
      const response = await fetch(`${API_URL}/invoices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("La facture n'a pas pu etre creee");
      }

      setInvoiceForm({ ...initialInvoiceForm, pme_id: currentUser.pme_id });
      await loadInvoices();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setInvoiceSaving(false);
    }
  }

  if (!currentUser) {
    return (
      <main className="login-page">
        <section className="login-hero" aria-label="Presentation FinSmart">
          <div className="brand login-brand">
            <div className="brand-mark">F</div>
            <div>
              <strong>FinSmart Pro</strong>
              <span>Expertise & Conseil</span>
            </div>
          </div>
          <div className="login-copy">
            <p className="eyebrow">Espace securise</p>
            <h1>Connexion a la gestion financiere</h1>
            <p>
              Accede a l'espace de suivi des depenses avec un profil de demonstration pour tester les parcours gerant,
              comptable et admin.
            </p>
          </div>
          <div className="login-metrics" aria-label="Indicateurs plateforme">
            <span>
              <strong>3</strong>
              Roles
            </span>
            <span>
              <strong>5</strong>
              Endpoints
            </span>
            <span>
              <strong>CI</strong>
              Active
            </span>
          </div>
        </section>

        <section className="login-panel" aria-label="Connexion">
          <div className="section-heading">
            <LogIn size={20} />
            <h2>Se connecter</h2>
          </div>

          <form className="login-form" onSubmit={login}>
            <label>
              Email
              <select name="email" value={loginForm.email} onChange={updateLoginForm}>
                {demoUsers.map((user) => (
                  <option key={user.email} value={user.email}>
                    {user.email}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Mot de passe
              <input name="password" type="password" value={loginForm.password} onChange={updateLoginForm} />
            </label>

            {loginError ? <div className="alert compact-alert">{loginError}</div> : null}

            <button className="primary-button" type="submit">
              <LogIn size={18} />
              Connexion
            </button>
          </form>

          <div className="demo-switcher" aria-label="Comptes de demonstration">
            {demoUsers.map((user) => (
              <button key={user.email} type="button" onClick={() => chooseDemoUser(user)}>
                <UserRound size={17} />
                <span>{user.name}</span>
                <strong>{roleLabels[user.role]}</strong>
              </button>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">F</div>
          <div>
            <strong>FinSmart Pro</strong>
            <span>{currentUser.pme}</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="Navigation principale">
          <button
            className={`nav-item ${activeView === "expenses" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveView("expenses")}
          >
            <ReceiptText size={18} />
            Depenses
          </button>
          <button
            className={`nav-item ${activeView === "invoices" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveView("invoices")}
          >
            <FileText size={18} />
            Facturation
          </button>
          <button className="nav-item" type="button">
            <CircleDollarSign size={18} />
            Tresorerie
          </button>
          <button className="nav-item" type="button">
            <LayoutDashboard size={18} />
            Reporting
          </button>
        </nav>

        <div className="session-card">
          <div className="session-avatar">
            <ShieldCheck size={18} />
          </div>
          <div>
            <strong>{currentUser.name}</strong>
            <span>{roleLabels[currentUser.role]}</span>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Gestion financiere PME</p>
            <h1>{activeView === "expenses" ? "Suivi des depenses" : "Facturation clients"}</h1>
          </div>
          <div className="topbar-actions">
            <button
              className="icon-button"
              type="button"
              onClick={activeView === "expenses" ? loadExpenses : loadInvoices}
              title="Actualiser"
            >
              <RefreshCw size={18} />
            </button>
            <button className="secondary-button" type="button" onClick={logout}>
              <LogOut size={17} />
              Deconnexion
            </button>
          </div>
        </header>

        <section className="profile-strip" aria-label="Session utilisateur">
          <div>
            <UserRound size={18} />
            <span>{currentUser.name}</span>
          </div>
          <div>
            <ShieldCheck size={18} />
            <span>{roleLabels[currentUser.role]}</span>
          </div>
          <div>
            <Building2 size={18} />
            <span>{currentUser.pme}</span>
          </div>
        </section>

        {error ? (
          <div className="alert" role="alert">
            {error}
          </div>
        ) : null}

        {activeView === "expenses" ? (
          <>
        <section className="summary-grid" aria-label="Indicateurs depenses">
          <SummaryTile label="Total declare" value={formatCurrency(summary.total)} icon={CircleDollarSign} />
          <SummaryTile label="En attente" value={summary.pending} icon={Clock3} />
          <SummaryTile label="Validees" value={summary.approved} icon={BadgeCheck} />
          <SummaryTile label="Refusees" value={summary.rejected} icon={Ban} />
        </section>

        <section className="content-grid">
          <form className="expense-form" onSubmit={createExpense} aria-disabled={!canCreateExpense}>
            <div className="section-heading">
              <Plus size={18} />
              <h2>Nouvelle depense</h2>
            </div>

            {!canCreateExpense ? <p className="muted-note">Ce profil peut consulter les depenses, mais ne peut pas en creer.</p> : null}

            <label>
              Titre
              <input name="title" value={form.title} onChange={updateForm} minLength="3" required disabled={!canCreateExpense} />
            </label>

            <div className="form-row">
              <label>
                PME
                <input name="pme_id" value={form.pme_id} onChange={updateForm} type="number" min="1" required disabled={!canCreateExpense} />
              </label>
              <label>
                Montant
                <input name="amount" value={form.amount} onChange={updateForm} type="number" min="0.01" step="0.01" required disabled={!canCreateExpense} />
              </label>
            </div>

            <div className="form-row">
              <label>
                Categorie
                <select name="category" value={form.category} onChange={updateForm} disabled={!canCreateExpense}>
                  {expenseCategories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label>
                Date
                <input name="expense_date" value={form.expense_date} onChange={updateForm} type="date" required disabled={!canCreateExpense} />
              </label>
            </div>

            <label>
              Gerant
              <input name="created_by_name" value={form.created_by_name} onChange={updateForm} minLength="2" required disabled={!canCreateExpense} />
            </label>

            <label>
              Justificatif
              <input name="receipt_url" value={form.receipt_url} onChange={updateForm} placeholder="https://..." disabled={!canCreateExpense} />
            </label>

            <label>
              Description
              <textarea name="description" value={form.description} onChange={updateForm} rows="4" disabled={!canCreateExpense} />
            </label>

            <button className="primary-button" type="submit" disabled={saving || !canCreateExpense}>
              <Plus size={18} />
              {saving ? "Enregistrement" : "Ajouter"}
            </button>
          </form>

          <section className="expense-panel">
            <div className="panel-toolbar">
              <div className="search-field">
                <Search size={17} />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher" />
              </div>

              <div className="filter-group" aria-label="Filtre statut">
                <Filter size={17} />
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option value="all">Tous</option>
                  <option value="pending">En attente</option>
                  <option value="approved">Validees</option>
                  <option value="rejected">Refusees</option>
                </select>
              </div>
            </div>

            <div className="expense-table" aria-busy={loading}>
              <div className="table-header">
                <span>Depense</span>
                <span>Categorie</span>
                <span>Montant</span>
                <span>Statut</span>
                <span>Actions</span>
              </div>

              {filteredExpenses.map((expense) => (
                <ExpenseRow key={expense.id} expense={expense} onDecision={decideExpense} canDecide={canDecideExpense} />
              ))}

              {!loading && filteredExpenses.length === 0 ? (
                <div className="empty-state">Aucune depense trouvee</div>
              ) : null}

              {loading ? <div className="empty-state">Chargement</div> : null}
            </div>
          </section>
        </section>
          </>
        ) : (
          <>
            <section className="summary-grid" aria-label="Indicateurs factures">
              <SummaryTile label="Total TTC" value={formatCurrency(invoiceSummary.total)} icon={CircleDollarSign} />
              <SummaryTile label="Brouillons" value={invoiceSummary.draft} icon={FileText} />
              <SummaryTile label="Envoyees" value={invoiceSummary.sent} icon={Send} />
              <SummaryTile label="Payees" value={invoiceSummary.paid} icon={BadgeCheck} />
            </section>

            <section className="content-grid">
              <form className="expense-form" onSubmit={createInvoice} aria-disabled={!canManageInvoices}>
                <div className="section-heading">
                  <FileText size={18} />
                  <h2>Nouvelle facture</h2>
                </div>

                {!canManageInvoices ? <p className="muted-note">Ce profil peut consulter les factures, mais ne peut pas en creer.</p> : null}

                <div className="form-row">
                  <label>
                    Numero
                    <input name="invoice_number" value={invoiceForm.invoice_number} onChange={updateInvoiceForm} required disabled={!canManageInvoices} />
                  </label>
                  <label>
                    PME
                    <input name="pme_id" value={invoiceForm.pme_id} onChange={updateInvoiceForm} type="number" min="1" required disabled={!canManageInvoices} />
                  </label>
                </div>

                <label>
                  Client
                  <input name="client_name" value={invoiceForm.client_name} onChange={updateInvoiceForm} minLength="2" required disabled={!canManageInvoices} />
                </label>

                <label>
                  Objet
                  <input name="subject" value={invoiceForm.subject} onChange={updateInvoiceForm} minLength="3" required disabled={!canManageInvoices} />
                </label>

                <div className="form-row">
                  <label>
                    Montant HT
                    <input name="amount_ht" value={invoiceForm.amount_ht} onChange={updateInvoiceForm} type="number" min="0.01" step="0.01" required disabled={!canManageInvoices} />
                  </label>
                  <label>
                    TVA %
                    <input name="vat_rate" value={invoiceForm.vat_rate} onChange={updateInvoiceForm} type="number" min="0" max="100" step="0.01" required disabled={!canManageInvoices} />
                  </label>
                </div>

                <div className="form-row">
                  <label>
                    Emission
                    <input name="issue_date" value={invoiceForm.issue_date} onChange={updateInvoiceForm} type="date" required disabled={!canManageInvoices} />
                  </label>
                  <label>
                    Echeance
                    <input name="due_date" value={invoiceForm.due_date} onChange={updateInvoiceForm} type="date" required disabled={!canManageInvoices} />
                  </label>
                </div>

                <label>
                  Statut
                  <select name="status" value={invoiceForm.status} onChange={updateInvoiceForm} disabled={!canManageInvoices}>
                    <option value="draft">Brouillon</option>
                    <option value="sent">Envoyee</option>
                    <option value="paid">Payee</option>
                    <option value="overdue">En retard</option>
                  </select>
                </label>

                <label>
                  Notes
                  <textarea name="notes" value={invoiceForm.notes} onChange={updateInvoiceForm} rows="3" disabled={!canManageInvoices} />
                </label>

                <button className="primary-button" type="submit" disabled={invoiceSaving || !canManageInvoices}>
                  <Plus size={18} />
                  {invoiceSaving ? "Enregistrement" : "Ajouter"}
                </button>
              </form>

              <section className="expense-panel">
                <div className="panel-toolbar">
                  <div className="search-field">
                    <Search size={17} />
                    <input value={invoiceSearch} onChange={(event) => setInvoiceSearch(event.target.value)} placeholder="Rechercher une facture" />
                  </div>

                  <div className="filter-group" aria-label="Filtre statut facture">
                    <Filter size={17} />
                    <select value={invoiceStatusFilter} onChange={(event) => setInvoiceStatusFilter(event.target.value)}>
                      <option value="all">Tous</option>
                      <option value="draft">Brouillons</option>
                      <option value="sent">Envoyees</option>
                      <option value="paid">Payees</option>
                      <option value="overdue">En retard</option>
                    </select>
                  </div>
                </div>

                <div className="expense-table" aria-busy={invoiceLoading}>
                  <div className="table-header invoice-table-header">
                    <span>Facture</span>
                    <span>Client</span>
                    <span>Total TTC</span>
                    <span>Echeance</span>
                    <span>Statut</span>
                  </div>

                  {filteredInvoices.map((invoice) => (
                    <InvoiceRow key={invoice.id} invoice={invoice} />
                  ))}

                  {!invoiceLoading && filteredInvoices.length === 0 ? (
                    <div className="empty-state">Aucune facture trouvee</div>
                  ) : null}

                  {invoiceLoading ? <div className="empty-state">Chargement</div> : null}
                </div>
              </section>
            </section>
          </>
        )}
      </section>
    </main>
  );
}

function SummaryTile({ label, value, icon: Icon }) {
  return (
    <div className="summary-tile">
      <Icon size={20} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ExpenseRow({ expense, onDecision, canDecide }) {
  const StatusIcon = statusIcons[expense.status];
  const isPending = expense.status === "pending";

  return (
    <article className="expense-row">
      <div>
        <strong>{expense.title}</strong>
        <span>
          <CalendarDays size={14} />
          {formatDate(expense.expense_date)} par {expense.created_by_name}
        </span>
      </div>
      <div>{expense.category}</div>
      <div className="amount">{formatCurrency(expense.amount)}</div>
      <div>
        <span className={`status-pill ${expense.status}`}>
          <StatusIcon size={14} />
          {statusLabels[expense.status]}
        </span>
      </div>
      <div className="row-actions">
        <button type="button" disabled={!isPending || !canDecide} onClick={() => onDecision(expense.id, "approve")} title="Valider">
          <Check size={16} />
        </button>
        <button type="button" disabled={!isPending || !canDecide} onClick={() => onDecision(expense.id, "reject")} title="Refuser">
          <X size={16} />
        </button>
      </div>
    </article>
  );
}

function InvoiceRow({ invoice }) {
  const StatusIcon = invoiceStatusIcons[invoice.status];
  const totalTtc = Number(invoice.amount_ht) * (1 + Number(invoice.vat_rate) / 100);

  return (
    <article className="expense-row invoice-row">
      <div>
        <strong>{invoice.invoice_number}</strong>
        <span>{invoice.subject}</span>
      </div>
      <div>{invoice.client_name}</div>
      <div className="amount">{formatCurrency(totalTtc)}</div>
      <div>{formatDate(invoice.due_date)}</div>
      <div>
        <span className={`status-pill invoice-${invoice.status}`}>
          <StatusIcon size={14} />
          {invoiceStatusLabels[invoice.status]}
        </span>
      </div>
    </article>
  );
}

export default App;

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

const statusLabels = {
  pending: "En attente",
  approved: "Validee",
  rejected: "Refusee",
};

const statusIcons = {
  pending: Clock3,
  approved: BadgeCheck,
  rejected: Ban,
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
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const canCreateExpense = currentUser?.role === "gerant_pme" || currentUser?.role === "admin";
  const canDecideExpense = currentUser?.role === "comptable" || currentUser?.role === "admin";

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

  useEffect(() => {
    if (currentUser) {
      loadExpenses();
    }
  }, [currentUser, loadExpenses]);

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
  }

  function logout() {
    setCurrentUser(null);
    setExpenses([]);
    setError("");
    setStatusFilter("all");
    setSearch("");
  }

  function updateForm(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
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
          <button className="nav-item active" type="button">
            <ReceiptText size={18} />
            Depenses
          </button>
          <button className="nav-item" type="button">
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
            <h1>Suivi des depenses</h1>
          </div>
          <div className="topbar-actions">
            <button className="icon-button" type="button" onClick={loadExpenses} title="Actualiser">
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
                  <option>Fournitures</option>
                  <option>Logiciel</option>
                  <option>Transport</option>
                  <option>Reception</option>
                  <option>Autre</option>
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

export default App;

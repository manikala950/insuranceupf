import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState, useEffect, ChangeEvent } from "react";

/* ================= TYPES ================= */
interface Agent {
  id: number;
  agentId: string;
  name: string;
  email: string;
  number: string;
  address: string;
  stateCode: string;
  districtCode: string;
  mandalCode: string;
}

interface AgentFilters {
  agentId: string;
  name: string;
}

const PAGE_SIZE = 5;
const API_URL = import.meta.env.VITE_API_URL;

export default function Agents() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [search, setSearch] = useState<AgentFilters>({
    agentId: "",
    name: "",
  });

  const [viewAgent, setViewAgent] = useState<Agent | null>(null);
  const [editAgent, setEditAgent] = useState<Agent | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [page, setPage] = useState(1);

  /* ================= LOAD ================= */
  const loadAgents = async () => {
    const res = await fetch(`${API_URL}/agent/all`);
    const data = await res.json();
    setAgents(data);
  };

  useEffect(() => {
    loadAgents();
  }, []);

  /* ================= FILTER ================= */
  const filteredAgents = agents.filter(
    (a) =>
      a.agentId.toLowerCase().includes(search.agentId.toLowerCase()) &&
      a.name.toLowerCase().includes(search.name.toLowerCase())
  );

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(filteredAgents.length / PAGE_SIZE);
  const pagedAgents = filteredAgents.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  /* ================= SELECT ================= */
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(
      selectedIds.length === pagedAgents.length
        ? []
        : pagedAgents.map((a) => a.id)
    );
  };

  /* ================= DELETE ================= */
  const deleteSelected = async () => {
    await Promise.all(
      selectedIds.map((id) =>
        fetch(`${API_URL}/agent/${id}`, { method: "DELETE" })
      )
    );
    setSelectedIds([]);
    setConfirmDelete(false);
    loadAgents();
  };

  /* ================= UPDATE ================= */
  const saveEdit = async () => {
    if (!editAgent) return;

    await fetch(`${API_URL}/agent/${editAgent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editAgent),
    });

    setEditAgent(null);
    loadAgents();
  };

  /* ================= EXPORT CSV ================= */
  const exportCSV = () => {
    if (!agents.length) return;

    const header = [
      "agentId",
      "name",
      "email",
      "number",
      "address",
      "stateCode",
      "districtCode",
      "mandalCode",
    ].join(",");

    const rows = agents.map((a) =>
      [
        a.agentId,
        a.name,
        a.email,
        a.number,
        a.address,
        a.stateCode,
        a.districtCode,
        a.mandalCode,
      ].join(",")
    );

    const blob = new Blob([header + "\n" + rows.join("\n")], {
      type: "text/csv",
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "agents.csv";
    link.click();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className={`transition-all ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        <main className="p-6 space-y-6">
          <h2 className="text-3xl font-bold">Agents</h2>

          {/* FILTERS */}
          <div className="bg-white p-4 shadow rounded grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              name="agentId"
              placeholder="Agent ID"
              className="border p-2 rounded"
              value={search.agentId}
              onChange={handleSearchChange}
            />
            <input
              name="name"
              placeholder="Agent Name"
              className="border p-2 rounded"
              value={search.name}
              onChange={handleSearchChange}
            />
            <button
              onClick={exportCSV}
              className="bg-green-600 text-white rounded px-4 py-2"
            >
              Export CSV
            </button>
            {selectedIds.length > 0 && (
              <button
                onClick={() => setConfirmDelete(true)}
                className="bg-red-600 text-white rounded px-4 py-2"
              >
                Delete ({selectedIds.length})
              </button>
            )}
          </div>

          {/* TABLE */}
          <div className="bg-white p-6 shadow rounded">
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length === pagedAgents.length &&
                        pagedAgents.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="border p-2">Agent ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pagedAgents.map((agent) => (
                  <tr key={agent.id}>
                    <td className="border p-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(agent.id)}
                        onChange={() => toggleSelect(agent.id)}
                      />
                    </td>
                    <td className="border p-2">{agent.agentId}</td>
                    <td className="border p-2">{agent.name}</td>
                    <td className="border p-2">{agent.email}</td>
                    <td className="border p-2">{agent.number}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() => setViewAgent(agent)}
                      >
                        View
                      </button>
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                        onClick={() => setEditAgent(agent)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* PAGINATION */}
            <div className="flex justify-center mt-4 gap-4">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>⬅</button>
              <span>Page {page} / {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>➡</button>
            </div>
          </div>

          {/* VIEW MODAL */}
          {viewAgent && (
            <Modal title="Agent Details" onClose={() => setViewAgent(null)}>
              <Detail label="Agent ID" value={viewAgent.agentId} />
              <Detail label="Name" value={viewAgent.name} />
              <Detail label="Email" value={viewAgent.email} />
              <Detail label="Phone" value={viewAgent.number} />
              <Detail label="Address" value={viewAgent.address} />
            </Modal>
          )}

          {/* EDIT MODAL */}
          {editAgent && (
            <Modal title="Edit Agent" onClose={() => setEditAgent(null)}>
              <input
                className="border p-2 w-full mb-2"
                value={editAgent.name}
                onChange={(e) =>
                  setEditAgent({ ...editAgent, name: e.target.value })
                }
              />
              <input
                className="border p-2 w-full mb-2"
                value={editAgent.number}
                onChange={(e) =>
                  setEditAgent({ ...editAgent, number: e.target.value })
                }
              />
              <button
                onClick={saveEdit}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Save Changes
              </button>
            </Modal>
          )}

          {/* CONFIRM DELETE */}
          {confirmDelete && (
            <Modal title="Confirm Delete" onClose={() => setConfirmDelete(false)}>
              <p>Are you sure you want to delete selected agents?</p>
              <button
                onClick={deleteSelected}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded"
              >
                Yes, Delete
              </button>
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

/* ================= HELPER COMPONENTS ================= */
function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-2">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-[480px]">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
        <button
          className="mt-6 w-full bg-gray-600 text-white py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

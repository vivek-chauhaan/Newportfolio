import { useState } from "react";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch.js";
import skillService from "../../services/skillService.js";
import DataTable from "../components/DataTable.jsx";
import FormModal from "../components/FormModal.jsx";
import Loader from "../../components/common/Loader.jsx";

export default function SkillsManage() {
  const {
    data: skills,
    loading,
    refetch,
  } = useFetch(() => skillService.getAll(), []);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const fields = [
    {
      name: "name",
      label: "Skill Name",
      required: true,
    },
    {
      name: "proficiency",
      label: "Proficiency (0-100)",
      type: "number",
    },
    {
      name: "icon",
      label: "Icon (key/URL)",
    },
    {
      name: "displayOrder",
      label: "Display Order",
      type: "number",
    },
  ];

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "proficiency",
      label: "Proficiency",
      render: (row) => `${row.proficiency || 0}%`,
    },
    {
      key: "icon",
      label: "Icon",
      render: (row) => row.icon || "—",
    },
    {
      key: "displayOrder",
      label: "Order",
      render: (row) => row.displayOrder ?? 0,
    },
  ];

  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (row) => {
    setEditing(row);
    setModalOpen(true);
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        name: values.name,
        proficiency: values.proficiency ? Number(values.proficiency) : 70,
        icon: values.icon || "",
        displayOrder: values.displayOrder ? Number(values.displayOrder) : 0,
      };

      console.log("Skill payload:", payload);

      if (editing) {
        await skillService.update(editing.id, payload);
        toast.success("Skill updated");
      } else {
        await skillService.create(payload);
        toast.success("Skill created");
      }

      setModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Skill save error:", error);
      toast.error(error?.response?.data?.message || "Save failed");
    }
  };

  const handleDelete = async (row) => {
    if (!confirm(`Delete "${row.name}"?`)) return;

    try {
      await skillService.delete(row.id);
      toast.success("Skill deleted");
      refetch();
    } catch (error) {
      console.error("Skill delete error:", error);
      toast.error(error?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Skills</h1>

      <DataTable
        columns={columns}
        rows={skills || []}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addLabel="Add Skill"
      />

      <FormModal
        open={modalOpen}
        title={editing ? "Edit Skill" : "Add Skill"}
        fields={fields}
        initialValues={editing || {}}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

const RemoveAdmin = ({isOpen, onClose, index}) => {
  if (!isOpen) return null;

  const deleteAdmin = async () => {
    try {
      let res = await fetch(`/api/admin/${index}`, {
        method: "DELETE",
      });
      let msg = await res.json();
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = () => {
    deleteAdmin();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-800/25 backdrop-blur-sm">
      <div className="bg-slate-50 font-montserrat w-2/5 justify-between flex flex-col min-h-[16rem] shadow-lg py-10 rounded-lg px-5">
        <p className="text-center font-bold text-2xl">Remove Admin?</p>
        <div className="flex gap-5 justify-end">
          <button
            onClick={onClose}
            className=" hover:bg-slate-200 transition-colors px-5 py-2.5 "
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-zinc-800 text-slate-200 px-5 py-2.5 hover:outline hover:outline-2 hover:outline-zinc-800 hover:text-zinc-800 hover:bg-transparent transition-colors "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

module.exports = RemoveAdmin;

import {
  AiOutlineEye,
  AiOutlineFileSearch,
  AiOutlineForm,
  AiOutlineDelete,
  AiOutlineFileAdd,
} from "react-icons/ai";

export default function JobVacancies() {
  return (
    <section className="space-y-10">
      <h1 className="font-montserrat text-2xl md:text-4xl font-bold pt-16">
        Job Vacancies
      </h1>
      <div className="space-y-4">
        <div className="flex justify-end">
          <button className="font-montserrat bg-zinc-800 text-slate-200 px-4 py-2 hover:bg-transparent hover:text-zinc-800 hover:outline hover:outline-2 hover:outline-zinc-800 transi duration-200">
            Review (5)
          </button>
        </div>
        <div>
          <table className="w-full border-collapse border border-zinc-800 text-left table-fixed">
            <thead className="font-montserrat text-xs md:text-sm">
              <tr className="border border-b border-zinc-800 bg-zinc-200">
                <th className="py-2 pl-4">Job</th>
                <th className="py-2 line-clamp-1">Company</th>
                <th className="py-2">Location</th>
                <th className="py-2">Notes</th>
                <th className="py-2">Poster</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody className="text-sm font-montserrat text-zinc-600">
              <tr>
                <td className="py-4 pl-4 border-b border-zinc-800">
                  <p className="line-clamp-1">Creative Content Writer</p>
                </td>
                <td className="border-b border-zinc-800">
                  <p className="line-clamp-1">Digiexpo Indonesia</p>
                </td>
                <td className="border-b border-zinc-800">
                  <p className="line-clamp-1">Jakarta Barat</p>
                </td>
                <td className="border-b border-zinc-800">
                  <p className="line-clamp-2">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Magnam excepturi quaerat nemo, ducimus iure hic dolore fuga
                    nesciunt sed laudantium!
                  </p>
                </td>
                <td className="border-b border-zinc-800">
                  <div className="flex flex-row items-center gap-3">
                    <button>
                      <AiOutlineFileAdd
                        title="add/update"
                        size={25}
                        className="hover:text-amber-400"
                      />
                    </button>
                    <button>
                      <AiOutlineFileSearch
                        title="view PDF"
                        size={25}
                        className="hover:text-blue-400"
                      />
                    </button>
                  </div>
                </td>
                <td className="border-b border-zinc-800">
                  <div className="flex flex-row items-center gap-3">
                    <button>
                      <AiOutlineEye
                        size={25}
                        title="view"
                        className="hover:text-blue-400"
                      />
                    </button>
                    <button>
                      <AiOutlineForm
                        size={25}
                        title="edit"
                        className="hover:text-amber-400"
                      />
                    </button>
                    <button>
                      <AiOutlineDelete
                        size={25}
                        title="delete"
                        className="hover:text-red-400"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

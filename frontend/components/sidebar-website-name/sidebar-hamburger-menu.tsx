export default function SidebarHamburgerMenu() {
  return (
    <div className="flex items-center gap-3 bg-black p-4">
      <div></div>
      <button className="flex flex-col justify-between w-6 h-5 ">
        <span className="block h-0.5 bg-white"></span>
        <span className="block h-0.5 bg-white"></span>
        <span className="block h-0.5 bg-white"></span>
      </button>

      <div className="bg-white px-4 py-2 rounded-sm">
        <h1 className="text-blue-600 font-bold text-xl">Patyo</h1>
      </div>
    </div>
  );
}

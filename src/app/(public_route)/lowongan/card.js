import Image from "next/image";
import Building from "../../../../public/buildings.png"
import Map from "../../../../public/map.png"

export default function Card({ array, type, onClicked }) {
  if (type === false)
    return (
      <div className="grid gap-2 sm:gap-5 grid-cols-2 lg:grid-cols-3 mx-0 p-[5%] xs:p-5 sm:p-8 md:p-12 w-full overflow-x-hidden overflow-y-hidden">
        {array.map((card, i) => (
          <div onClick={() => onClicked(card)} key={i} className="max-h-[370px] w-full shadow-md p-4 flex flex-col justify-between">
            <div className="bg-slate-300 max-h-[250px] w-full overflow-y-hidden">
              <img src={card.image} alt="Preview" />
            </div>
            <div>
              <h2 className="text-xl mb-2 line-clamp-1 font-montserrat font-medium">{card.jobTitle}</h2>
              <div className="flex flex-row justify-between mx-3">
                <div className="flex flex-row">
                  <div className="flex items-center">
                    <Image src={Building} />
                  </div>
                  <div className="text-sm mx-2 line-clamp-1	font-montserrat">{card.company}</div>
                </div>
                <div className="flex flex-row">
                  <div className="flex items-center">
                    <Image src={Map} />
                  </div>
                  <div className="text-sm mx-2 line-clamp-1	font-montserrat">{card.location}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="grid gap-2 sm:gap-5 grid-cols-2 lg:grid-cols-3 mx-0 p-[5%] xs:p-5 sm:p-8 md:p-12 w-full overflow-x-hidden overflow-y-hidden">
      {array.map((card, i) => (
        <div onClick={() => onClicked(card)} key={i} className="max-h-[370px] w-full shadow-md p-4">
          <div className="bg-slate-300 max-h-[250px] w-full overflow-y-hidden">
            <img src={card.image} alt="Preview" />
          </div>
          <h3 className="text-base p-0 m-0 line-clamp-1 font-playfairDisplay italic text-[#B68D40] mx-3">{card.name}</h3>
          <div className="flex flex-row justify-between mx-3">
            <div className="flex flex-col">
              <h1 className="p-0 m-0 line-clamp-1	font-montserrat font-medium">{card.jobTitle}</h1>
              <h1 className="text-base p-0 m-0 line-clamp-1	font-montserrat font-medium text-[#000000]">{card.skills }</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

}
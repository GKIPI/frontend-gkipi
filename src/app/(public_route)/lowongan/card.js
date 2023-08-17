import Image from "next/image";
import Building from "../../../../public/buildings.png"
import Map from "../../../../public/map.png"

export default function Card({ array, type, onClicked }){
    if (type === false)
      return (
        <div className="grid gap-2 sm:gap-5 grid-cols-2 lg:grid-cols-3 mx-0 p-[5%] xs:p-5 sm:p-8 md:p-12 w-full overflow-x-hidden overflow-y-hidden">
          {array.map((card, i) => (
            <div onClick={() => onClicked(card)} key={i} className="max-h-[370px] w-full shadow-md p-4">
              <div className="bg-slate-300 max-h-[250px] w-full overflow-y-hidden">
                <img src={card.image} alt="Preview" />
              </div>
              <h2 className="text-xl font-bold mb-2 line-clamp-1	">{card.title}</h2>
              <div className="flex flex-row justify-between mx-3">
                <div className="flex flex-row">
                  <div className="flex items-center">
                    <Image src={Building} />
                  </div>
                  <div className="text-sm mx-2 line-clamp-1	">{card.company}</div>
                </div>
                <div className="flex flex-row">
                  <div className="flex items-center">
                    <Image src={Map} />
                  </div>
                  <div className="text-sm mx-2 line-clamp-1	">{card.location}</div>
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
            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
            <div className="flex flex-row justify-between mx-3">
              <div className="flex flex-col">
                <h3 className="text-xs p-0 m-0 line-clamp-1	">{card.name}</h3>
                <h1 className="font-bold p-0 m-0 line-clamp-1	">{card.jobTitle}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    )

}
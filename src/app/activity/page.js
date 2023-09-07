import Carousell from "../components/carousell";
import Navbar from '../components/navbar_hero'

import ImageBg from "../../../public/Activity.png"
import Image from "next/image"

function generateCardData(numCards) {
    const cardData = [];
    for (let i = 1; i <= numCards; i++) {
        cardData.push({
            title: `Card ${i}`,
            description: `Lorem ipsumdsja ajasndjas asjndlasdnlas for Card ${i}`,
        });
    }
    return cardData;
}

export default function Activity() {

    const cardData = generateCardData(10);

    return (
        <section className="flex items-center flex-col overflow-hidden">
            <Navbar />
            <div className="mt-[90px] md:mt-[100px]">
                <Carousell />
            </div>
            <div className="w-[90vw] mt-3">
                <h1 className="text-3xl font-bold my-[10px]">Our Activities:</h1>
                {cardData.map((card, index) => (
                    <Card key={index} title={card.title} description={card.description} />
                ))}
            </div>
        </section>
    )
}
export function Card({ title, description }) {
    return (
        <div>
            <div className="flex flex-row p-3">
                <div className="w-[100px] h-[50px] overflow-hidden">
                    <Image src={ImageBg} alt={title} />
                </div>
                <div className="px-3">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </div>
            <hr />
        </div>
    )
}
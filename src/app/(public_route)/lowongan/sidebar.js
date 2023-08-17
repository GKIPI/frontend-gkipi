"use client";
import { useEffect, useState } from "react";

export default function Sidebar({ handleSearch }) {
    const [isLogin, setIsLogin] = useState(false);
    const [selectedIndustries, setSelectedIndustries] = useState([]);
    const [selectedTitles, setSelectedTitles] = useState([]);
    let passarg = []
    const handleClick = () => {
        handleSearch(selectedIndustries, selectedTitles);
    };
    

    const handleIndustryChange = (event) => {
        const industry = event.target.value;
        const isChecked = event.target.checked;

        const isIndustrySelected = selectedIndustries.includes(industry);

        if (isChecked && !isIndustrySelected) {
            setSelectedIndustries([...selectedIndustries, industry]);
        } else if (!isChecked && isIndustrySelected) {
            setSelectedIndustries(selectedIndustries.filter((item) => item !== industry));
        }
    };
    const handleTitleChange = (event) => {
        const title = event.target.value;
        const isChecked = event.target.checked;

        const isTitleSelected = selectedTitles.includes(title);

        if (isChecked && !isTitleSelected) {
            setSelectedTitles([...selectedTitles, title]);
        } else if (!isChecked && isTitleSelected) {
            setSelectedTitles(selectedTitles.filter((item) => item !== title));
        }
    };

    return (
        <div className="lg:min-w-[25%] ">
            {isLogin ? (
                <div className="logined h-full bg-tertiary">sidebar not logged in yet</div>
            ) : (
                <div className="hidden lg:flex not-logined h-full justify-center items-center">
                    <div className="border-2 border-primary w-full m-2 p-2 h-min">
                        <div className="text-[24px]">Search by:</div>
                        <div className="text-[20px] m-2">Industry</div>
                        <div className="mx-3">
                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="Industrial / Manufacturing"
                                    checked={selectedIndustries.includes("Industrial / Manufacturing")}
                                    onChange={handleIndustryChange}
                                />
                                Industrial / Manufacturing
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="Insurance"
                                    checked={selectedIndustries.includes("Insurance")}
                                    onChange={handleIndustryChange}
                                />
                                Insurance
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="FMCG"
                                    checked={selectedIndustries.includes("FMCG")}
                                    onChange={handleIndustryChange}
                                />
                                FMCG
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="Media & Agency"
                                    checked={selectedIndustries.includes("Media & Agency")}
                                    onChange={handleIndustryChange}
                                />
                                Media & Agency
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="Financial Service"
                                    checked={selectedIndustries.includes("Financial Service")}
                                    onChange={handleIndustryChange}
                                />
                                Financial Service
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="Property"
                                    checked={selectedIndustries.includes("Property")}
                                    onChange={handleIndustryChange}
                                />
                                Property
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="Retail"
                                    checked={selectedIndustries.includes("Retail")}
                                    onChange={handleIndustryChange}
                                />
                                Retail
                            </label>
                            <br />
                        </div>
                        <div className="text-[20px] m-2">Title</div>
                        <div className="mx-3">
                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="Staff"
                                    checked={selectedTitles.includes("Staff")}
                                    onChange={handleTitleChange}
                                />
                                Staff
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="Supervisor"
                                    checked={selectedTitles.includes("Supervisor")}
                                    onChange={handleTitleChange}
                                />
                                Supervisor
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="Manager"
                                    checked={selectedTitles.includes("Manager")}
                                    onChange={handleTitleChange}
                                />
                                Manager
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="General Manager"
                                    checked={selectedTitles.includes("General Manager")}
                                    onChange={handleTitleChange}
                                />
                                General Manager
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="Director"
                                    checked={selectedTitles.includes("Director")}
                                    onChange={handleTitleChange}
                                />
                                Director
                            </label>
                            <br />
                        </div>
                        <button
                            onClick={handleClick}
                            className=" px-4 py-1 bg-zinc-800 text-slate-200 font-montserrat text-xl hover:outline hover:outline-2 hover:bg-transparent hover:outline-zinc-800 hover:text-zinc-800 transition-colors"
                        >
                            Filter
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";
import { useState } from "react";

export default function Sidebar() {
    const [isLogin, setIsLogin] = useState(false);
    const [selectedIndustries, setSelectedIndustries] = useState([]); 
    const [selectedTitles, setSelectedTitles] = useState([]); 



    const handleIndustryChange = (event) => {
        const industry = event.target.value;
        const isChecked = event.target.checked;

        const isIndustrySelected = selectedIndustries.includes(industry);

        if (isChecked && !isIndustrySelected) {
            setSelectedIndustries([...selectedIndustries, industry]);
        } else if (!isChecked && isIndustrySelected) {
            setSelectedIndustries(selectedIndustries.filter((item) => item !== industry));
        }
        console.log("Selected Industries:", selectedIndustries);
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
        console.log("Selected Titles:", selectedTitles);
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
                                    value="industrial"
                                    checked={selectedIndustries.includes("industrial")}
                                    onChange={handleIndustryChange}
                                />
                                Industrial / Manufacturing
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="insurance"
                                    checked={selectedIndustries.includes("insurance")}
                                    onChange={handleIndustryChange}
                                />
                                Insurance
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="fmcg"
                                    checked={selectedIndustries.includes("fmcg")}
                                    onChange={handleIndustryChange}
                                />
                                FMCG
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="media"
                                    checked={selectedIndustries.includes("media")}
                                    onChange={handleIndustryChange}
                                />
                                Media & Agency
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="financial"
                                    checked={selectedIndustries.includes("financial")}
                                    onChange={handleIndustryChange}
                                />
                                Financial Service
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="property"
                                    checked={selectedIndustries.includes("property")}
                                    onChange={handleIndustryChange}
                                />
                                Property
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="retail"
                                    checked={selectedIndustries.includes("retail")}
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
                                    value="staff"
                                    checked={selectedTitles.includes("staff")}
                                    onChange={handleTitleChange}
                                />
                                Staff
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="supervisor"
                                    checked={selectedTitles.includes("supervisor")}
                                    onChange={handleTitleChange}
                                />
                                Supervisor
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="manager"
                                    checked={selectedTitles.includes("manager")}
                                    onChange={handleTitleChange}
                                />
                                Manager
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="generalManager"
                                    checked={selectedTitles.includes("generalManager")}
                                    onChange={handleTitleChange}
                                />
                                General Manager
                            </label>
                            <br />

                            <label className="w-max">
                                <input
                                    type="checkbox"
                                    value="dicrector"
                                    checked={selectedTitles.includes("dicrector")}
                                    onChange={handleTitleChange}
                                />
                                Director
                            </label>
                            <br />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

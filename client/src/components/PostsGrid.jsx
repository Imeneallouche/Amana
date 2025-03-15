import React from "react";
import { DonationCard } from "./PostCard";
import orphanImage from "../assets/kids.png";
import orphanImage2 from "../assets/africankids.png";

export function DonationGrid() {
    const dummyData = [
        { title: "Sponsor an Orphan in Oran", location: "Algeria, Oran", urgency: "Ongoing", total: 10400, raised: 5200, image: orphanImage },
        { title: "Qufat Ramadan", location: "Algeria, Blida  ", urgency: "High", total: 8000, raised: 4500, image: orphanImage2 },
        { title: "Fund a brain surgery", location: "Algeria, Alger", urgency: "Urgent", total: 12000, raised: 6000, image: orphanImage },
        { title: "Education for Refugees", location: "Beirut, Lebanon", urgency: "Moderate", total: 5000, raised: 2500, image: orphanImage },
        { title: "Rebuild Homes in Turkey", location: "Istanbul, Turkey", urgency: "Ongoing", total: 15000, raised: 7500, image: orphanImage },
        { title: "Clean Water Initiative", location: "Nairobi, Kenya", urgency: "High", total: 9000, raised: 5000, image: orphanImage },
        { title: "Disaster Relief in Haiti", location: "Port-au-Prince, Haiti", urgency: "Critical", total: 7000, raised: 3500, image: orphanImage },
        { title: "Support for Afghan Families", location: "Kabul, Afghanistan", urgency: "Urgent", total: 10000, raised: 4800, image: orphanImage },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {dummyData.map((data, index) => (
                <DonationCard key={index} {...data} />
            ))}
        </div>
    );
}
export default DonationGrid;
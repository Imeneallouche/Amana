import React from "react";
import { CheckCircle, XCircle, Phone, Mail, MapPin } from "lucide-react";
import CareRequestCard from "./CareRequestCard";

import profileImage from "../assets/pfp.jpg";
import situation1 from "../assets/situation.png";
import situation2 from "../assets/situation1.png";
import situation3 from "../assets/situation2.png";
export function CareRequestGrid() {
    const dummyData = [
        {
            name: "Michael Chen",
            caseId: "#2025-0124",
            status: "Pending",
            phone: "+1 (555) 123-4567",
            email: "sarah.j@email.com",
            location: "Brooklyn, NY 11201",
            images: [situation1, situation2, situation3], // Change from situationImages to images
            needs: ["Medical Assistance", "Mobility Equipment", "Regular Care Visits"],
            profileImage: profileImage
        },
        {
            name: "Emily Davis",
            caseId: "#2025-0456",
            status: "Approved",
            phone: "+1 (555) 987-6543",
            email: "emily.d@email.com",
            location: "Los Angeles, CA 90001",
            images: [situation1, situation2], // Change here too
            needs: ["Home Care", "Physical Therapy"],
            profileImage: profileImage
        },
        {
            name: "John Smith",
            caseId: "#2025-0789",
            status: "Declined",
            phone: "+1 (555) 246-8102",
            email: "john.s@email.com",
            location: "Chicago, IL 60601",
            images: [situation3], // Change here as well
            needs: ["Psychological Support", "Medical Checkups"],
            profileImage: profileImage
        },
        {
            name: "John Smith",
            caseId: "#2025-0789",
            status: "Declined",
            phone: "+1 (555) 246-8102",
            email: "john.s@email.com",
            location: "Chicago, IL 60601",
            images: [situation3], // Change here as well
            needs: ["Psychological Support", "Medical Checkups"],
            profileImage: profileImage
        },
        {
            name: "John Smith",
            caseId: "#2025-0789",
            status: "Declined",
            phone: "+1 (555) 246-8102",
            email: "john.s@email.com",
            location: "Chicago, IL 60601",
            images: [situation3], // Change here as well
            needs: ["Psychological Support", "Medical Checkups"],
            profileImage: profileImage
        },
        {
            name: "John Smith",
            caseId: "#2025-0789",
            status: "Declined",
            phone: "+1 (555) 246-8102",
            email: "john.s@email.com",
            location: "Chicago, IL 60601",
            images: [situation3], // Change here as well
            needs: ["Psychological Support", "Medical Checkups"],
            profileImage: profileImage
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
            {dummyData.map((data, index) => (
                <CareRequestCard key={index} {...data} />
            ))}
        </div>
    );
}

export default CareRequestGrid;


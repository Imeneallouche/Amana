import { Download } from "lucide-react";

const reports = [
  {
    title: "May 2025 Impact Report",
    description: "12% reduction in malnutrition",
    link: "#",
  },
  {
    title: "April 2025 Impact Report",
    description: "Educational support for 45 children",
    link: "#",
  },
  {
    title: "March 2025 Impact Report",
    description: "Healthcare access improved for 78 families",
    link: "#",
  },
];

export default function ImpactReports() {
  return (
    <div className="w-full mx-auto p-6 pt-0">
      <div className="space-y-2">
        {reports.map((report, index) => (
          <div key={index} className="w-full flex items-center justify-between p-4 border rounded-lg transition-transform transform hover:scale-105 duration-200">
            <div className="flex items-center space-x-4">
              <span className="bg-gray-200 p-2 rounded text-sm font-medium">PDF</span>
              <div>
                <h3 className="text-lg font-semibold">{report.title}</h3>
                <p className="text-gray-500 text-sm">{report.description}</p>
              </div>
            </div>
            <a href={report.link} className="text-yellow-500 hover:text-yellow-600">
              <Download size={20} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

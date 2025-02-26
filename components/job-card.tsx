"use client";

import { MatchScoreBadge } from "@/components/match-score-badge";
import { Button } from "@/components/ui/button";
import { calculateMatchScore } from "@/lib/match-score";
import { useJobStore } from "@/store/job-store";
import { Job } from "@/types";
import { motion } from "framer-motion";
import { Clock, DollarSign, Heart, MapPin } from "lucide-react";

interface JobCardProps extends Job {
  isSelected: boolean;
  onClick: () => void;
}

export function JobCard({
  id,
  company,
  logo,
  title,
  location,
  salary,
  postedTime,
  requiredSkills = [],
  isSelected,
  onClick,
}: JobCardProps) {
  const { saveJob, removeSavedJob, userProfile } = useJobStore(); 
  const isSaved = userProfile.applications.some((app) => app.jobId === id && app.status === "saved"); // Check if saved

  // ✅ Toggle Save/Unsave
  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event

    if (isSaved) {
      removeSavedJob(id); // 
    } else {
      saveJob({ id, jobId: id, company, logo, title, location, salary, skills: requiredSkills });
    }
  };

  // ✅ Dynamically calculate match score
  const matchScore = calculateMatchScore({ requiredSkills, location, salary }, userProfile);

  return (
    <motion.div
      className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${isSelected ? "border-emerald-600 bg-emerald-50" : "hover:border-emerald-200"
        }`}
      onClick={onClick}
      layout
      animate={{ scale: isSelected ? 1.02 : 1 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
            <img src={logo || "/placeholder.svg"} alt={company} className="w-full h-full rounded-xl object-cover" />
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <div className="text-sm text-gray-500">{company}</div>
          </div>

          {/* ✅ Dynamically calculated match score */}
          <MatchScoreBadge score={matchScore} />
        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            {salary}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            {postedTime}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {requiredSkills.slice(0, 3).map((skill) => (
            <div
              key={skill}
              className={`text-xs px-2 py-1 rounded-full border ${matchScore >= 80
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : matchScore >= 50
                    ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                    : "border-gray-200 bg-gray-50 text-gray-700"
                }`}
            >
              {skill}
            </div>
          ))}
          {requiredSkills.length > 3 && (
            <div className="text-xs px-2 py-1 rounded-full border border-gray-200 bg-gray-50 text-gray-700">
              +{requiredSkills.length - 3} more
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="icon"
          className={isSaved ? "text-red-500" : ""}
          onClick={handleToggleSave} // ✅ Toggle Save/Remove
        >
          <Heart className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
        </Button>
        <Button variant="outline">Details</Button>
      </div>
    </motion.div>
  );
}

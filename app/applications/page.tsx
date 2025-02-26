"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationCard } from "@/components/application-card";
import { useJobStore } from "@/store/job-store"; // ✅ Import Zustand store
import type { ApplicationStatus } from "@/types";

export default function ApplicationsPage() {
  const searchParams = useSearchParams();
  const { userProfile } = useJobStore(); // ✅ Get userProfile from Zustand
  const applications = userProfile.applications || []; // ✅ Use Zustand applications

  const [highlightedId, setHighlightedId] = useState<string | null>(
    searchParams.get("highlight")
  );

  useEffect(() => {
    if (highlightedId) {
      const timer = setTimeout(() => setHighlightedId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [highlightedId]);

  // ✅ Fix filtering to avoid crashing when no applications exist
  const filterApplications = (status: ApplicationStatus) => {
    return applications?.filter((app) => app.status === status) || [];
  };

  return (
    <div className="container px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">My Applications</h1>
        <p className="text-muted-foreground">Track and manage your job applications</p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active" className="relative">
            Active Applications
            <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              {filterApplications("active").length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="saved">
            Saved Applications
            <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              {filterApplications("saved").length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="expired">
            Expired Applications
            <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              {filterApplications("expired").length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <AnimatePresence>
            {filterApplications("active").map((application) => (
              <motion.div
                key={application.id}
                initial={highlightedId === application.id ? { scale: 0.95 } : false}
                animate={{
                  scale: 1,
                  backgroundColor: highlightedId === application.id ? "#f0fdf4" : "transparent",
                }}
                transition={{ duration: 0.3 }}
              >
                <ApplicationCard application={application} />
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {filterApplications("saved").map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {filterApplications("expired").map((application) => (
            <ApplicationCard key={application.id} application={application} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

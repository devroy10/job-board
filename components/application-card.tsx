import { Clock, MapPin, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Application } from "@/types"

interface ApplicationCardProps {
  application: Application
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700"
      case "saved":
        return "bg-blue-100 text-blue-700"
      case "expired":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
        <img
          src={application.logo || "/placeholder.svg"}
          alt={application.company}
          className="w-full h-full rounded-xl object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-medium">{application.title}</h3>
          <Badge variant="secondary" className={getStatusColor(application.status)}>
            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">{application.company}</div>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {application.location}
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            {application.salary}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Applied {new Date(application.appliedDate).toLocaleDateString()}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {application.skills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <Button variant="outline">View Details</Button>
      </div>
    </div>
  )
}


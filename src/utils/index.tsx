import { Calendar, CalendarDays, CogIcon, Grid2X2, Inbox } from "lucide-react";

export const primaryNavItems = [
  {
    id: "primary",
    name: "Inbox",
    link: "/dashboard",
    icon: <Inbox className="w-4 h-4" />,
  },
  {
    name: "Today",
    link: "/dashboard/today",
    icon: <Calendar className="w-4 h-4" />,
  },
  {
    name: "Upcoming",
    link: "/dashboard/upcomming",
    icon: <CalendarDays className="w-4 h-4" />,
  },
  {
    id: "filters",
    name: "Filters & Labels",
    link: "/dashboard/filter-labels",
    icon: <Grid2X2 className="w-4 h-4" />,
  },
  {
    id : "progress",
    name : "Progress",
    link : "/dashboard/progress",
    icon : <CogIcon className="w-4 h-4" />
  },
  {
    id : "meetings",
    name : "Meetings",
    link : "/dashboard/meetings",
    icon : <CalendarDays className="w-4 h-4" />
  }
];

export const GET_STARTED_PROJECT_ID = "k97fs8npdxzkr39y5vjcp9kq1d6tycm1";

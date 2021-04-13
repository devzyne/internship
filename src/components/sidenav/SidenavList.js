import HomeIcon from "../../assets/Component 29 – 1.svg";
import NotificationsIcon from "../../assets/notification_icon.svg";
import DashboardIcon from "../../assets/Component 28 – 1.svg";
import JobBuilderIcon from "../../assets/Component 31 – 1.svg";
import ManageProfileIcon from "../../assets/manage_profile.svg";
export const adminSidenav = [
  {
    title: "Home",
    link: "/customer/admin/home",
    icon: HomeIcon,
  },
  {
    title: "Notifications",
    link: "/notifications",
    icon: NotificationsIcon,
  },
];

export const managerSidenav = [
  {
    title: "Home",
    link: "/customer/manager/home",
    icon: HomeIcon,
  },
  {
    title: "Dashboard",
    link: "/customer/manager/dashboard",
    icon: DashboardIcon,
  },
  {
    title: "Job Builder",
    link: "/job-builder-industry",
    icon: JobBuilderIcon,
  },
  {
    title: "Notifications",
    link: "/notifications",
    icon: NotificationsIcon,
  },
];

export const PartnerAdminSidenav = [
  {
    title: "Home",
    link: "/partner/admin/home",
    icon: HomeIcon,
  },
  {
    title: "Manage Contingent Worker",
    link: "/partner/admin/manage-contingent-workers",
    icon: ManageProfileIcon,
  },
  {
    title: "Notifications",
    link: "/notifications",
    icon: NotificationsIcon,
  },
];
export const contingentWorkerSidenav = [
  {
    title: "Home",
    link: "/gigworker/home",
    icon: HomeIcon,
  },
  {
    title: "Manage Profile",
    link: "/gig-industry",
    icon: ManageProfileIcon,
  },
  {
    title: "Notifications",
    link: "/notifications",
    icon: NotificationsIcon,
  },
];

import HomeIcon from "../../assets/Component 29 – 1.svg";
import NotificationsIcon from "../../assets/notification_icon.svg";
import DashboardIcon from "../../assets/Component 28 – 1.svg";
import JobBuilderIcon from "../../assets/Component 31 – 1.svg";
import ManageProfileIcon from "../../assets/manage_profile.svg";

export const customerAdminBottomNav = [
  {
    src: HomeIcon,
    LinkTo: "/customer/admin/home",
  },
  {
    src: NotificationsIcon,
    LinkTo: "/notifications",
  },
];

export const customerManagerBottomNav = [
  {
    src: HomeIcon,
    LinkTo: "/customer/manager/home",
  },
  {
    src: DashboardIcon,
    LinkTo: "/customer/manager/dashboard",
  },
  {
    src: JobBuilderIcon,
    LinkTo: "/job-builder-industry",
  },
];

export const PartnerAdminBottomNav = [
  {
    title: "Home",
    LinkTo: "/partner/admin/home",
    src: HomeIcon,
  },
  {
    title: "Manage Contingent Worker",
    LinkTo: "/partner/admin/manage-contingent-workers",
    src: ManageProfileIcon,
  },
  {
    title: "Notifications",
    LinkTo: "/notifications",
    src: NotificationsIcon,
  },
];
export const ContingentWorkerBottomNav = [
  {
    title: "Home",
    LinkTo: "/gigworker/home",
    src: HomeIcon,
  },
  {
    title: "Manage Profile",
    LinkTo: "/gig-industry",
    src: ManageProfileIcon,
  },
  {
    title: "Notifications",
    LinkTo: "/notifications",
    src: NotificationsIcon,
  },
];

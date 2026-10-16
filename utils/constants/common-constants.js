export const profileMenus = [
  { label: "Profile", path: "/admin/profile", icon: "AccountCircle" },
  {
    label: "Change Password",
    path: "/admin/account/change-password",
    icon: "Lock"
  }
];

export const siteSettingFields = {
  title: "",
  slug: "",
  config_value: ""
};

export const dateFormat = [
  {
    value: "dd/MM/yyyy",
    label: "dd/MM/yyyy"
  }
];

export const dashboardTypes = [
  {
    value: "financial",
    label: "Financial"
  },
  {
    value: "operational",
    label: "Operational"
  },
  {
    value: "support",
    label: "Support"
  }
];

export const statusType = [
  {
    value: "1",
    label: "Active"
  },
  {
    value: "0",
    label: "Inactive"
  }
];

export const allowedTypes = [
  "application/msword", // .doc
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  "application/vnd.ms-excel", // .xls
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "text/csv", // .csv
  "application/pdf", // .pdf
  "image/jpeg", // .jpeg, .jpg
  "image/png", // .png
  "image/gif", // .gif
  "image/webp" // .webp (optional)
];

export const adminMenuItems = [
  {
    id: 1,
    label: "Dashboard",
    icon: "DashboardOutlined",
    path: "/admin/dashboard"
  },
  {
    id: 2,
    label: "User Management",
    icon: "Group",
    path: "/admin/user-management/list-user"
  },
  {
    id: 3,
    label: "Practitioner Management",
    icon: "PersonOutlineOutlined",
    path: "/admin/practitioner-management/list-practitioner"
  },
  {
    id: 4,
    label: "Studio Management",
    icon: "StorefrontOutlined",
    path: "/admin/studio-management/list-studio"
  },
  {
    id: 5,
    label: "Studio Room Management",
    icon: "MeetingRoomOutlined",
    path: "/admin/studio-room-management/list-studio-room"
  },
  {
    id: 6,
    label: "Class Management",
    icon: "InventoryOutlined",
    path: "/admin/class-management/list-class"
  },
  {
    id: 7,
    label: "Modality Management",
    icon: "CategoryOutlined",
    path: "/admin/modalities-management/list-modality"
  },
  {
    id: 8,
    label: "Content & Policy",
    icon: "Article",
    path: "/admin/content-management/list-content"
  },
  // {
  //   id: 7,
  //   label: "Payments Oversight",
  //   icon: "ReceiptLongOutlined",
  //   path: "/admin/account/payments"
  // },
  // {
  //   id: 8,
  //   label: "Reviews & Ratings",
  //   icon: "Star",
  //   path: "/admin/account/reviews"
  // },
  // {
  //   id: 9,
  //   label: "Analytics & Insights",
  //   icon: "BarChart",
  //   path: "/admin/account/analytics"
  // },
  // {
  //   id: 10,
  //   label: "Geo Awareness",
  //   icon: "Public",
  //   path: "/admin/account/geo"
  // },
  // {
  //   id: 11,
  //   label: "Content & Policy",
  //   icon: "Article",
  //   path: "/admin/account/content"
  // },
  // {
  //   id: 12,
  //   label: "Wellness Quiz",
  //   icon: "Quiz",
  //   path: "/admin/account/quiz"
  // },
  {
    id: 9,
    label: "Site Settings",
    icon: "SettingsOutlined",
    path: "/admin/site-setting/settings"
  }
];

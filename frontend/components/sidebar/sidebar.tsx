"use client";

import "./sidebar.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileInfo from "../profile_info/profile_info";

const NAV_ITEMS = [
  {
    label: "Projects",
    href: "/projects",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: "Teams",
    href: "/teams",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: "Calculator",
    href: "/calculator",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="8" y1="10" x2="9" y2="10" />
        <line x1="12" y1="10" x2="13" y2="10" />
        <line x1="16" y1="10" x2="17" y2="10" />
        <line x1="8" y1="14" x2="9" y2="14" />
        <line x1="12" y1="14" x2="13" y2="14" />
        <line x1="16" y1="14" x2="17" y2="14" />
        <line x1="8" y1="18" x2="9" y2="18" />
        <line x1="12" y1="18" x2="13" y2="18" />
        <line x1="16" y1="18" x2="17" y2="18" />
      </svg>
    ),
  },
  {
    label: "Chatbot",
    href: "/chatbot",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar-root">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <svg viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span className="sidebar-brand-name">Patyo</span>
      </div>

      <span className="sidebar-section-label">Navigation</span>

      {/* Nav links */}
      <ul className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <li key={item.href} className="sidebar-nav-item">
            <Link
              href={item.href}
              className={pathname?.startsWith(item.href) ? "active" : ""}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Profile */}
      <Link
        href="/profile"
        className="sidebar-profile-link"
        aria-label="Open profile settings"
      >
        <ProfileInfo
          name="Lyna Larinouna"
          title="AI Engineer"
          photoUrl="/profile.jpg"
        />
      </Link>
    </div>
  );
}

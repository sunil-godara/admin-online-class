import { useEffect, useState } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  ol: {
    "li.MuiBreadcrumbs-li": {
      a: {
        background: "#f2f2f2",
        padding: "4px 16px",
        borderRadius: theme.spacing(2),
        color: "inherit",
        textDecoration: "none",
        fontSize: "14px"
      },

      p: {
        fontSize: "14px"
      }
    }
  }
}));

const routes = [
  {
    title: "user-management",
    name: "User Management",
    slug: "/admin/user-management/list-user"
  },
  {
    title: "practitioner-management",
    name: "Practitioner Management",
    slug: "/admin/practitioner-management/list-practitioner"
  },
  {
    title: "view-practitioner",
    name: "View Practitioner",
    slug: "/admin/practitioner-management/view-practitioner"
  },
  {
    title: "studio-management",
    name: "Studio Management",
    slug: "/admin/studio-management/list-studio"
  },
  {
    title: "view-studio",
    name: "View Studio",
    slug: "/admin/studio-management/view-studio"
  },
  {
    title: "studio-room-management",
    name: "Studio Room Management",
    slug: "/admin/studio-room-management/list-studio-room"
  },
  {
    title: "view-studio-room",
    name: "View Studio-Room",
    slug: "/admin/studio-room-management/view-studio-room"
  },
  {
    title: "class-management",
    name: "Class Management",
    slug: "/admin/class-management/list-class"
  },
  {
    title: "view-class",
    name: "View Class",
    slug: "/admin/class-management/view-class"
  },
  {
    title: "modalities-management",
    name: "Modality Management",
    slug: "/admin/modalities-management/list-modality"
  },
  {
    title: "view-modality",
    name: "View Modality",
    slug: "/admin/modalities-management/view-modality"
  },
  {
    title: "edit-modality",
    name: "Edit Modality",
    slug: "/admin/modalities-management/edit-modality"
  },
  {
    title: "content-management",
    name: "Content Management",
    slug: "/admin/content-management/list-content"
  },
  {
    title: "view-content",
    name: "View Content",
    slug: "/admin/content-management/view-content"
  },
  {
    title: "edit-content",
    name: "Edit Content",
    slug: "/admin/site-content/edit-content"
  },
  {
    title: "view-user",
    name: "View User",
    slug: "/admin/user-management/view-user"
  },
  {
    title: "profile",
    name: "Profile",
    slug: "/account/profile"
  },
  {
    title: "site-setting",
    name: "Settings",
    slug: "/admin/site-setting/settings"
  },
  {
    title: "edit-setting",
    name: "Edit Setting",
    slug: "/admin/site-setting/edit-setting"
  }
];

export const getUrlSlug = (title, type) => {
  const finalPath = title.split("?")[0];
  const route = routes.find(route => route.title === finalPath);

  if (route) {
    return route[type];
  }

  return type === "name" ? "Dashboard" : "/admin/dashboard";
};

const Breadcrumb = () => {
  const router = useRouter();
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const breadcrumbData = [];

    breadcrumbData.push({
      title: "Dashboard",
      slug: "/admin/dashboard"
    });

    if (router.asPath !== "/admin/dashboard") {
      const paths = router.asPath.split("/");
      delete paths[0];

      for (let title of paths) {
        if (title) {
          let finalTitle = title;

          if (
            title === "scheme-support" &&
            paths[paths.length - 1].includes("choices")
          ) {
            finalTitle = "list-choices-scheme";
          } else if (
            title === "scheme-support" &&
            paths[paths.length - 1].includes("store")
          ) {
            finalTitle = "list-store-scheme";
          } else if (
            title === "scheme-support" &&
            paths[paths.length - 1].includes("debit")
          ) {
            finalTitle = "list-direct-debit-payment";
          }

          if (
            title === "report-management" &&
            paths[paths.length - 1] === "add-permission"
          ) {
            continue;
          }

          !/^\d+$/.test(title) &&
            breadcrumbData.push({
              title: getUrlSlug(finalTitle, "name"),
              slug: getUrlSlug(finalTitle, "slug")
            });
        }
      }
    }

    // Use a Set to create a unique set of objects based on a property (e.g., id)
    const uniqueObjectsSet = new Set(
      breadcrumbData.map(obj => JSON.stringify(obj))
    );

    // Convert the Set back to an array of unique objects
    const uniqueArrayOfObjects = Array.from(uniqueObjectsSet).map(strObj =>
      JSON.parse(strObj)
    );

    if (isMounted) {
      setBreadcrumb(uniqueArrayOfObjects);
    }

    return () => {
      isMounted = false;
    };
  }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div role="presentation">
      <StyledBreadcrumbs aria-label="breadcrumb">
        {breadcrumb.length > 0 &&
          breadcrumb.map(({ title, slug }, index) => {
            if (title) {
              if (
                index === breadcrumb.length - 1 ||
                (!breadcrumb[breadcrumb.length - 1].title &&
                  index === breadcrumb.length - 2)
              ) {
                return (
                  <Typography color="text.primary" key={`${slug}-${index}`}>
                    {title}
                  </Typography>
                );
              }
              return (
                <Link
                  underline="hover"
                  color="inherit"
                  href={slug}
                  key={`${slug}-${index}`}
                >
                  {title}
                </Link>
              );
            }
          })}
      </StyledBreadcrumbs>
    </div>
  );
};

export default Breadcrumb;

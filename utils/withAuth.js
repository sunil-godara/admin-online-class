import { getSession } from "next-auth/react";
import { isSessionValid } from "utils/helpers";
import { verifyUser, getSiteSettings } from "utils/api/common";

export const withAuth = getServerSideProps => {
  return async context => {
    const session = await getSession(context);

    if (!isSessionValid(session)) {
      return {
        redirect: {
          destination: "/admin/login"
        }
      };
    }

    const {
      user: { token }
    } = session;

    let data = {
      token: token
    };

    const isUserValid = await verifyUser(data);
    if (isUserValid.status === false) {
      return {
        redirect: {
          destination: "/admin/login?isSessionExpired=expired"
        }
      };
    }

    const propsData = await getServerSideProps(context); // Run `getServerSideProps` to get page-specific data

    let settings = "";

    const response = await getSiteSettings(token);

    if (response.status) {
      settings = response.data;
    }
    // Pass page-specific props along with user data from `withAuth` to component
    return {
      props: {
        ...propsData.props,
        session,
        settings: settings || ""
      }
    };
  };
};

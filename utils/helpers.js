import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { parseISO, format } from "date-fns";
import {
  PictureAsPdf,
  TextSnippet,
  FileCopy,
  Description,
  Summarize,
  Delete,
  RemoveRedEye
} from "@mui/icons-material";
import MuiIconButton from "@/components/presentation/MuiIconButton";

const MySwal = withReactContent(Swal);

export const isSessionValid = session => {
  if (
    typeof session !== "undefined" &&
    session !== null &&
    typeof session.user !== "undefined"
  ) {
    const { expires } = session;

    if (Date.parse(new Date()) > Date.parse(expires)) return false;

    return true;
  }

  return false;
};

export const showAlert = (text, handleDelete, id, scheme_type) => {
  MySwal.fire({
    title: "Are you sure?",
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        const response = await handleDelete(id, scheme_type);

        if (!response.status) {
          if (
            response.message ===
            "You are not authorized to perform this action."
          ) {
            return MySwal.showValidationMessage(`
            ${JSON.stringify(await response.message)}
          `);
          }
          return MySwal.showValidationMessage(`
                  ${JSON.stringify(await response.json())}
                `);
        }

        return response;
      } catch (error) {
        MySwal.showValidationMessage(`
                Request failed: ${error}
              `);
      }
    },
    allowOutsideClick: () => !MySwal.isLoading()
  }).then(result => {
    if (result.isConfirmed) {
      MySwal.fire({
        title: "Deleted!",
        text: result.value.message,
        icon: "success"
      });
    }
  });
};

export const showOrderDeleteAlert = (text, handleDelete) => {
  MySwal.fire({
    title: "Are you sure?",
    text: text,
    icon: "warning",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    denyButtonColor: "#555555",
    confirmButtonText: "Delete This Product Only!",
    cancelButtonText: "Cancel",
    denyButtonText: "Delete Complete Order!",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        const response = await handleDelete(false);
        console.log(response);
        if (!response.status) {
          if (
            response.message ===
            "You are not authorized to perform this action."
          ) {
            return MySwal.showValidationMessage(`
            ${JSON.stringify(await response.message)}
          `);
          }
          return MySwal.showValidationMessage(`
                  ${JSON.stringify(await response.json())}
                `);
        }

        return response;
      } catch (error) {
        MySwal.showValidationMessage(`
                Request failed: ${error}
              `);
      }
    },
    preDeny: async () => {
      try {
        const response = await handleDelete(true);
        console.log("dfhjdkhgjkdfh", response);
        if (!response.status) {
          if (
            response.message ===
            "You are not authorized to perform this action."
          ) {
            return MySwal.showValidationMessage(`
            ${JSON.stringify(await response.message)}
          `);
          }
          return MySwal.showValidationMessage(`
                  ${JSON.stringify(await response.json())}
                `);
        }

        return response;
      } catch (error) {
        MySwal.showValidationMessage(`
                Request failed: ${error}
              `);
      }
    },
    allowOutsideClick: () => !MySwal.isLoading()
  }).then(async result => {
    if (result.isConfirmed) {
      MySwal.fire({
        title: "Deleted!",
        text: result.value.message,
        icon: "success"
      });
    }

    if (result.isDenied) {
      MySwal.fire({
        title: "Deleted!",
        text: result.value.message,
        icon: "success"
      });
    }
  });
};

export const capitalizeFirstLetter = string => {
  return string && string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDate = (dateFormat, date) => {
  if (dateFormat) {
    return date && format(parseISO(date), dateFormat);
  }

  return date && format(parseISO(date), "MM/dd/yyyy");
};

export const isMenuSelected = (menuItems, selectedPath) => {
  let resultIds = [];

  for (let menu of menuItems) {
    if (menu.path && menu.path === selectedPath) {
      resultIds.push(menu.id);
    } else if (menu.subMenu) {
      for (let subMenu of menu.subMenu) {
        if (subMenu.path && subMenu.path === selectedPath) {
          resultIds.push(menu.id);
          resultIds.push(subMenu.id);
        } else if (subMenu.subSubMenu) {
          for (let subSubMenu of subMenu.subSubMenu) {
            if (subSubMenu.path && subSubMenu.path === selectedPath) {
              resultIds.push(menu.id);
              resultIds.push(subMenu.id);
              resultIds.push(subSubMenu.id);
            }
          }
        }
      }
    }
  }
  return resultIds;
};

const handleDocumentView = url => {
  window.open(url, "_blank", "noreferrer");
};

export const getDocumentUrl = (documents, docType, valueType) => {
  const document =
    documents && documents.find(document => document.doc_type === docType);

  if (document) {
    switch (valueType) {
      case "name": {
        return document.filename;
      }
      case "url": {
        return document.filepath;
      }
      case "icon": {
        const extension = getFileExtension(document.filename);

        return (
          <MuiIconButton
            color="darkBlue"
            onClick={() => handleDocumentView(document.filepath)}
            title={document.filename}
          >
            {getFileIcons(extension)}
          </MuiIconButton>
        );
      }
      default: {
        return (
          <a download href={document.filepath} target="_blank" rel="noreferrer">
            {document.filename}
          </a>
        );
      }
    }
  }

  return "N/A";
};

export const getDocumentId = (documents, docType) => {
  const document =
    documents && documents.find(document => document.doc_type === docType);

  if (document) {
    return document.id;
  }

  return false;
};

export const simplifiedModuleList = moduleList => {
  let inputModules = [];

  for (let moduleType of moduleList) {
    inputModules.push({
      name: moduleType.name,
      show_name: moduleType.show_name,
      id: moduleType.id,
      read: false,
      write: false,
      delete: false
    });
  }

  return inputModules;
};

export const simplifiedProductAttributeList = attributeList => {
  let inputModules = [];

  for (let attributeType of attributeList) {
    inputModules.push({
      attribute_id: attributeType.id,
      show_name: attributeType.title,
      read: false,
      write: false
    });
  }

  return inputModules;
};

export const simplifiedReportAttribute = reportAttributes => {
  let inputModules = [];

  for (let attributeType of reportAttributes) {
    inputModules.push({
      attribute_id: attributeType.id,
      show_name: attributeType.title,
      read: false,
      write: false
    });
  }

  return inputModules;
};

function mergeModules(arr1, arr2) {
  return arr1.map((module, index) => ({
    ...module,
    ...arr2[index]
  }));
}

function mergeArrays(arr1, arr2, key) {
  const combined = [...arr1, ...arr2];
  const unique = new Map(combined.map(item => [item[key], item]));
  return Array.from(unique.values());
}

export const getFormattedUserData = (
  userDetail,
  productAttributes,
  reportingAttributes,
  permissionModules
) => {
  return {
    role_id: userDetail.role_id,
    first_name: userDetail.first_name,
    second_name: userDetail.second_name,
    email: userDetail.email,
    department_email: userDetail.department_email,
    phone: userDetail.phone,
    password: userDetail.password,
    status: userDetail.status,
    can_request_refund: userDetail.can_request_refund,
    user_id: userDetail.id,
    permission_modules: mergeModules(
      permissionModules,
      userDetail.permission_modules
    ).map(modules => {
      return {
        id: modules.id,
        name: modules.name,
        read: modules.read,
        write: modules.write,
        delete: modules.delete,
        show_name: modules.show_name
      };
    }),
    product_attributes: mergeArrays(
      productAttributes,
      userDetail.product_attribute_permission,
      "attribute_id"
    ).map(attributes => {
      return {
        attribute_id: attributes.attribute_id,
        read: attributes.read,
        write: attributes.write,
        show_name: attributes.show_name
      };
    }),
    report_attributes: mergeArrays(
      reportingAttributes,
      userDetail.report_attribute_permission,
      "attribute_id"
    ).map(attributes => {
      return {
        attribute_id: attributes.attribute_id,
        read: attributes.read,
        write: attributes.write,
        show_name: attributes.show_name
      };
    })
  };
};

export const getFormattedUserBodyData = bodyData => {
  return {
    ...bodyData,
    permission_modules: bodyData.permission_modules.map(modules => {
      return {
        ...modules,
        read: true,
        write: true,
        delete: true
      };
    }),
    product_attributes: bodyData.product_attributes.map(attributes => {
      return {
        ...attributes,
        read: true,
        write: true
      };
    }),
    report_attributes: bodyData.report_attributes.map(attributes => {
      return {
        ...attributes,
        read: true,
        write: true
      };
    })
  };
};

export const getFormattedCustomerData = (userDetails, user_type) => {
  return {
    id: userDetails.id,
    role_id: userDetails.role_id,
    type: userDetails[user_type].type,
    name: userDetails.name,
    email: userDetails.email,
    prefix: userDetails.prefix,
    phone: userDetails.phone,
    scheme_id: userDetails.customer?.scheme_type_id,
    website: userDetails.user_details.website,
    reporting_url: userDetails.user_details.reporting_url,
    reporting_user_login: userDetails.user_details.reporting_user_login,
    reporting_password: userDetails.user_details.reporting_password,
    agreed_commission: userDetails.introducer?.agreed_commission,
    notes: userDetails.introducer?.notes,
    user_details: {
      address_line1: userDetails.user_details.address_line1,
      address_line2: userDetails.user_details.address_line2,
      address_line3: userDetails.user_details.address_line3,
      state: userDetails.user_details.state,
      post_code: userDetails.user_details.post_code,
      account_name: userDetails.user_details.account_name,
      account_number: userDetails.user_details.account_number,
      sort_code: userDetails.user_details.sort_code
    },
    user_signatory_details: userDetails.user_signatory_details,
    user_main_contact_details: userDetails.user_main_contact_details,
    user_finance_contact_details: userDetails.user_finance_contact_details,
    user_technical_contact_details: userDetails.user_technical_contact_details,
    user_account_contact_details: userDetails.user_account_contact_details,
    user_support_contact_details: userDetails.user_support_contact_details
  };
};

export const getFileExtension = filename => {
  if (filename) {
    const parts = filename.split(".");
    const extension = parts[parts.length - 1];
    return extension;
  }

  return "";
};

export const getFileIcons = type => {
  switch (type) {
    case "pdf": {
      return <PictureAsPdf />;
    }
    case "docs": {
      return <FileCopy />;
    }
    case "csv": {
      return <Description />;
    }
    case "xlsx": {
      return <Summarize />;
    }
    default: {
      return <TextSnippet />;
    }
  }
};

export const getActionButtons = (callback, id, module, scheme_type) => {
  let actions = [];
  const viewButton = (
    <MuiIconButton
      key={`view-${id}`}
      color="cyan"
      onClick={() => callback("view", id, scheme_type)}
      title="View"
    >
      <RemoveRedEye />
    </MuiIconButton>
  );

  const deleteButton = (
    <MuiIconButton
      key={`delete-${id}`}
      color="darkRed"
      onClick={() => callback("delete", id, scheme_type)}
      title="Delete"
    >
      <Delete />
    </MuiIconButton>
  );

  actions = [...actions, viewButton];
  actions = [...actions, deleteButton];

  return actions;
};

export const deepEqual = (obj1, obj2) => {
  // Check if both objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // If they're not objects or arrays, compare their values directly
  if (typeof obj1 !== "object" || obj1 === null) {
    return obj1 === obj2;
  }

  // Get the keys of the objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Iterate through the keys and recursively compare the values
  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const getConfig = (settings = [], slug) => {
  if (settings && Array.isArray(settings)) {
    const currentSetting = settings.find(setting => setting.slug === slug);

    if (currentSetting) {
      return currentSetting.configValue;
    }
  }

  if (slug === "ADMIN_PAGE_LIMIT") {
    return 0;
  }

  return false;
};

export const simplifiedAttributeList = attributeList => {
  let inputModules = [];

  for (let moduleType of attributeList) {
    inputModules.push({
      scheme_id: moduleType.scheme_id,
      attribute_id: moduleType.attribute_id,
      show_name: moduleType.title,
      read: moduleType.read,
      write: moduleType.write
    });
  }

  return inputModules;
};

export const isArrayBlank = arr => {
  // Check if array is empty
  if (arr.length === 0) {
    return true; // Array is blank
  }

  // Check if all objects in the array are blank
  for (let obj of arr) {
    if (!isObjectBlank(obj)) {
      return false; // At least one object is not blank
    }
  }

  return true; // All objects are blank
};

export const isObjectBlank = obj => {
  // Check if object is empty
  if (Object.keys(obj).length === 0) {
    return true; // Object is blank
  }

  // Check if all keys in the object are blank
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== "") {
      return false; // At least one key is not blank
    }
  }

  return true; // All keys are blank
};

export const getProductAttributeSimplified = productDetails => {
  let attributeDetails = {};

  if (productDetails.attributes) {
    for (let attribute of productDetails.attributes) {
      attributeDetails = {
        ...attributeDetails,
        [attribute.attribute_details.input_title]: attribute.value
      };
    }
  }

  return attributeDetails;
};

export const filterMenus = (menus, permissions) => {
  const allowedPermissions = permissions
    .filter(p => p.read || p.write)
    .map(p => p.show_name.toLowerCase());

  function isMenuAllowed(menuName) {
    let name = menuName.toLowerCase();

    if (
      name === "section header" ||
      name === "sub header" ||
      name === "content"
    ) {
      name = "content library";
    }

    if (name === "list po" || name === "add po" || name === "po invoices") {
      name = "po creation";
    }

    if (name === "list invoice" || name === "add invoice") {
      name = "invoice creation";
    }

    if (name === "list refunds" || name === "add refund") {
      name = "refund management";
    }

    if (name === "list statements" || name === "add statement") {
      name = "statement creation";
    }

    if (name === "list quotes" || name === "add quote") {
      name = "quote statement creation";
    }

    if (name === "list credit notes" || name === "add credit note") {
      name = "credit note creation";
    }

    if (name === "list remittance notes" || name === "add remittance note") {
      name = "remittance advice";
    }

    return allowedPermissions.some(
      perm => name.includes(perm) || perm.includes(name)
    );
  }

  function filterItems(items) {
    return items.reduce((acc, item) => {
      const newItem = { ...item };

      if (newItem.subMenu) {
        newItem.subMenu = filterItems(newItem.subMenu);
      }
      if (newItem.subSubMenu) {
        newItem.subSubMenu = filterItems(newItem.subSubMenu);
      }

      const hasAllowedChildren =
        (newItem.subMenu && newItem.subMenu.length > 0) ||
        (newItem.subSubMenu && newItem.subSubMenu.length > 0);

      const itemName = newItem.label || newItem.title;

      if (hasAllowedChildren || isMenuAllowed(itemName)) {
        acc.push(newItem);
      }

      return acc;
    }, []);
  }

  return filterItems(menus);
};

import { User } from "../../models/models";
export class NavigationModel {
  public model: any[];

  constructor() {
    let user: User = JSON.parse(localStorage.getItem("currentUser"));
    console.log("role ID: " + user.roleId);
    this.model = [
      {
        id: "marketplace",
        title: "Marketplace",
        type: "collapse",
        icon: "network_check",
        role: 'admin',
        children: [
          {
            id: "marketplace",
            title: "View",
            type: "item",
            icon: "view_module",
            url: "marketplace"
          }
        ]
      },
      {
        id: "property",
        title: "Properties",
        type: "collapse",
        icon: "device_hub",
        role: "admin",
        children: [
          {
            id: "create",
            title: "Create",
            type: "item",
            icon: "add_circle",
            url: "property/create"
          },
          {
            id: "view",
            title: "View",
            type: "item",
            icon: "view_module",
            url: "property/view"
          }
        ]
      },
      {
        id: "builder",
        title: "Builder",
        type: "collapse",
        icon: "domain",
        role: "admin",

        children: [
          {
            id: 'create',
            title: 'Create',
            type: 'item',
            icon: 'add_circle',
            url: 'builders/create'
          },
          {
            id: 'view',
            title: 'View',
            type: 'item',
            icon: 'view_module',
            url: 'builders/view'
          },
        ]
      },
      {
        id: "users",
        title: "Users",
        type: "collapse",
        icon: "person",
        role: 'admin',
        children: [
          {
            id: 'create',
            title: 'Create',
            type: 'item',
            icon: 'add_circle',
            url: 'users/create'
          },
          {
            id: 'view',
            title: 'View',
            type: 'item',
            icon: 'view_module',
            url: 'users/view'
          }
        ]
      },
      // {
      //   id: "manage",
      //   title: "Manage",
      //   type: "collapse",
      //   icon: "view_module",
      //   role: "admin",
      //   children: [
      //     {
      //       id: "Bought Properties",
      //       title: "Bought Properties",
      //       type: "item",
      //       icon: "view_module",
      //       url: "manage/soldproperties"
      //     },
      //     {
      //       id: "Rented Properties",
      //       title: "Rented Properties",
      //       type: "item",
      //       icon: "view_module",
      //       url: "manage/rentedproperties"
      //     }
      //   ]
      // },
      {
        id: 'approvals',
        title: 'Approvals',
        type: 'collapse',
        icon: 'lock',
        role: 'admin',
        children: [
          {
            id: 'listing',
            title: 'Listing',
            type: 'item',
            icon: 'call_made',
            url: 'approvals/listing'
          },
          {
            id: 'transfer',
            title: 'Transfer',
            type: 'item',
            icon: 'call_made',
            url: 'approvals/transfer'
          },
        ]
      },
      {
        id: 'sales',
        title: 'Sales',
        type: 'collapse',
        icon: 'lock',
        role: 'admin',
        children: [
          {
            id: 'create',
            title: 'Sold Properties',
            type: 'item',
            icon: 'call_made',
            url: 'sales/create'
          }
        ]
      },
      {
        id: 'network',
        title: 'Network',
        type: 'collapse',
        icon: 'lock',
        role: 'admin',
        children: [
          {
            id: 'private',
            title: 'Private',
            type: 'item',
            icon: 'call_made',
            url: 'network/private'
          },
          {
            id: 'public',
            title: 'Public',
            type: 'item',
            icon: 'call_made',
            url: 'network/public'
          },
        ]
      },
      {
        id: 'transaction',
        title: 'Transaction',
        type: 'item',
        icon: 'lock',
        url: 'transaction',
        role: 'admin'
      },
    ];
  }
}

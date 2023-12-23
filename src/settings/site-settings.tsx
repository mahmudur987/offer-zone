import { ILFlag } from "@components/icons/language/ILFlag";
import { SAFlag } from "@components/icons/language/SAFlag";
import { CNFlag } from "@components/icons/language/CNFlag";
import { USFlag } from "@components/icons/language/USFlag";
import { DEFlag } from "@components/icons/language/DEFlag";
import { ESFlag } from "@components/icons/language/ESFlag";

export const siteSettings = {
  name: "Offerzone",
  description: "Get your offers",
  author: {
    name: "offerzonebd",
    websiteUrl: "https://new.offerzonebd.com",
    address: "",
  },
  logo: {
    url: "/assets/images/logo.png",
    alt: "OfferZone",
    href: "/",
    width: 128,
    height: 40,
  },
  defaultLanguage: "en",
  currencyCode: "BDT",
  site_header: {
    menu: [
      {
        id: 1,
        path: "/",
        label: "home",
      },
      {
        id: 2,
        path: "/offers/",
        label: "offers",
      },
      {
        id: 3,
        path: "/deals/",
        label: "deals",
      },
      {
        id: 4,
        path: "/shops/",
        label: "stores",
      },
      {
        id: 5,
        path: "/about-us",
        label: "about-us",
      },
      {
        id: 5,
        path: "/products",
        label: "Products",
      },
    ],
    languageMenu: [
      {
        id: "ar",
        name: "عربى - AR",
        value: "ar",
        icon: <SAFlag />,
      },
      {
        id: "zh",
        name: "中国人 - ZH",
        value: "zh",
        icon: <CNFlag />,
      },
      {
        id: "en",
        name: "English - EN",
        value: "en",
        icon: <USFlag />,
      },
      {
        id: "de",
        name: "Deutsch - DE",
        value: "de",
        icon: <DEFlag />,
      },
      {
        id: "he",
        name: "rעברית - HE",
        value: "he",
        icon: <ILFlag />,
      },
      {
        id: "es",
        name: "Español - ES",
        value: "es",
        icon: <ESFlag />,
      },
    ],
    pagesMenu: [
      {
        id: 1,
        path: "/search",
        label: "menu-best-deals",
      },
      {
        id: 2,
        path: "/about-us",
        label: "menu-about-us",
      },
      {
        id: 3,
        path: "/contact-us",
        label: "menu-contact-us",
      },
      {
        id: 4,
        path: "/faq",
        label: "menu-faq",
      },
    ],

    joinMenu: [
      {
        id: 1,
        path: "/",
        label: "Join",
        subMenu: [
          {
            id: 1,
            path: "/merchant-signup",
            label: "Merchant",
          },
          {
            id: 2,
            path: "/agent-signup",
            label: "Agent",
          },
          {
            id: 3,
            path: "/member-signup",
            label: "Member",
          },
        ],
      },
    ],

    authMenu: [
      {
        id: 1,
        path: "/",
        label: "Profile",
        subMenu: [
          {
            id: 1,
            path: "/my-account",
            label: "Dashboard",
          },
          {
            id: 3,
            path: "/agent-dashboard",
            label: "Agent Dashboard",
          },
          {
            id: 2,
            path: "/marchant-dashboard",
            label: "Marchant Dashboard",
          },
        ],
      },
    ],
  },
};

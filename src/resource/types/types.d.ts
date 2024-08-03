import { User } from "@prisma/client";
import { Server as SocketIOServer } from "socket.io";
import { Server as NetServer, Socket } from "net";

// AUTH INTERFACE
export interface NextAuthProviderInterface {
  children?: React.ReactNode;
}

// HEADER INTERFACE
export interface ISubmenu {
  title: string;
  newTab: boolean;
  slug: string;
}

export interface IFooterItem {
  title: string;
  submenu?: ISubmenu[];
}

export interface IFooterMenu {
  footer: IFooterItem[];
}

export interface IPageLink {
  title: string;
  description: string;
  slug: string;
}

export interface IMenuItem {
  title: string;
  description: string;
  newTab: boolean;
  slug: string;
  submenu?: IMenuItem[];
  page: IPageLink;
}

export interface INavigationMenu {
  menu: IMenuItem[];
}

interface Item {
  title: string;
  url: string;
  items?: Item[];
}

interface Items {
  items?: Item[];
}

export interface Schedule {
  id: string;
  date: string | "";
  time: string | "";
  meetingLink: string | "";
  memberId: string | "";
  subject: string | "";
  body: string | "";
  createdAt: Date | "";
  updatedAt: Date | "";
  userId: string | "";
  User: User ;
}

// prisma model types
const user: User = {};
const account: Account = {};
const session: Session = {};
const verificationToken: VerificationToken = {};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type TableOfContents = Items;

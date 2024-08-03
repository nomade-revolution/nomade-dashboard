import { User, UserApiResponse } from "../modules/user/domain/User";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    type: "Company",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    type: "Influencer",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    type: "Nomade",
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael@example.com",
    type: "Nomade",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily@example.com",
    type: "Company",
  },
  {
    id: 6,
    name: "Daniel Wilson",
    email: "daniel@example.com",
    type: "Nomade",
  },
  {
    id: 7,
    name: "Olivia Martinez",
    email: "olivia@example.com",
    type: "Nomade",
  },
  {
    id: 8,
    name: "William Taylor",
    email: "william@example.com",
    type: "Nomade",
  },
  {
    id: 9,
    name: "Sophia Anderson",
    email: "sophia@example.com",
    type: "Nomade",
  },
];

export const mockFullUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  type: "Company",
};

export const mockUserApiResponse: UserApiResponse = {
  users: mockUsers,
  pagination: {
    current_page: 1,
    per_page: 10,
    last_page: 1,
  },
};

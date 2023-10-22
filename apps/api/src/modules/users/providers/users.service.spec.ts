import { DeepMocked, createMock } from "@golevelup/ts-jest";
import { User, UserHandle } from "@prisma/client";

import { NotFoundException } from "@nestjs/common";
import { Test } from "@nestjs/testing";

import { BcryptService } from "~/modules/auth/hashing/bcrypt.service";
import { HashingService } from "~/modules/auth/hashing/hashing.service";

import { HandlesRepository } from "./handles.repository";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let users: User[];
  let usersService: UsersService;
  let usersRepository: DeepMocked<UsersRepository>;
  let handlesRepository: DeepMocked<HandlesRepository>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: HashingService,
          useClass: BcryptService
        },
        {
          provide: UsersRepository,
          useValue: createMock<UsersRepository>()
        },
        {
          provide: HandlesRepository,
          useValue: createMock<HandlesRepository>()
        }
      ]
    }).compile();

    usersService = moduleRef.get(UsersService);
    usersRepository = moduleRef.get(UsersRepository);
    handlesRepository = moduleRef.get(HandlesRepository);

    users = [
      {
        id: 1,
        fullName: "Naimul Haque",
        email: "naimulcsx@gmail.com",
        username: "c181065",
        password:
          "$2a$10$ZTqJCGAELTu4QougaQLOXe71kZRDtl0OHu7CbfMyAbXYUbqMcySlm",
        phone: "+8801625644843",
        role: "ADMIN",
        lastSeen: new Date("2023-10-22T07:45:00.000Z"),
        createdAt: new Date("2023-10-22T07:45:00.000Z"),
        updatedAt: new Date("2023-10-22T07:45:00.000Z"),
        metaData: {},
        institutionId: 1
      }
    ];
  });

  it("usersService should be defined", () => {
    expect(usersService).toBeDefined();
  });

  it("should get all users", async () => {
    // arrange
    usersRepository.getAll.mockReturnValue(Promise.resolve(users));

    // act
    const _users = await usersService.getUsers();

    // assert
    expect(_users).toBe(users);
  });

  it("should get a single user", async () => {
    // arrange
    const _user: User = {
      id: 1,
      fullName: "Naimul Haque",
      email: "naimulcsx@gmail.com",
      username: "c181065",
      password: "$2a$10$ZTqJCGAELTu4QougaQLOXe71kZRDtl0OHu7CbfMyAbXYUbqMcySlm",
      phone: "+8801625644843",
      role: "ADMIN",
      lastSeen: new Date("2023-10-22T07:45:00.000Z"),
      createdAt: new Date("2023-10-22T07:45:00.000Z"),
      updatedAt: new Date("2023-10-22T07:45:00.000Z"),
      metaData: {},
      institutionId: 1
    };
    usersRepository.getByUsername.mockImplementation(async (username) => {
      return users.find((user) => user.username === username);
    });

    // act
    const user = await usersService.getUser("c181065");

    // assert
    expect(user).toEqual(_user);
  });

  it("should throw error for user not found", async () => {
    // arrange
    const users: User[] = [
      {
        id: 1,
        fullName: "Naimul Haque",
        email: "naimulcsx@gmail.com",
        username: "c181065",
        password:
          "$2a$10$ZTqJCGAELTu4QougaQLOXe71kZRDtl0OHu7CbfMyAbXYUbqMcySlm",
        phone: "+8801625644843",
        role: "ADMIN",
        lastSeen: new Date("2023-10-22T07:45:00.000Z"),
        createdAt: new Date("2023-10-22T07:45:00.000Z"),
        updatedAt: new Date("2023-10-22T07:45:00.000Z"),
        metaData: {},
        institutionId: 1
      }
    ];
    usersRepository.getByUsername.mockImplementation(
      async (username: string) => {
        const user = users.find((user) => user.username === username);
        if (!user) throw new NotFoundException();
        return user;
      }
    );

    // act
    const user = usersService.getUser("invalid_username");

    // assert
    await expect(user).rejects.toBeInstanceOf(NotFoundException);
  });

  it("should update user data", async () => {
    // arrange
    const _user: User = {
      id: 1,
      fullName: "Naimul Haque",
      email: "naimulcsx@gmail.com",
      username: "c181065",
      password: "$2a$10$ZTqJCGAELTu4QougaQLOXe71kZRDtl0OHu7CbfMyAbXYUbqMcySlm",
      phone: "+8801625644843",
      role: "ADMIN",
      lastSeen: new Date("2023-10-22T07:45:00.000Z"),
      createdAt: new Date("2023-10-22T07:45:00.000Z"),
      updatedAt: new Date("2023-10-22T07:45:00.000Z"),
      metaData: {},
      institutionId: 1
    };
    usersRepository.getByUsername.mockReturnValue(Promise.resolve(_user));
    usersRepository.updateById.mockImplementation(async (id, data) => {
      users = users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            ...data
          } as User;
        }
        return user;
      });
      return users.find((user) => user.id === id);
    });

    // act
    const updateData = {
      fullName: "naimulhaque",
      email: "naimul@netmark.no"
    };
    const user = await usersService.updateUser("c181065", updateData);

    // assert
    delete _user.password;
    expect(user).toEqual({ ..._user, ...updateData });
  });

  it("should get user handles", async () => {
    // arrange
    const _user: User = {
      id: 1,
      fullName: "Naimul Haque",
      email: "naimulcsx@gmail.com",
      username: "c181065",
      password: "$2a$10$ZTqJCGAELTu4QougaQLOXe71kZRDtl0OHu7CbfMyAbXYUbqMcySlm",
      phone: "+8801625644843",
      role: "ADMIN",
      lastSeen: new Date("2023-10-22T07:45:00.000Z"),
      createdAt: new Date("2023-10-22T07:45:00.000Z"),
      updatedAt: new Date("2023-10-22T07:45:00.000Z"),
      metaData: {},
      institutionId: 1
    };
    const _userHandles: UserHandle[] = [
      {
        id: "clnze5qd20000val69o5y4ats",
        userId: 1,
        type: "CODEFORCES",
        handle: "naimul_haque"
      },
      {
        id: "clnze5qd30001val6rpq40fg7",
        userId: 1,
        type: "CODECHEF",
        handle: "naimulhaque"
      }
    ];
    handlesRepository.getByCriteria.mockReturnValue(
      Promise.resolve(_userHandles)
    );
    usersRepository.getByUsername.mockReturnValue(Promise.resolve(_user));

    // act
    const userHandles = await usersService.getUserHandles("c181065");

    // assert
    expect(userHandles).toEqual(_userHandles);
  });
});

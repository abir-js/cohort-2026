// In memory DB ==> cache

// HashMap (key, value)

// userObj = {fname, lname, email, contact: {mobile}, address: {street, pincode, country}}

type UserID = string;

interface User {
  id: UserID;
  fname: string;
  lname?: string;
  email: string;
  contact: {
    mobile: string;
  };
  address: {
    street: string;
    pincode: number;
    country: string;
  };
}

class InMemoryDB {
  private _db: Map<UserID, User> = new Map();
  constructor() {
  }

  public insertUser(data: User): UserID {
    if (this._db.has(data.id)) {
      throw new Error(`User with ID: ${data.id} already exists`);
    }
    this._db.set(data.id, data);
    return data.id;
  }

  public updateUser(id: UserID, updatedData: Omit<User, "id">) {
    if (!this._db.has(id))
      throw new Error(`User with ID ${id} does not exists`);
    this._db.set(id, { id, ...updatedData });
    return true;
  }

  public getUser(id: UserID): User{
    if (!this._db.has(id))
      throw new Error(`User with ID ${id} does not exists`);
    return this._db.get(id)!;
  }
}

const myDB = new InMemoryDB();
myDB.insertUser({
  id: "1",
  fname: "Abir",
  //   lname: "Bhattacharjee",
  email: "abir@abir.com",
  contact: {
    mobile: "123",
  },
  address: {
    street: "1",
    country: "India",
    pincode: 700001,
  },
});

myDB.updateUser("1", {
  fname: "Abir",
  email: "abir@abir.com",
  contact: {
    mobile: "999999999",
  },
  address: {
    street: "1",
    country: "India",
    pincode: 700001,
  },
});
